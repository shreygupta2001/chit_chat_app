import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import { connect } from 'react-redux';

import './GroupCallRoomsList.css';

//group calls list for group calling function
const GroupCallRoomsList = (props) => {
    const { groupCallRooms } = props;
    return (
        <>
            {groupCallRooms.map(room => <GroupCallRoomsListItem key={room.roomId} room={room} />)}
        </>
    );
};

const mapStoreStateToProps = ({ dashboard }) => (
    {
        ...dashboard
    }
);

export default connect(mapStoreStateToProps)(GroupCallRoomsList);