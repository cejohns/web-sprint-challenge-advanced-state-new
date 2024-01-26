

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: 'MOVE_CLOCKWISE' };
}

export function moveCounterClockwise() {
  return { type: 'MOVE_COUNTERCLOCKWISE' };
}

export function selectAnswer() { 
  return { type: 'SET_SELECTED_ANSWER'};
}

export function setMessage(message) {
  return { type: 'SET_INFO_MESSAGE', payload: message };
}

export function setQuiz(quiz) {
  return { type: 'SET_QUIZ_INTO_STATE', payload: quiz };
}

export function inputChange() {
  return { type: 'INPUT_CHANGE'};
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







export const postAnswer = (quizId, answerId) => async (dispatch) => {
  const payload = { quiz_id: quizId, answer_id: answerId };
  try {
    const response = await fetch('http://localhost:9000/api/quiz/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(setMessage(data.message));
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
    false_answer_text: falseAnswerText,
  };
  try {
    const response = await fetch(' http://localhost:9000/api/quiz/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(setMessage('Quiz added successfully!'));
    dispatch(resetForm(data));
  } catch (error) {
    console.error('Post error:', error);
    dispatch(setMessage('Error adding quiz'));
  }
};


// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
