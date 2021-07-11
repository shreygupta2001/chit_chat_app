//file to add functionality to create a room or leave a room

import React from 'react';

import './GroupCallButton.css';

//function to create a new room on clicking button for it
const GroupCallButton = ({ onClickHandler, label }) => {
    return (
        <button onClick={onClickHandler} className='create_room_button'>
            {label}
        </button>
    );
};

export default GroupCallButton;