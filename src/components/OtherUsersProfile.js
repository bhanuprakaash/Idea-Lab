import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserDetailsAPI, getArticlesAPI,handleFollowAPI } from '../actions';
import styled from 'styled-components';
import React from 'react';
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';

function OtherUsersProfile(props) {
  const [comment, setComment] = useState('');
  const commentRef = React.useRef({});
  const {id} = useParams();
  console.log("userparams",id);
  const location = useLocation();
  const ownerId =location.state?.ownerId;
  console.log("ownerId",ownerId);
  useEffect(() => {
    if(id){
      props.getUserDetails(id);
    }
  }, [id]);

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
    props.getArticles(id);
  }, [id]);

  useEffect(() => {
    document.title = `${props.userDetails.name} | Idea Lab`;
  }, [props.userDetails]);


  const handleShowComment = (pid) => {
    commentRef.current[pid] = !commentRef.current[pid];
  };

  const LikeHandler = (postId, userId, ownerId) => {
    props.handleLike(postId, userId, ownerId);
  };

  const commentHandler = (postId, userId, ownerId, comment) => {
    props.handleComment(postId, userId, ownerId, comment);
    setComment('');
  };

  const handleFollowers = (ownerId, userId) => {
    props.handleFollow(ownerId, userId);
  };

  return (
    <>
      <Container>
        {console.log("userDetails",props.userDetails.userid)}
        {props.user && console.log("user",props.user.uid)}
        <CoverImg>
          {props.userDetails.backGroundImageURL === '' ? (
            <img src="/images/cover.png" alt="cover" />
          ) : (
            <img src={props.userDetails.backGroundImageURL} alt="cover" />
          )}
        </CoverImg>
        <Profile>
          <ProfileImg>
            {props.userDetails.photoUrl === '' ? (
              <img src="/images/default-profile-icon.jpg" alt="user" />
            ) : (
              <img src={props.userDetails.photoUrl} alt="user" />
            )}
          </ProfileImg>
          <Info>
            <h2 style={{ color: 'rgb(102,103,171)' }}>{props.userDetails.name}</h2>
            <p>
              {props.userDetails.bio === ''
                ? 'No Bio.Must be 25 Characters'
                : props.userDetails.bio}
            </p>
            <p>
              <span> {props.userDetails.location} | </span>
              <span>{props.userDetails.currentRole}</span>
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
                {props.user && (
                  <button 
                  disabled={props.user.uid === props.userDetails.userid}
                  onClick={() => handleFollowers(props.user.uid, props.userDetails.userid)}
                  >Follow</button>
                )}
              <div>
                <p>12</p>
                <p style={{ fontSize: '13px' }}>Followers</p>
              </div>
            </Follow>
          </Info>
        </Profile>
        {props.articles && props.articles.length < 0 ? (
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
            Let's share something
          </h2>
        ) : (
          <Content>
            <h2 style={{ margin: '10px', fontWeight: 'normal', fontSize: '20px' }}>
              Recent Articles
            </h2>
            {props.articles &&
              props.articles.length > 0 &&
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
                          <span style={{ color: 'rgb(102,103,171)', fontWeight: 'bold' }}>
                            {props.userDetails.name}
                          </span>
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
    </>
  );
}
const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
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
  justify-content: space-between;
  button {
    width: 100px;
    height: 30px;
    border-radius: 20px;
    border: none;
    background-color: #0a66c2;
    color: white;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
  }
  button:disabled {
    visibility: hidden;
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
  position: relative;
  border: none;
`;
const Content = styled.div`
  text-align: center;
  width: 750px;
  & > img {
    width: 30px;
  }
`;

const Article = styled(CommonCard)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
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
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
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
    handleFollow: state.followState.handleFollow,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
  getArticles: (userId) => dispatch(getArticlesAPI(userId)),
  handleFollow: (ownerId,userId) => dispatch(handleFollowAPI(ownerId,userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OtherUsersProfile);
