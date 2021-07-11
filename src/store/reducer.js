//importing the required dependencies
import { combineReducers } from "redux";
import dashboardReducer from './reducers/dashboardReducer';
import callReducer from './reducers/callReducer';

//combine all the reducers
export default combineReducers({
    dashboard: dashboardReducer,
    call: callReducer
});