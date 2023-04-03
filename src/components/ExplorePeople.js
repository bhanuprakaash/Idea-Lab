import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetailsAPI, getProfilesAPI } from '../actions';
import { Link } from 'react-router-dom';
const ExplorePeople = (props) => {
  useEffect(() => {
    if (props.user) {
      props.getProfiles(props.user.uid);
    }
  }, [props.user]);

  return (
    <Container>
      <h1 style={{ color: 'rgb(85, 85, 85)' }}>
        Explore <span style={{ color: 'rgb(102,103,171)' }}>People</span>
      </h1>
      {props.profiles &&
        props.profiles.map((profile) => (
          <People>
            <div style={{ display: 'flex', marginLeft: '1rem' }}>
              {profile.photoUrl === '' ? (
                <img src="/images/default-profile-icon.jpg" alt="user" />
              ) : (
                <img src={profile.photoUrl} alt="profile" />
              )}
              <h3 style={{ marginTop: '10px' }}>{profile.name}</h3>
            </div>
            <Link
              key={profile.userid}
              to={`/profile/${profile.userid}`}
              style={{ textDecoration: 'none' }}
            >
              <button>View profile</button>
            </Link>
          </People>
        ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 100px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
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
const People = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  justify-content: space-between;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
    color: rgb(85, 85, 85);
    margin-right: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: rgb(102, 103, 171);
    color: white;
    font-size: 0.8rem;
    font-weight: 400;
    cursor: pointer;
    margin-right: 3rem;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    userDetails: state.userState.userDetails,
    profiles: state.explorePeopleState.profiles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
  getProfiles: (userId) => dispatch(getProfilesAPI(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExplorePeople);
