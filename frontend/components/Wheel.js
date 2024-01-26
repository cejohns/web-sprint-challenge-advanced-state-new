// Import React, useState, useEffect, and connect from react-redux
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Import the action creators
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel({ moveClockwise, moveCounterClockwise }) {
  const totalCogs = 6;
  const [activeCog, setActiveCog] = useState(() => {
    // Load the active cog position from local storage if available
    const savedActiveCog = localStorage.getItem('activeCog');
    return savedActiveCog !== null ? parseInt(savedActiveCog, 10) : 0;
  });

  useEffect(() => {
    // Save the active cog position to local storage whenever it changes
    localStorage.setItem('activeCog', activeCog);
  }, [activeCog]);

  // Dispatch plain object actions
  const handleMoveCounterClockwise = () => {
    moveCounterClockwise(); // Dispatching action
    setActiveCog((prevActiveCog) => (prevActiveCog - 1 + totalCogs) % totalCogs);
  };

  const handleMoveClockwise = () => {
    moveClockwise(); // Dispatching action
    setActiveCog((prevActiveCog) => (prevActiveCog + 1) % totalCogs);
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {[...Array(totalCogs)].map((_, i) => (
          <div
            key={i}
            className={`cog ${i === activeCog ? 'active' : ''}`}
            style={{ "--i": i }}
          >
            {i === activeCog ? 'B' : ''}
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
export default connect(null, mapDispatchToProps)(Wheel);
