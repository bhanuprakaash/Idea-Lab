import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserDetailsAPI, getArticlesAPI,saveProfileChangesAPI } from '../actions';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

function UserProfile(props) {
  const [comment, setComment] = useState('');
  const commentRef = React.useRef({});
  const [name, setName] = useState(props.userDetails.name);
  const [bio, setBio] = useState(props.userDetails.bio);
  const [email, setEmail] = useState(props.userDetails.email);
  const [education, setEducation] = useState(props.userDetails.education);
  const [skills, setSkills] = useState(props.userDetails.skills);
  const [location, setLocation] = useState(props.userDetails.location);
  const [currentRole, setCurrentRole] = useState(props.userDetails.currentRole);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const newCommentRef = {};
    if (props.articles && props.articles.length > 0) {
      props.articles.forEach((article) => {
        if (article) {
          newCommentRef[article.pid] = false;
        }
      });
      commentRef.current = newCommentRef;
    }
  }, []);

  useEffect(() => {
    setName(props.userDetails.name);
    setBio(props.userDetails.bio);
    setEmail(props.userDetails.email);
    setEducation(props.userDetails.education);
    setSkills(props.userDetails.skills);
    setLocation(props.userDetails.location);
    setCurrentRole(props.userDetails.currentRole);
  }, [props.userDetails]);
  

  useEffect(() => {
    if (props.user) {
      props.getArticles(props.user.uid);
    }
  }, [props.user]);

  const handleShowComment = (pid) => {
    commentRef.current[pid] = !commentRef.current[pid];
  };

  useEffect(() => {
    if (props.user) {
      props.getUserDetails(props.user.uid);
    }
  }, [props.user]);
  const LikeHandler = (postId, userId, ownerId) => {
    props.handleLike(postId, userId, ownerId);
  };

  const commentHandler = (postId, userId, ownerId, comment) => {
    props.handleComment(postId, userId, ownerId, comment);
    setComment('');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };
  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleCurrentRoleChange = (e) => {
    setCurrentRole(e.target.value);
  };
  const handleSaveChanges = () => {
    props.saveProfileChanges(props.userDetails.userid, name, bio, email, education, skills, location, currentRole);
    setShowEdit(false);
  };

  const EditView = (
    <EditContainer>
      <Edit>
        <h2 style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}>Edit Profile</h2>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
        </div>
        <div>
          <label>Bio</label>
          <input type="text" value={bio} onChange={handleBioChange} placeholder="Bio" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
        </div>
        <div>
          <label>Education</label>
          <input
            type="text"
            value={education}
            onChange={handleEducationChange}
            placeholder="Education"
          />
        </div>
        <div>
          <label>Skills</label>
          <input type="text" value={skills} onChange={handleSkillsChange} placeholder="Skills" />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Location"
          />
        </div>
        <div>
          <label>Current Role</label>
          <input
            type="text"
            value={currentRole}
            onChange={handleCurrentRoleChange}
            placeholder="Current Role"
          />
        </div>
        <button onClick={() => setShowEdit(false)}>Cancel</button>
        <button onClick={handleSaveChanges}>Save</button>
      </Edit>
    </EditContainer>
  );

  return (
    <>
      {showEdit ? (
        EditView
      ) : (
        <Container>
          <CoverImg>
            {props.userDetails.backGroundImageURL === '' ? (
              <img src="/images/cover.png" alt="cover" />
            ) : (
              <img src={props.userDetails.backGroundImageURL} alt="cover" />
            )}
          </CoverImg>
          <Profile>
            <ProfileImg>
              {props.userDetails.photoUrl !== '' ? (
                <img src="/images/default-profile-icon.jpg" alt="user" />
              ) : (
                <img src={props.userDetails.photoUrl} alt="user" />
              )}
            </ProfileImg>
            <Info>
              <h2>{props.userDetails.name}</h2>
              <p>
                {props.userDetails.bio === ''
                  ? 'No Bio.Must be 25 Characters'
                  : props.userDetails.bio}
              </p>
              <p>
                <span>{props.userDetails.location} | {props.userDetails.currentRole}</span>
              </p>
              <Details>
                <div>
                  <h3>Email:</h3>
                  <h3>Education:</h3>
                  <h3>Skills:</h3>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <h3>{props.userDetails.email}</h3>
                  <h3>{props.userDetails.education}</h3>
                  <h3>{props.userDetails.skills}</h3>
                </div>
              </Details>
              <Follow>
                <div>
                  <p>12</p>
                  <p style={{ fontSize: '13px' }}>Following</p>
                </div>
                <div>
                  <p>12</p>
                  <p style={{ fontSize: '13px' }}>Followers</p>
                </div>
                <div>
                  <button style={{ marginLeft: '20px' }} onClick={() => setShowEdit(true)}>
                    Edit Profile
                  </button>
                </div>
              </Follow>
            </Info>
          </Profile>
          {props.articles.length < 0 ? (
            <h2
              style={{
                margin: '10px',
                fontWeight: 'normal',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              Lets share something{' '}
            </h2>
          ) : (
            <Content>
              <h2 style={{ margin: '10px', fontWeight: 'normal', fontSize: '20px' }}>
                Recent Articles
              </h2>
              {props.articles.length > 0 &&
                props.articles.map((article, key) => {
                  if (!article) {
                    return null;
                  }

                  return (
                    <Article key={key}>
                      <SharedActor>
                        <a>
                          <img
                            src={props.userDetails.photoUrl}
                            alt=""
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              marginRight: '8px',
                              objectFit: 'cover',
                            }}
                          />
                          <div>
                            <span>{props.userDetails.name}</span>
                            {article.actor && <span>{article.actor.description}</span>}
                            {article.actor && <span>{article.actor.date}</span>}
                          </div>
                        </a>
                        <button>
                          <img src="/images/ell.png" alt="" />
                        </button>
                      </SharedActor>
                      <Description>{article.description}</Description>
                      <SharedImg>
                        <a>
                          {!article.sharedImg && article.video ? (
                            <ReactPlayer width={'100%'} url={article.video} />
                          ) : (
                            article.sharedImg && <img src={article.sharedImg} alt="" />
                          )}
                        </a>
                      </SharedImg>
                      <SocialCounts>
                        <li>
                          <button
                            style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                            onClick={() => {
                              LikeHandler(article.pid, props.user.uid, article.userId);
                            }}
                          >
                            <img
                              src="/images/icons8-good-quality(2).svg"
                              alt=""
                              class="svg-icon count-like"
                            />
                            <span class="count">{article.likes}</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleShowComment(article.pid);
                            }}
                            style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                          >
                            <img
                              src="/images/icons8-speech-bubble.svg"
                              alt=""
                              class="svg-icon count-comment"
                              style={{ marginRight: '5px' }}
                            />
                            <span class="count">
                              {article.comments ? article.comments.length : 0}
                            </span>
                          </button>
                        </li>
                      </SocialCounts>

                      {!commentRef.current[article.pid] && (
                        <CommentInput>
                          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                          <button
                            onClick={() => {
                              commentHandler(article.pid, props.user.uid, article.userId, comment);
                            }}
                            style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                          >
                            <img src="/images/icons8-send-comment.svg" alt="" class="svg-icon" />
                          </button>
                        </CommentInput>
                      )}
                      {/*
                            ( article.comments.length>0 &&
                              !commentRef.current[article.pid] &&(
                              article.comments.map((comment,key)=>(
                                <CommentContainer key={key}>
                                  <CommentHeader>
                                    <CommentAvatar src={props.userDetails.photoUrl} alt="" />
                                    <div>
                                      <CommentUserName>{props.userDetails.name}</CommentUserName>
                                      <span style={{fontSize:"10px"}}>{
                                          new Date().toLocaleDateString()
                                      }</span>
                                    </div>
                                  </CommentHeader>
                                  <CommentText>{comment.comment}</CommentText>
                                </CommentContainer>
                              ))
                            ))
                            */}
                    </Article>
                  );
                })}
            </Content>
          )}
        </Container>
      )}
    </>
  );
}

