import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithWebSocket } from './utils/webSocketConnection/webSocketConnection';
import Dashboard from './Dashboard/Dashboard';
import LoginPage from './LoginPage/LoginPage';

function App() {

  //triggered once in the application to connect with Web Socket
  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    //routing operation based on login and dashboard
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/'>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;