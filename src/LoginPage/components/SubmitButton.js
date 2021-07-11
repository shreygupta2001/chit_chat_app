import React from 'react';

//function for Submit button on Login Page
const SubmitButton = ({ handleSubmitButtonPressed }) => {
    return (
        <div className='login-page_button_container'>
            <button
                className='login-page_button background_main_color text_main_color'
                onClick={handleSubmitButtonPressed}
            >
                <b>Let's Start!</b>
            </button>
        </div>
    );
};

export default SubmitButton;