const EditContainer = styled.div`
  margin-top: 110px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Edit = styled.form`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 40px;
  padding: 50px;
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    label {
      margin-right: 10px;
      margin-top: 10px;
    }
    input {
      width: 75%;
      height: 40px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      padding: 0 10px;
      margin-bottom: 20px;
      margin-left: 20px;
    }
  }
  button {
    width: 100%;
    height: 40px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 20px;
    background-color: #ffffff;
    cursor: pointer;
  }
`;

const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CoverImg = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 350px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Profile = styled.div`
  background-color: #ffffff;
  width: 50%;
  height: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 200px;
  left: 15%;
`;

const ProfileImg = styled.div`
  width: 200px;
  height: 100%;
  img {
    width: 200px;
    height: 250px;
    object-fit: cover;
  }
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 20px;
  padding-top: 15px;
  h2 {
    font-size: 24px;
    font-weight: 500;
    color: black;
    line-height: 1.5;
    margin-bottom: 5px;
  }
  h3 {
    font-size: 15px;
    font-weight: 350;
    color: black;
    line-height: 1.5;
    margin-bottom: 5px;
  }
  p {
    width: 100%;
    font-size: 15px;
    height: 100%;
    margin-bottom: 5px;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  div {
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
  }
`;

const Follow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  button {
    width: 100%;
    height: 100%;
    background-color: #0a66c2;
    color: white;
    border-radius: 20px;
    border: none;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: #004182;
    }
  }
  div {
    font-size: 15px;
    font-weight: 350;
    color: black;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 20px;
      font-weight: 500;
      color: black;
    }
  }
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

const Content = styled.div`
  text-align: center;
  width: 750px;
  & > img {
    width: 30px;
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 auto;
  min-width: 700px;
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

const CommentInput = styled.div`
  border-radius: 20px;
  padding: 0 16px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  border: 1px solid #e6ecf0;
  background-color: #f9fafb;
  textarea {
    resize: none;
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 16px;
    margin-left: 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    userDetails: state.userDetailsState.userDetails,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: (userId) => dispatch(getArticlesAPI(userId)),
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
  saveProfileChanges: (userId,name,bio,email,education,skills,location,currentRole) => dispatch(saveProfileChangesAPI(userId,name,bio,email,education,skills,location,currentRole)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
