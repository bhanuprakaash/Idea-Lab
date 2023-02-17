import styled from "styled-components";
import {connect} from "react-redux";
import { signInAPI } from "../actions";
import {Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import React from "react";
import CommunityGuidelines from "./CommunityGuidelines";
import { useState } from "react";
const Login = (props) => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState("close");

  React.useEffect(() => {
    if (props.user) {
      navigate("/home");
    }
  }, [props.user,navigate]);

  const handleSignIn = async (provider) => {
    await props.signIn(provider);
    navigate("/home");
  };
  const handleClick = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget){
        return;
    }
    switch(showModel){
        case "open":
            setShowModel("close");
            break;
        case "close":
            setShowModel("open");
            break;
        default:
            setShowModel("close");
            break;
    }
}

  return (
    <Container>
      {props.user && navigate("/home")}
      <Nav>
        <a href="/" style={{textDecoration:"none"}}>
        <h1><span class="firstName">Idea</span><span class="lastName">Lab</span></h1>
        </a>
        <div>
          <SignIn onClick={handleClick}>Community Guidelines</SignIn>
        </div>
      </Nav>
      <Se>
      <Section>
        <Hero>
          <h1>Welcome to the world of <br></br> <span style={{fontSize:"130px"}}>Ideas</span> and <span style={{fontSize:"130px"}}>Inspiration</span></h1>
          <Form>
          <Google onClick={()=>handleSignIn("google")}>
            <img src="/images/google.svg" alt="" style={{marginRight:"5px"}} />
             Sign in with Google
          </Google>
          <Google onClick={()=>handleSignIn("github")}>
            <img src="/images/github-icon.png" alt="" width="20px" style={{marginRight:"5px"}}/>
             Sign in with Github
          </Google>
          <Google onClick={()=>handleSignIn("twitter")}>
            <img src="/images/twitter-icon.png" alt="" width="20px" style={{marginRight:"5px"}}/>
             Sign in with Twitter
          </Google>
        </Form>
        </Hero>
      </Section>
      </Se>
      <CommunityGuidelines showModel={showModel} handleClick={handleClick} />
    </Container>
  );
};
const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`

  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;
const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;


const SignIn = styled.a`
  color: #6667AB;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 200;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #6667AB;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Se = styled.div`
  background-image: url("/images/collaborative.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  position: absolute;
  z-index: -1;
  backdrop-filter: blur(2px);
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 60%;
    font-size: 56px;
    color: #6667AB;
    font-weight: 700;
    line-height: 100px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

`;

const Form = styled.div`
  margin-top:-200px;
  width: 100%;
  margin-left: 700px;
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 7px;
  align-items: center;
  height: 56px;
  width:50%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};
const mapDispatchToProps = (dispatch) => ({
    signIn: (provider) => dispatch(signInAPI(provider)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
 