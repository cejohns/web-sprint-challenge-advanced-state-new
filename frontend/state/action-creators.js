

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: 'MOVE_CLOCKWISE' };
}

export function moveCounterClockwise() {
  return { type: 'MOVE_COUNTERCLOCKWISE' };
}

export function selectAnswer() { 
  return { type: 'SET_SELECTED_ANSWER' };
}

export function setMessage(message) {
  return { type: 'SET_INFO_MESSAGE', payload: message };
}

export function setQuiz(quiz) {
  return { type: 'SET_QUIZ_INTO_STATE', payload: quiz };
}

export function inputChange(payload) {
  return { type: 'INPUT_CHANGE', payload };
 }

export function resetForm() {
  return { type: 'RESET_FORM'};
 }







// ❗ Async action creators
export function fetchQuiz() { console.log("fetchQuiz");
  return async function (dispatch) {
     
      dispatch(setQuiz(null));
   

    try {
      const response = await fetch('http://localhost:9000/api/quiz/next');
     
  
      
      // Assuming the API returns an array of questions
      const quizData = await response.json();
          console.log(quizData);
      // Dispatch the action to set the quiz data into the state
      // Ensure quizData is in the correct format
      dispatch(setQuiz(quizData));
      console.log(quizData.question);

    } catch (error) {
      console.error("Quiz fetching error:", error.message);
    }
  };
}







export const postAnswer = (quiz_id, answerId) => async (dispatch) => {
  const payload = { quiz_id: quiz_id, answer_id: answerId };
  try {
    const response = await fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
      
    });console.log('Sending payload:', payload.answer_id);

   const responseBody = await response.json();
if (!response.ok) {
  throw new Error(responseBody.message || 'Network response was not ok');
}
dispatch(setMessage(responseBody.message));
fetchQuiz()(dispatch);

  } catch (error) {
    console.error('Post error:', error);
    dispatch(setMessage('Error posting answer'));
  }
};


export const postQuiz = (questionText, trueAnswerText, falseAnswerText) => async (dispatch) => {
  const payload = {
    question_text: questionText,
    true_answer_text: trueAnswerText,
    false_answer_text: falseAnswerText,  // Corrected the typo here
  };
  try {
    const response = await fetch('http://localhost:9000/api/quiz/new', {  // Removed the leading space
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Post error:', errorData);
      dispatch(setMessage(errorData.message || 'Error adding quiz'));
      // You might want to handle different statuses differently
      // if (response.status === 422) { ... }
      return;
    }

    const data = await response.json();
    dispatch(setMessage('Quiz added successfully!', data));
    dispatch(resetForm());  // Assuming resetForm doesn't need data as a parameter
  } catch (error) {
    console.error('Post error:', error);
    dispatch(setMessage('Network error while adding quiz'));
  }
};



// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
