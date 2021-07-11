//file for Dashboard related Actions

export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD.SET_ACTIVE_USERS';
export const DASHBOARD_SET_GROUP_CALL_ROOMS = 'DASHBOARD.SET_GROUP_CALL_ROOMS';

//function to set Username 
export const setUsername = (username) => {
    return {
        type: DASHBOARD_SET_USERNAME,
        username
    };
};

//function to handle the list of all active users
export const setActiveUsers = (activeUsers) => {
    return {
        type: DASHBOARD_SET_ACTIVE_USERS,
        activeUsers
    };
};

//function to handle the group call rooms
export const setGroupCalls = (groupCallRooms) => {
    return {
        type: DASHBOARD_SET_GROUP_CALL_ROOMS,
        groupCallRooms
    };
};