//file for rendering Active Users on the app

//importing required dependencies
import React from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';

//styling for section
import './ActiveUsersList.css';

//function to map each active user to each item
const ActiveUsersList = ({ activeUsers, callState }) => {
    
    return (
        <div className='list_container'>
            {activeUsers.map((activeUser) =>
                <ActiveUsersListItem
                    key={activeUser.socketId}
                    activeUser={activeUser}
                    callState={callState}
                />)}
        </div>
    );
};

//render list of active users obtained from server
const mapStateToProps = ({ dashboard, call }) => ({
    ...dashboard,
    ...call
});

export default connect(mapStateToProps)(ActiveUsersList);