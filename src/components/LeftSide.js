import styled from "styled-components";
import {connect} from 'react-redux';
import { getUserDetailsAPI } from "../actions";
import { useEffect } from "react";
const Leftside = (props) => {
  useEffect(()=>{
    if(props.user){
      props.getUserDetails(props.user.uid);
    }
  },[]
  )
  return (
    <Container>
      <ArtCard>
        <div>
          <img src="/images/icons8-add(1).svg" alt="add" width="100px" />
        </div>
        <Info>
          <h2>Hey,<br></br>Found anything new?</h2>
          <h3>Let's share it with your tech community! </h3>
          <p>
          <img src="/images/camera.svg" alt="" />
          <span>Photo</span>
          </p>
          <p><img src="/images/video-icon.svg" alt="" />
          <span>Video</span></p>
          <p>
          <img src="/images/icons8-idea(1).svg" alt=""/>
          <span>Idea</span>
          </p>
        </Info>
      </ArtCard>
      
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
  margin-top: 10px;
  width: 100%;
`;

const ArtCard = styled.div`
  height: 400px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-image: white;
  border:2px solid rgb(102,103,171);
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: sticky;
  top:110px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  div{
    height: 15%;
    img{
      object-fit: contain;
      height: 100%;
      cursor: pointer;
    }
    text-align: center;
    border:2px solid black;
    border-radius: 5px;
    padding: 15px;
    margin: 20px;
  }
`;

const Info = styled.section`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 16px;
  border:none;
  h2{
    font-family:Raleway;
    font-size: 24px;
    font-weight: 500;
    color: black;
    line-height: 1.5;
    margin-bottom: 5px;
  }
  h3{
    font-size: 15px;
    font-weight: 350;
    color: black;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  p {
        outline: none;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        line-height: 1.5;
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        font-weight: 600;
        margin-bottom: 5px;
    }
    span {
        margin-left: 5px;
        font-size: 18px;
    }
  text-align: left;
  padding: 20px;
  padding-top: 10px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    userDetails:state.userDetailsState.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUserDetails : (userId) =>dispatch(getUserDetailsAPI(userId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Leftside); 