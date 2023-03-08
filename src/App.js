import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import MyNetwork from './components/MyNetwork';
import './App.css';
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import ExplorePeople from "./components/ExplorePeople";
import News from "./components/News";

function App(props) {

  useEffect(() => {
    props.getUserAuth();
  },[]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={[<Header/>,<Home/>]} />
          <Route path="/profile" element={[<Header/>,<Profile/>]}/>
          <Route path="/my-network" element={[<MyNetwork/>,<ExplorePeople/>]}/>
          <Route path="/tech-today" element={[<Header/>,<News/>]}/>
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


