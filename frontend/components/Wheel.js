// Import React, useState, useEffect, and connect from react-redux
import React from 'react';
import { connect } from 'react-redux';

// Import the action creators
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
   const {
    wheel,
    moveClockwise,
    moveCounterClockwise,
  } = props
 



  // Dispatch plain object actions
  const handleMoveCounterClockwise = () => {
    moveCounterClockwise(); // Dispatching action
   
  };

  const handleMoveClockwise = () => {
    moveClockwise(); // Dispatching action
    
  };

  return (
    <div id="wrapper">
    <div id="wheel">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          // Set the class to 'active' if the current cog is the active one
          // The wheel state should correctly point to the active cog index
          className={`cog ${i === wheel ? 'active' : ''}`}
          style={{ "--i": i }}
        >
          {/* Display 'B' if the current cog is the active one */}
          {i === wheel ? 'B' : ''}
        </div>
      ))}
    </div>
    <div id="keypad">
      <button id="counterClockwiseBtn" onClick={handleMoveCounterClockwise}>
        Counter clockwise
      </button>
      <button id="clockwiseBtn" onClick={handleMoveClockwise}>
        Clockwise
      </button>
    </div>
  </div>
  );
}

// Map Redux actions to props
const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

// Connect Wheel component to Redux
export default connect(state=>state , mapDispatchToProps)(Wheel);
