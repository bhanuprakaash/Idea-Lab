import styled from "styled-components";
import "../App.css";
import { useState } from "react";
import ReactPlayer from "react-player";
import {connect} from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions";

const PostModel = (props) => {
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink,setVideoLink] = useState("");
    const[assetArea,setAssetArea] = useState("");
    const handleChange = (e) => {
        const image = e.target.files[0];
        if(image === "" || image === undefined){
            alert(`Not an image, the file is a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    }
   
    
    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;
        }
        let videoURL = "";
        if(videoLink){
            // Use the cors-anywhere library to forward the request to the youtube server
            const proxyUrl = "https://cors-anywhere.herokuapp.com/";
            const targetUrl = videoLink;
            fetch(proxyUrl + targetUrl)
                .then((response) => response.text())
                .then((data) => {
                    // Handle the response data here
                    videoURL = data;
                    const fileExtension = videoLink.split('.').pop();
                    const videoName = `${Date.now()}.${fileExtension}`;
                    const storageRef = firebase.storage().ref();
                    const videoRef = storageRef.child(`videos/${videoName}`);
                    const videoTask = videoRef.putString(videoURL);
                    videoTask.then(() => {
                    videoRef.getDownloadURL().then(url => {
                        //  Do something with the video url
                        console.log("Video URL: ", url);
                        const payload = {
                            image: shareImage,
                            video: videoURL,
                            user: props.user,
                            description: editorText,
                            timestamp: firebase.firestore.Timestamp.now(),
                        };
                        props.postArticle(payload);
                        reset(e);
                        
                    });
            });
                    // write the code to send the videoURL to firebase storage
                    
                })
                .catch((error) => {
                    console.log("Error fetching video URL: ", error);
                });
                
        }
        
        
        const payload = {
            image: shareImage,
            video: videoURL,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };
        props.postArticle(payload);
        reset(e);
    };    
    
    
    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    }
    
    

  

    return (
        <>
        {props.showModel === "open" && 
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={(event)=>reset(event)}>
                        <img src="/images/closed-icon.svg" alt="" class="svg-icon"/>
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {props.user && props.user.photoURL ? (<img src={props.user.photoURL} alt=""/>)
                        :
                        (<img src="/images/user.svg" alt="" />)
                        }
                        <span>{props.user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)}
                         placeholder="What do you want to talk about?"
                        autoFocus={true} />
                        { assetArea === "image" ?
                        <UploadImage>
                            <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="file" style={{display: "none"}} onChange={handleChange}/>
                            <p>
                                <label htmlFor="file">Select an image to share</label>
                            </p>
                            {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                        </UploadImage> 
                            :
                            assetArea === "media" &&
                            <>
                            <input type="text" placeholder="Please input a video link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                            </>
                        }
                        {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
                        
                    </Editor>
                </SharedContent>
                <SharedCreation>
                    <AttachAssets>
                        <AssetButton onClick={()=> switchAssetArea("image")}>
                            <img src="/images/camera.svg" alt="" />
                        </AssetButton>
                        <AssetButton onClick={()=>switchAssetArea("media")}>
                            <img src="/images/video-icon.svg" alt="" />
                        </AssetButton>
                    </AttachAssets>
                    <ShareComment>
                        <AssetButton>
                            <img src="/images/comment-icon.svg" class="svg-icon" alt="" />
                            Anyone
                        </AssetButton>
                    </ShareComment>
                    <PostButton disabled={!editorText ? true : false}
                        onClick={(e) => postArticle(e)}            
                    >
                        Post
                    </PostButton>
                </SharedCreation>

            </Content>
        </Container>}
        </>
    );
   
}
const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    z-index: 9999;
    color:black;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
`;
const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;
const Header = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        svg, img {
            pointer-events: none;
        }
    }
`;
const SharedContent= styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img {
        width: 48px;
        border-radius: 50%;
        margin-right: 5px;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left:5px;
    }
`;

const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    svg {
        margin-right: 5px;
    }
    ${AssetButton} {
        width: 40px;
    }
`;

const ShareComment = styled.div`
    margin-left: 8px;
    border-left: 1px solid rgba(0,0,0,0.15);
    padding-left: 8px;
    ${AssetButton} {
        svg {
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
    &:hover {
        background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
}
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModel);