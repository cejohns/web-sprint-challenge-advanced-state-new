import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  const { formDataRedux } = props; // formDataRedux represents the form data in the Redux store

  // Initialize component state with Redux state
  const [formData, setFormData] = useState(formDataRedux);

  // Update local state when Redux state changes
  useEffect(() => {
    setFormData(formDataRedux);
  }, [formDataRedux]);

  const onChange = evt => {
    const { id, value } = evt.target;
    const updatedFormData = {
      ...formData,
      [id]: value
    };

    setFormData(updatedFormData);

    // Dispatch action to update Redux state
    props.inputChange({ field: id, value });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    props.postQuiz(formData); // Dispatch action to add the new quiz

    // Reset local form state
    setFormData({
      newQuestion: '',
      newTrueAnswer: '',
      newFalseAnswer: ''
    });

    // Dispatch action to reset Redux form state
    props.resetForm();
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

const mapStateToProps = state => ({
  formDataRedux: state.form // Assuming the form data is stored in the 'form' slice of the Redux state
});

export default connect(mapStateToProps, actionCreators)(Form);
