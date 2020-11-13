import React, { useState } from 'react';

const QuestionBox = ({ question, options, selected }) => {
    const [answers, setAnswers] = useState(options);

    const handleAnswerClick = (e) => {
        setAnswers([e.target.value]);
        selected(e.target.value);
    }

    return (
        <div className="questionBox">
            <div className="question">
                { question }
            </div>
            {
                answers.map((answer, index) => (
                    <button key={index} className="answerBtn" value={answer} onClick={(e) => handleAnswerClick(e)}>
                        {answer}
                    </button>
                ))
            }
        </div>
    )
}

export default QuestionBox;