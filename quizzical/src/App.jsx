import { useState, useRef } from 'react'
import React from "react"
import Trivia from "./components/Trivia"
import Ending from "./components/Ending"
import { nanoid } from 'nanoid'

function App() {
    const [trivia, setTrivia] = useState([])
    const [newGame, setNewGame] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [stats, setStats] = useState({score: 0, skipped: 0})
    const notInitialRender = useRef(false) // skip first render
   
    React.useEffect(() => {
        if(notInitialRender.current && newGame) {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setTrivia(createTrivia(data.results)))
        } else {
            notInitialRender.current = true
        }
    }, [newGame])

    function cleanString(str) {
        const re = /&quot;|&#039;|&amp;|&euml;|&eacute;|&shy|&rsquo;|&sup2;|&uacute;|&atilde;|&ntilde;|&aacute;/g
        const mapObj = {
          '&quot;' : '"',
          '&#039;' : "'",
          '&amp;' : "&",
          '&euml;' : "ë",
          '&eacute;' : "é",
          '&shy': "-",
          '&rsquo;' : "'",
          '&ouml;' : "Ö",
          '&sup2;' : "²",
          '&uacute;' : "ú",
          '&atilde;' : "ã",
          '&ntilde;' : "ñ",
          '&aacute;' : "á"
        }
        return str.replace(re, function(matched){
          return mapObj[matched]
        })
    }
  
  function createTrivia(arr) {
    return arr.map(ele => {
              let answers = ele.incorrect_answers.map(answer => {
                  return {id: nanoid(), value: cleanString(answer), isCorrect: false, isHeld: false}
              })
              const idx = Math.floor(Math.random() * 4)
              answers.splice(idx, 0, {id: nanoid(), value: cleanString(ele.correct_answer), isCorrect: true, isHeld: false})
              return {id: nanoid(), question: cleanString(ele.question.trim()), options: answers} 
      })
  }
  const triviaElements = trivia.map(trv => {
    return <Trivia 
              key={trv.id}
              id={trv.id}
              question={trv.question}
              options={trv.options}
              holdOption={holdOption}
              submitted={submitted}
            />
  })
 
  function generateQuiz() {
      setNewGame(prevGame => prevGame + 1)
      setSubmitted(false)
  }

  function holdOption(triviaId, optionId) {
      setTrivia(oldTrivia => {
        const newTrivia = []
        oldTrivia.forEach(trv => {
          if (trv.id === triviaId) {
            const newOptions = trv.options.map(option => {
              return option.id === optionId ? {...option, isHeld: true} : {...option, isHeld: false}
            })
            newTrivia.push({...trv, options: newOptions})
          } else {
            newTrivia.push(trv)
          }
        })
        return newTrivia
      })
  }

  function checkAnswers() {
    setSubmitted(true)
    // console.log("quiz submitted, please count correct answers")
    let countScore = 0
    let countSkipped = 0
    trivia.forEach(trv => {
      trv.options.forEach(option => {
        if(option.isCorrect && option.isHeld) {
          countScore += 1
        }
      })
      if(trv.options.every(option => !option.isHeld)) {
        countSkipped += 1
      }
    })
    setStats({score: countScore, skipped: countSkipped})
  }

  return (
      <div className="App">
          { trivia.length > 0 
            ?
            <div className="trivia-canvas container">
                <img className="trivia-bg-yellow" src="images/yellow-dot-small.png"/>
                <img className="trivia-bg-blue" src="images/blue-dot-small.png"/>
                {triviaElements}
                {!submitted && <button className="submit-btn" onClick={checkAnswers}>Check answers</button>}
                {submitted && <Ending 
                                key={nanoid()} 
                                stats={stats} 
                                generateQuiz={generateQuiz} />}
            </div>
            :
            <div className="no-trivia container">
                <img className="start-bg-yellow" src="images/yellow-dot.png"/>
                <img className="start-bg-blue" src="images/blue-dot.png"/>
                <h1>Quizzical</h1>
                <p>Fun trivia quiz</p>
                <button onClick={generateQuiz}>Start quiz</button>
            </div>
          }
      </div>
  )
}

export default App
