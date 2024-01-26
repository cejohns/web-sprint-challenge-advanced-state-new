import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const [formData, setFormData] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: ''
  });

  const onChange = evt => {
    const { id, value } = evt.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    // Dispatch the action to add the new quiz
    // Assuming there is an action creator like 'addQuiz' in your actionCreators
    props.postQuiz(formData);
    // Reset the form after submission
    setFormData({
      newQuestion: '',
      newTrueAnswer: '',
      newFalseAnswer: ''
    });
  };

  const isButtonDisabled = 
    !formData.newQuestion.trim() || 
    !formData.newTrueAnswer.trim() || 
    !formData.newFalseAnswer.trim();

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={formData.newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={formData.newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={formData.newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isButtonDisabled}>Submit new quiz</button>
    </form>
  );
}

export default connect(st => st, actionCreators)(Form);
