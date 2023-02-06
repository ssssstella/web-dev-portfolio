import React from "react"

export default function Trivia(props) {
    const triviaId = props.id
    const optionElements = props.options.map(option => {
        const styles =  props.submitted ? 
                        {   backgroundColor: option.isCorrect ? "#94D7A2" 
                                             : option.isHeld ? "#F8BCBC" : "transparent",
                            border: option.isCorrect || option.isHeld ? "none" : "1.2px solid #4D5B9E",
                            opacity: option.isCorrect ? 1 : 0.5
                        }
                        :
                        {
                            backgroundColor: option.isHeld ? "#D6DBF5" : "transparent",
                            border: option.isHeld ? "none" : "1.2px solid #4D5B9E"
                        }
        return (<div key={option.id}
                     className="trivia--option" 
                     style={styles}
                     onClick={() => props.holdOption(triviaId, option.id)}>
                    <p className="small-text">{option.value}</p>
                </div>)
    })

    return (
        <div className="trivia--card">
            <p className="trivia--question">{props.question}</p>
            <div className="trivia--optionPanel">
                {optionElements}
            </div>
        </div>
        
    )
}