import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetailsAPI, getConnectionsAPI } from '../actions';
import { Link } from 'react-router-dom';
const MyNetwork = (props) => {
  useEffect(() => {
    if (props.user) {
      props.getUserDetails(props.user.uid);
    }
  }, [props.user]);

  useEffect(() => {
    if (props.user) {
      props.getConnections(props.user.uid);
    }
  }, [props.user, props.userDetails]);

  return (
    <>
      {props.connections && props.connections.length === 0 ? (
        <Container style={{ backgroundColor: 'white' }}>
          <h1 style={{ color: 'rgb(85, 85, 85)' }}>
            My <span style={{ color: 'rgb(102,103,171)' }}>Network</span>
          </h1>
          <h2 style={{ color: 'rgb(85, 85, 85)', textAlign: 'center' }}>You have no connections</h2>
        </Container>
      ) : (
        <Container style={{ backgroundColor: 'white' }}>
          <h1 style={{ color: 'rgb(85, 85, 85)' }}>
            My <span style={{ color: 'rgb(102,103,171)' }}>Network</span>
          </h1>
          <Connections>
            {props.connections &&
              props.connections.map((connection) => (
                <div>
                  {connection.photoUrl === '' ? (
                    <img src="/images/default-profile-icon.jpg" alt="user" />
                  ) : (
                    <img src={connection.photoUrl} alt="profile" />
                  )}
                  <h3>{connection.name}</h3>
                  <Link
                    key={connection.userid}
                    to={`/profile/${connection.userid}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <button>View profile</button>
                  </Link>
                </div>
              ))}
          </Connections>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  margin-top: 100px;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #ffffff;
  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 20px;
    padding-top: 20px;
  }
`;
const Connections = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 10px;
    width: 200px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    h3 {
      font-size: 16px;
      padding: 10px;
      font-weight: 550;
      margin: 10px 0;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    button {
      background-color: transparent;
      color: rgb(102, 103, 171);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
      padding: 16px;
      align-items: center;
      border-radius: 15px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      max-width: 480px;
      text-align: center;
      outline: none;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    userDetails: state.userDetailsState.userDetails,
    connections: state.networkState.connections,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
    getConnections: (userId) => dispatch(getConnectionsAPI(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyNetwork);
