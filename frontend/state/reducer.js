// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import  * as types from  './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case 'MOVE_CLOCKWISE':
      return state + 1;
    case 'MOVE_COUNTERCLOCKWISE':
      return state - 1;
    default:
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  
  switch (action.type) {
    case types.SET_QUIZ_INTO_STATE: 
    return action.payload  
     default:
          // If the action type is not recognized, return the current state
          return state;
      }
}

const initialSelectedAnswerState = null;

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case 'SET_SELECTED_ANSWER':
      // Update the state with the new selected answer
      // Make sure action.payload is defined and contains the new answer
      if (typeof action.payload !== 'undefined') {
        return action.payload;
      }
      // If action.payload is undefined, return the current state
      return state;
    default:
      // If the action type is not recognized, return the current state
      return state;
  }
}


const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case  'SET_INFO_MESSAGE':
      // Sets a new message
      return action.payload;

    default:
      // If the action type is not recognized, return the current state
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case  'INPUT_CHANGE':
      // Updates the newQuestion field in the form state
      return { ...state, newQuestion: action.payload };


    case 'RESET_FORM':
      // Resets the form to its initial state
      return initialFormState;
  
    default:
      // If the action type is not recognized, return the current state
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
