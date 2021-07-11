//the main page of the web application

//importing required dependencies
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mainpic from '../resources/mainpic.png';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/webSocketConnection/webSocketConnection';
import './LoginPage.css';

const LoginPage = ({ saveUsername }) => {

    //storing input using UsernameInput file
    const [username, setUsername] = useState('');

    //used to transitin to Dashboard after Login
    const history = useHistory();

    //function to be executed when Submit Button is pressed on Login Page =>
    //pushing to dashboard, store user details, pushing to the list of active users
    const handleSubmitButtonPressed = () => {

        registerNewUser(username);
        saveUsername(username);
        history.push('/dashboard');
    };

    return (
        //format of div tags for the Login Page
        <div className='loginpage_main background_main_color'>
            <div className='login-page_info_box'>
                <div>
                    <div className='heading'>
                        Start Chit-Chatting Now
                    </div>
                    <div className='content'>
                        Talk to anyone directly or in group.
                        <br></br>A web application for unlimited communication.
                    </div>
                </div>
            </div>
            <div className='login-page_login_box background_secondary_color'>
                <div className='login-page_logo_container'>
                    <img className='login-page_logo_image' src={mainpic} alt='WebAppLogo'></img>
                </div>
                <div className='login-page_title_container'>
                    <h2>Welcome to Chit-Chat!</h2>
                </div>
                <UsernameInput username={username} setUsername={setUsername} />
                <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
            </div>
        </div>
    );
};

//get username from input in store and dispatch it to setUsername
const mapActionsToProps = (dispatch) => {
    return {
        saveUsername: username => dispatch(setUsername(username))
    };
};

export default connect(null, mapActionsToProps)(LoginPage);