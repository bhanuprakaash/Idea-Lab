import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getArticlesAPI, uploadImageAPI } from '../actions';
import { getUserDetailsAPI } from '../actions';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 45px;
`;
const CameraIcon = styled.i`
  position: absolute;
  bottom: -25px;
  right: -25px;
  font-size: 40px;
  color: white;
  cursor: pointer;
`;

const ProfilePic = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 75px;
  margin-top: -75px;
  border: 5px solid white;
  position: relative;
`;

const Name = styled.h1`
  font-size: 36px;
  margin-top: 10px;
`;

const Work = styled.h2`
  font-size: 24px;
  margin-top: 10px;
  color: gray;
`;

const Bio = styled.p`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  width: 80%;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Skill = styled.div`
  background-color: lightgray;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Posts = styled.div`
  margin-top: 10px;
  width: 50%;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    background: transparent;
    border: none;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const Profile = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (props.user) {
      props.getArticles(props.user.uid);
    }
  }, []);

  useEffect(() => {
    if (props.user) {
      props.getUserDetails(props.user.uid);
    }
  }, []);

  if (!props.user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (imageType) => {
    if (imageType === 'background') {
      props.uploadImage(image, props.user.uid, 'background');
    } else if (imageType === 'profile') {
      props.uploadImage(image, props.user.uid, 'profile');
    }
  };

  return (
    <Container>
      <BackgroundImage
        src={props.userDetails.backGroundImageURL}
        onClick={() => document.querySelector("input[type='file']").click()}
      >
        <input type="file" onChange={handleChange} accept="image/*" style={{ display: 'none' }} />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleUpload('background');
          }}
          style={{
            position: 'absolute',
            bottom: '-15px',
            right: '0',
            padding: '5px',
            cursor: 'pointer',
          }}
        >
          <CloudUploadIcon />
        </IconButton>
      </BackgroundImage>
      <ProfilePic
        src={props.userDetails.photoUrl}
        onClick={() => document.querySelector("input[type='file']").click()}
      >
        <input type="file" onChange={handleChange} accept="image/*" style={{ display: 'none' }} />
        <IconButton
          style={{
            position: 'absolute',
            bottom: '5px',
            right: '0',
            padding: '5px',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleUpload('profile');
          }}
        >
          <CloudUploadIcon />
        </IconButton>
      </ProfilePic>
      <Name>{props.userDetails.name}</Name>
      <Work>Work</Work>
      <Bio>Bio</Bio>
      <Skills>Skill</Skills>
      <Posts></Posts>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    articles: state.articleState.articles,
    userDetails: state.userDetailsState.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: (userId) => dispatch(getArticlesAPI(userId)),
  uploadImage: (image, userId, imageType) => dispatch(uploadImageAPI(image, userId, imageType)),
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
