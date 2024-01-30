import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuiz, postAnswer } from '../state/action-creators';

export default function Quiz() {
  const dispatch = useDispatch();
  const quiz = useSelector(state => state.quiz);
  const selectedAnswer = useSelector(state => state.selectedAnswer);
  const submissionResult = useSelector(state => state.submissionResult);

  useEffect(() => {
    // Fetch the next quiz if there is no quiz in the state
    if (!quiz) {
      dispatch(fetchQuiz());
    }
  }, [quiz, dispatch]);

  const handleAnswerSelect = (answerId) => {  
    // Dispatch action to update the selected answer in the state
    dispatch({ type: 'SET_SELECTED_ANSWER', payload: answerId });
    console.log('1');
  };

  const handleSubmit = () => {
    // Dispatch action to post the selected answer and fetch the next quiz
    if (quiz && selectedAnswer) {
      dispatch(postAnswer(quiz.quiz_id, selectedAnswer));
      console.log(selectedAnswer); 
      console.log(quiz.quiz_id);

    }

    dispatch(fetchQuiz());
  };
  const renderSubmissionMessage = () => {
    if (submissionResult) {
      return (
        <div id={`message-${submissionResult.isSuccess ? 'success' : 'failure'}`}>
          {submissionResult.message}
        </div>
      );
    }
    return null;
  };

  
  if (!quiz) {
    return <div id="wrapper">Loading next quiz...</div>;
  }
  console.log(selectedAnswer); 
  return (
    <div id="wrapper">
       {renderSubmissionMessage()} {/* Render the submission message */}
      <h2>{quiz.question}</h2>

      <div id="quizAnswers">
        {quiz.answers.map(answer => ( 
         <div 
         className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`} 
         key={answer.answer_id}
       >
         {answer.text}
         <button onClick={() => handleAnswerSelect(answer.answer_id)}>
           {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
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
