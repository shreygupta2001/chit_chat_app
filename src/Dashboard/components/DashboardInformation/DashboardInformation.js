//file to display general information on Dashboard initially

import React from 'react';

//styling for Dashboard Information
import './DashboardInformation.css';

//function to show info on dashboard depending on call state
const DashboardInformation = ({ username }) => {
    return (
        <div className='info_container'>
            <span className='info_title'>
                Hello {username}, Welcome to Chit-Chat
            </span>
            <span className='info_description'>
                You can start a direct call with a user from list on the right
                and enjoy instant messaging and calling.
                <br></br>
                You can create a room by clicking the button given below.
                <br></br>
                You can join a room from the Rooms List on the bottom.
            </span>
        </div>
    );
};

export default DashboardInformation;