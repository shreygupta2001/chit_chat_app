//the second main web page that appears after logging into the LoginPage

//importing required dependencies
import React, { useEffect } from 'react';
import mainpic from '../resources/mainpic.png';
import './Dashboard.css';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { connect } from 'react-redux';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';

const Dashboard = ({ username, callState }) => {

    //getting local stream from webRTCHandler
    useEffect(() => {
        webRTCHandler.getLocalStream();
        webRTCGroupHandler.connectWithMyPeer();
    }, []);

    // divisions on the main Dashboard
    return (
        <div className='container background_main_color'>
            <div className='left_section'>
                <div className='content_container '>
                    <DirectCall />
                    <GroupCall />
                    {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
                </div>
                <div className='rooms_container background_secondary_color'>
                    <GroupCallRoomsList />
                </div>
            </div>
            <div className='right_section'>
                <div className='user_list background_secondary_color'>
                    <ActiveUsersList />
                </div>
                <div className='logo_box background_main_color'>
                    <img className='logo_image' src={mainpic} alt='app icon'></img>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ call, dashboard }) => ({
    ...call,
    ...dashboard
});

export default connect(mapStateToProps)(Dashboard);