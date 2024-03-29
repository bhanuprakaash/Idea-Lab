import styled, { keyframes } from 'styled-components';
import React from 'react';
import PostModel from './PostModel';
import '../App.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getArticleLikes, getArticlesAPI } from '../actions';
import { getUserDetailsAPI } from '../actions';
import { handleLikeAPI, handleCommentAPI, getLikesAPI, getCommunityArticlesAPI,getConnectionsAPI,connectionArticlesx } from '../actions';
import ReactPlayer from 'react-player';
import Greeting from './Greeting';

const Main = (props) => {
  const [showModel, setShowModel] = useState('close');
  const [displayedWord, setDisplayedWord] = useState('');
  const [showComment, setShowComment] = useState('');
  const commentInputRef = React.useRef(null);
  const [comment, setComment] = useState('');
  const [connectionArticles, setConnectionArticles] = useState([]);

  useEffect(() => {
    if (props.user) {
      props.getUserDetails(props.user.uid);
    }
  }, [props.user]);

  useEffect(() => {
    if (props.user) {
      props.getConnections(props.user.uid);
    }
  }, [props.user]);

  useEffect(() => {
    if(props.connections){
      props.connections.map(async (connection)=>{
        await props.getArticles(connection);
        setConnectionArticles((prevState)=>[...prevState,props.articles])
      })
    }},[props.user]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (!props.userDetails) return;
      let word = props.userDetails.name;
      if (currentIndex === word.length) {
        clearInterval(interval);
        return;
      }
      setDisplayedWord(word.substring(0, currentIndex + 1));
      currentIndex++;
    }, 200);
    return () => clearInterval(interval);
  }, [props.userDetails.name]);

  useEffect(() => {
    if (props.user) {
      props.getCommunityArticles(props.user.uid);
    }
  }, [props.user,props.likes]);



  // useEffect(() => {
  //   if (props.communityArticles) {
  //     props.communityArticles.map((article) => {
  //       setShowComment((prevState) => ({
  //         ...prevState,
  //         [article.pid]: false,
  //       }));
  //     });
  //   }
  // }, [props.communityArticles]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModel) {
      case 'open':
        setShowModel('close');
        break;
      case 'close':
        setShowModel('open');
        break;
      default:
        setShowModel('close');
        break;
    }
  };

  const LikeHandler = async (postId, userId, ownerId) => {
    await props.handleLike(postId, userId, ownerId);  
    props.getLikes(postId,ownerId);
  };

  const commentHandler = (postId, userId, ownerId, comment) => {
    props.handleComment(postId, userId, ownerId, comment);
    setComment('');
    props.getCommunityArticles(props.user.uid);
  };

  const handleShowComment = (postId) => {
    setShowComment((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };



  return (
    <>
      <Container>
        <GreetingBox>
          <Greeting displayWord={displayedWord} />
        </GreetingBox>
        {props.communityArticles && props.communityArticles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <Content>
            {props.loading && <img src="/images/spinner.svg" alt="" />}
            {props.communityArticles &&
              props.communityArticles.length > 0 &&
              props.communityArticles.map((article, key) => {
                if (!article) {
                  return null;
                }
                return (
                  <Article key={key}>
                    <SharedActor>
                      <a>
                        <img
                          src={article.actor.image}
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
                            {article.actor.title}
                          </span>
                          {article.actor && <span>{article.actor.description}</span>}
                          {article.actor && <span>{article.actor.date}</span>}
                        </div>
                      </a>
                      <button>
                        <img src="/images/icons8-more.svg" alt="" width="20px" />
                        <Menu>
                          <a>Report</a>
                        </Menu>
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
                    {showComment[article.pid] && (
                      <CommentInput>
                        <textarea
                          value={comment}
                          type="text"
                          placeholder="Add a comment"
                          onChange={handleChangeComment}
                        />
                        <button
                          onClick={() => {
                            commentHandler(article.pid, props.user.uid, article.userId, comment);
                          }}
                          style={{ border: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                          disabled={!comment.trim()}
                        >
                          <img src="/images/icons8-send-comment.svg" alt="" class="svg-icon" />
                        </button>
                      </CommentInput>
                    )}
                    {
                      <CommentContainer>
                        {showComment[article.pid] &&
                          article.comments &&
                          article.comments.map((comment, key) => {
                            return (
                              <Comment key={key}>
                                <CommentHeader>
                                  <CommentAvatar src={props.userDetails.photoUrl} alt="" />
                                  <CommentUserName>{props.userDetails.name}</CommentUserName>
                                </CommentHeader>
                                <CommentText>{comment.comment}</CommentText>
                              </Comment>
                            );
                          })}
                      </CommentContainer>
                    }
                  </Article>
                );
              })}
          </Content>
        )}
        <PostModel showModel={showModel} handleClick={handleClick} />
      </Container>
    </>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  margin: 10px;
  border-radius: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;

const CommentUserName = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-right: 8px;
  font-family: Arial, Helvetica, sans-serif;
`;

const CommentText = styled.p`
  margin-left: 50px;
  margin-bottom: 8px;
  font-size: 15px;
  color: black;
  text-align: left;
`;

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  position: relative;
`;

const Comment = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.6);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: rgb(102, 103, 171);
        }
      }
    }
  }
`;
const GreetingBox = styled.div`
  margin: 0 0 8px;
  background: linear-gradient(135deg, #f8cfd1, rgb(102, 103, 177));
  text-align: left;
  padding: 0 0 8px;
  height: 150px;
  border-radius: 15px;
  h1 {
    font-family: Helvetica, Arial, sans-serif;
    font-style: italic;
    color: rgb(85, 85, 85);
    font-size: 35px;
    font-weight: 400;
    padding: 40px 24px 24px 40px;
    margin-bottom: 4px;
    text-align: left;
  }
  h2 {
    color: rgb(102, 103, 171);
    font-family: 'Andale Mono', monospace;
    font-size: 27px;
    font-weight: 400;
    padding: 12px 12px 12px 16px;
    margin-bottom: 4px;
    text-align: left;
    margin-left: 25px;
  }
`;
const Article = styled(CommonCard)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const Menu = styled.div`
  position: absolute;
  top: 25px;
  right: -20px;
  background: white;
  border-radius: 5px;
  display: none;
  height: 20px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.15);
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
    cursor: pointer;
    &:hover {
      ${Menu} {
        display: block;
      }
    }
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

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const CommentInput = styled.div`
  border-radius: 20px;
  padding: 5px;
  padding-top: 10px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  border: 1px solid #e6ecf0;
  background-color: #f9fafb;
  margin-left: 20px;
  margin-right: 20px;
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
    articles: state.articleState.articles,
    userDetails: state.userDetailsState.userDetails,
    likes: state.likesState.likes,
    communityArticles: state.communityArticlesState.communityArticles,
    connections: state.connectionsState.connections,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: (userId) => dispatch(getArticlesAPI(userId)),
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
  handleLike: (articleId, userId, ownerId) => dispatch(handleLikeAPI(articleId, userId, ownerId)),
  handleComment: (postId, userId, ownerId, comment) =>
    dispatch(handleCommentAPI(postId, userId, ownerId, comment)),
  getLikes: (postId, ownerId) => dispatch(getLikesAPI(postId, ownerId)),
  getCommunityArticles: (userId) => dispatch(getCommunityArticlesAPI(userId)),
  getConnections: (userId) => dispatch(getConnectionsAPI(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
