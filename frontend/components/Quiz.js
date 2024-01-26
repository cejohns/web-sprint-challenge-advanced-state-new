import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

export default function Quiz() {
  const dispatch = useDispatch();
  const quiz = useSelector(state => state.quiz);
  const selectedAnswer = useSelector(state => state.selectedAnswer);

  useEffect(() => {
    // Fetch the next quiz if there is no quiz in the state
    if (!quiz) {
      dispatch(fetchQuiz());
    }
  }, [quiz, dispatch]);

  const handleAnswerSelect = (answerId) => {  console.log("Rendering answers:", quiz.answers.map(a => a.id));

    // Dispatch action to update the selected answer in the state
    dispatch({ type: 'SET_SELECTED_ANSWER', payload: answerId });
  };

  const handleSubmit = () => {
    // Dispatch action to post the selected answer and fetch the next quiz
    if (quiz && selectedAnswer) {
      dispatch(postAnswer(quiz.id, selectedAnswer));
    }
  };

  
  if (!quiz) {
    return <div id="wrapper">Loading next quiz...</div>;
  }

  return (
    <div id="wrapper">
      <h2>{quiz.question}</h2>

      <div id="quizAnswers">
        {quiz.answers.map(answer => (
          <div key={answer.id} className={`answer ${selectedAnswer === answer.id ? 'selected' : ''}`}>
            {answer.text}
            <button onClick={() => handleAnswerSelect(answer.id)}>
              {selectedAnswer === answer.id ? 'SELECTED' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      <button
        id="submitAnswerBtn"
        disabled={!selectedAnswer}
        onClick={handleSubmit}
      >
        Submit answer
      </button>
    </div>
  );
}
