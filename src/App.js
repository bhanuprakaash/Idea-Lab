import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import MyNetwork from './components/MyNetwork';
import './App.css';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';
import ExplorePeople from './components/ExplorePeople';
import News from './components/News';
import UserProfile from './components/UserProfile';
import OtherUsersProfile from './components/OtherUsersProfile';

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={[<Header />, <Home />]} />
          <Route path="/profile" element={[<Header />, <UserProfile />]} />
          <Route path="/my-network" element={[<MyNetwork />, <ExplorePeople />]} />
          <Route path="/tech-today" element={[<Header />, <News />]} />
          <Route path="/profile/:id" element={[<Header />, <OtherUsersProfile />]} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
