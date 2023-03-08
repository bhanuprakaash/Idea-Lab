import React, { useState,useEffect } from "react";
import {connect} from "react-redux";
import { getArticlesAPI,uploadImageAPI } from "../actions";
import { getUserDetailsAPI } from "../actions";


function UserProfile(props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [connections, setConnections] = useState(0);
  const [image, setImage] = useState(null);

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


  if (!props.user) {
    return <div>Loading...</div>;
  }


  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

 

  const handleUpload = (imageType) => {
    if(imageType === 'background'){
      props.uploadImage(image,props.user.uid,'background');
    }
    else if(imageType === 'profile'){
      props.uploadImage(image,props.user.uid,'profile');
    }
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setConnections(connections + (isFollowing ? -1 : 1)); 
  };

  return (
    <div>
      <div style={styles.imageContainer}>
        <img
          src={props.userDetails.backGroundImageURL}
          alt="image"
          style={styles.image}
          onClick={() => document.querySelector("input[type='file']").click()}
        />
        <button
          style={isFollowing ? styles.followButtonActive : styles.followButton}
          onClick={toggleFollow}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
      <div style={styles.infoContainer}>
        <img
          src={props.userDetails.photoUrl}
          alt="secondimage"
          style={styles.secondImage}
        />
        {console.log(props.userDetails.photoUrl)}
          <h2 style={styles.name}>{props.userDetails.name}</h2>
          <p style={styles.profession}>User profession</p>
          <p style={styles.location}>Profession/ Location</p>
          <p style={styles.current}>Current: Present Role </p>
          <p style={styles.previous}>Previous: Previousily Worked</p>
          <p style={styles.education}>Education: Studies Completed </p>
          <p style={styles.connections}>{connections} <a href="#"> Connections</a></p>
        </div>
      </div>
    

  );
}

const styles = {
  imageContainer: {
    position: "relative",
  },
  image: {
    marginTop:"20px",
    width: "95%",
    height: "320px",
    background: "black",
    marginLeft:"30px",
    marginTop:"20px",
    filter: "blur(0.5px)"
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalImage: {
    maxWidth: "800vw",
    maxHeight: "80vh",
    objectFit: "contain",
    background: "black",
  },
  
  followButton: {
    position: "absolute",
    top:"90%",
    bottom: "5%",
    left: "277%",
    width: "130px",
    height: "50px",
    backgroundColor: "skyblue",
    color: "white",
    zIndex: "1",
    borderRadius: "15px",
  },
  followButtonActive: {
    position: "absolute",
    top:"50%",
    bottom: "5%",
    left: "275%",
    width: "150px",
    height: "50px",
    backgroundColor: "white",
    color: "blue",
    zIndex: "1",
    borderRadius: "15px",
    border: "2px solid blue",
  },
  secondImage:{
    position:"absolute",
    top:"0%",
    left:"0%",
    width:"25%",
    height:"100%",
    


  },
  infoContainer: {
    position:"absolute",
    top:"30%",
    width:"50%",
    height:"200px",
    padding: "1rem",
    textAlign: "center",
    border: "2px solid black",
    marginLeft:"140px",
    background:"white",
    
  },
  name: {
    position:"absolute",
    top:"0",
    left:"28%",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  profession: {
    position:"absolute",
    top:"25%",
    left:"28%",
    fontSize: "1rem",
    fontWeight: "normal",
    marginBottom: "0.5rem"
  },
  location: {
    position:"absolute",
    top:"33%",
    left:"28%",
    fontSize: "1rem",
    fontWeight: "normal",
    marginBottom: "0.5rem"
  },
  current: {
    position:"absolute",
    top:"60%",
    left:"28%",
    fontSize: "1rem",
    fontWeight: "normal",
    marginBottom: "0.5rem"
  },
  previous: {
    position:"absolute",
    top:"70%",
    left:"28%",
    fontSize: "1rem",
    fontWeight: "normal",
    marginBottom: "0.5rem"
  },
  education: {
    position:"absolute",
    top:"80%",
    left:"28%",
    fontSize: "1rem",
    fontWeight: "normal",
    marginBottom: "0.5rem"
  },
  connections:{
    position:"absolute",
    top:"80%",
    left:"85%"
  }
  }
const mapStateToProps = (state) => {
    return {
      user: state.userState.user,
      articles: state.articleState.articles,
      userDetails: state.userDetailsState.userDetails,
    };
  };
  const mapDispatchToProps = (dispatch) => ({
    getArticles: (userId) => dispatch(getArticlesAPI(userId)),
    uploadImage: (image,userId,imageType) => dispatch(uploadImageAPI(image,userId,imageType)),
    getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
  });
  export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);