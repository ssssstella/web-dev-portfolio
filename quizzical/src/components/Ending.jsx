import React from "react"

export default function Ending(props) {
    return (<div className="ending">
                <div>
                    <p className="ending--skipped">Questions skipped: {props.stats.skipped}/5</p>
                    <p className="ending--score">You scored {props.stats.score}/5 correct answers</p>
                </div>
                <button className="newGame-btn" onClick={props.generateQuiz}>Play again</button>
            </div>)
}

