import styled from "styled-components";
import React from "react";
import PostModel from './PostModel'
import "../App.css";
import { useState,useEffect } from "react";
import {connect} from "react-redux"
import {getArticlesAPI} from "../actions";
import { getUserDetailsAPI } from "../actions";
import { handleLikeAPI,handleCommentAPI,getLikesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
    const [showModel, setShowModel] = useState("close");
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comment, setComment] = useState("");
    const commentRef = React.useRef({});


      useEffect(() => {
        const newCommentRef = {};
        if (props.articles && props.articles.length > 0) {
          props.articles.forEach((article) => {
            if(article){
              newCommentRef[article.pid] = false;
            }
          });
          commentRef.current = newCommentRef;
        }
      }, [props.articles]);

    useEffect(() => {
        if (props.user) {
            props.getArticles(props.user.uid);
          }
    },[]);

    useEffect(() => {
        if (props.user) {
          props.getUserDetails(props.user.uid);
        }
      }, []);
      
      const handleShowCommentInput = () => {
        setShowCommentInput(!showCommentInput);
      };

      const handleShowComment = (pid) => {
        commentRef.current[pid] = !commentRef.current[pid];
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
    const LikeHandler =(postId,userId)=>{
        props.handleLike(postId,userId);
    }

    const commentHandler =(postId,userId,comment)=>{
        props.handleComment(postId,userId,comment);
        setShowCommentInput(false);
        setComment("");
    }


    return (
        <>
        
    <Container>
            <ShareBox>
            <div>
                { props.user && props.user.photoURL ?
                <img
                 src={props.userDetails?.photoUrl || "/images/user.svg"}
                 alt=""
                 referrerPolicy="no-referrer"
        />
                :
                <img src="/images/user.svg" alt="" />
                }
                    <button onClick={handleClick} 
                    disabled={props.loading ?true:false}>Start a post</button> 
                </div>
                <div>
                    <button>
                        <img src="/images/camera.svg" alt="" />
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src="/images/video-icon.svg" alt="" />
                        <span>Video</span>
                    </button> 
                    <button>
                        <img src="/images/icons8-idea(1).svg" alt=""/>
                        <span>Idea</span>
                    </button>
                </div>
            </ShareBox>
            { 
  props.articles.length === 0 
  ? 
  <p>There are no articles</p>
  :
  <Content>
    {
      props.loading && <img src="/images/spinner.svg" alt="" />
    }
    {console.log(props.articles)}
    { 
      props.articles.length > 0 &&
      props.articles.map((article,key) => {
        if (!article) {
          return null; 
        }

        return (
          <Article key={key}>
            <SharedActor>
              <a>
                <img src={props.userDetails.photoUrl} alt="" style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  marginRight: "8px",
                  objectFit: "cover",
                }}/>
                <div>
                  <span>{props.userDetails.name}</span>
                  {article.actor && <span>{article.actor.description}</span>}
                  {article.actor && <span>{article.actor.date}</span>}
                </div>
              </a>
              <button>
                <img src="/images/ell.png"  alt="" />
              </button>
            </SharedActor>
            <Description>
              {article.description}
            </Description>
            <SharedImg>
              <a>
                {  
                  !article.sharedImg && article.video ? (
                    <ReactPlayer width={"100%"} url={article.video} />
                  ) : (
                    article.sharedImg && <img src={article.sharedImg} alt="" />
                  )
                }
              </a>
            </SharedImg>
            <SocialCounts>
              <li>
                <button style={{border:"none", backgroundColor:"white",cursor:"pointer"}} onClick={() => { LikeHandler(article.pid, props.user.uid)}} > 
                  <img src="/images/icons8-good-quality(2).svg" alt="" class="svg-icon count-like"/>
                  <span class="count">{article.likes}</span>
                </button>
              </li>
              <li>
              <button onClick={() => { handleShowComment(article.pid); handleShowCommentInput(); }} style={{ border: "none", backgroundColor: "white",cursor:"pointer" }}>
                  <img src="/images/icons8-speech-bubble.svg" alt="" class="svg-icon count-comment" style={{marginRight:"5px"}}/>
                  <span class="count">
                    {
                      article.comments ? article.comments.length : 0
                    }
                  </span>
                </button>
              </li>
            </SocialCounts>

            {showCommentInput && (
              <CommentInput>
                <textarea value={comment} onChange={e=>setComment(e.target.value)} />
                <button onClick={()=>{commentHandler(article.pid,props.user.uid,comment)}} style={{ border: "none", backgroundColor: "white",cursor:"pointer" }}>
                  <img src="/images/icons8-send-comment.svg" alt="" class="svg-icon" />
                </button>
              </CommentInput>
            )}
            {article.comments.length > 0 &&
              (!commentRef.current[article.pid] ? (
                article.comments.slice(-1).map((comment,key)=>(
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
              ) : (
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
            }
          </Article>
        )
        })

      }

    </Content>
}
            <PostModel showModel={showModel} handleClick={handleClick}/>
        </Container>
        
        </>
    )
}

const CommentContainer = styled.div`
display: flex;
flex-direction: column;
padding: 16px;
background-color: #f2f2f2;
border-radius: 8px;
`

const CommentHeader = styled.div`
display: flex;
align-items: center;
margin-bottom: 8px;
`

const CommentAvatar = styled.img`
width: 38px;
height: 38px;
border-radius: 50%;
margin-right: 8px;
object-fit: cover;
`

const CommentUserName = styled.span`
font-weight: 400;
font-size: 14px;
margin-right: 8px;
font-family: Arial, Helvetica, sans-serif;
`

const CommentText = styled.p`
margin: 0;
font-size: 14px;
`

            
                

const Container = styled.div`
  grid-area: main;
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
        articles: state.articleState.articles,
        userDetails: state.userDetailsState.userDetails,
        likes: state.likesState.likes,
        };
};

const mapDispatchToProps = (dispatch) => ({
    getArticles: (userId) => dispatch(getArticlesAPI(userId)),
    getUserDetails:(userId)=>dispatch(getUserDetailsAPI(userId)),
    handleLike:(userId,articleId)=>dispatch(handleLikeAPI(userId,articleId)),
    handleComment:(userId,articleId,comment)=>dispatch(handleCommentAPI(userId,articleId,comment)),
    getLikes:(userId)=>dispatch(getLikesAPI(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);

