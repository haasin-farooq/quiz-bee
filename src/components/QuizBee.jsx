import React, { useState, useEffect } from 'react';

import QuestionBox from './QuestionBox';
import Resut from './Result';

import quizService from '../quizService';

const QuizBee = () => {
    const [questionBank, setQuestionBank] = useState([]);
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState(0);

    const getQuestions = () => {
        quizService().then((questions) => {
            setQuestionBank(questions);
        })
    }

    const computeAnswer = (chosenAnswer, correctAnswer) => {
        if(chosenAnswer === correctAnswer) {
            setScore(score + 1)
        }
        setResponses(responses < 5 ? responses + 1 : 5);
    }
    
    const playAgain = () => {
        getQuestions();
        setScore(0);
        setResponses(0);
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return (
        <div className="container">
            <div className="title">
                QuizBee
            </div>
            {
                questionBank.length > 0 
                &&
                responses < 5 
                &&
                questionBank.map(({ question, answers, correct, questionId }) => (
                    <QuestionBox key={questionId} question={question} options={answers} selected={(chosenAnswer) => computeAnswer(chosenAnswer, correct)} />
                ))
            }
            {
                responses === 5
                ? <Resut score={score} playAgain={playAgain} /> 
                : null
            }
        </div>
    )
}

export default QuizBee;