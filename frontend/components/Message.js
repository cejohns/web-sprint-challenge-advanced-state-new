import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
  // Access the message from the Redux state through props
  return <div id="message">{props.message}</div>;
}

// This function maps the Redux state to the component's props
const mapStateToProps = (state) => {
  return {
    message: state.infoMessage // Assuming 'infoMessage' is the key for your message state in the Redux store
  };
};

// Connect the Message component to the Redux store
export default connect(mapStateToProps)(Message);
