import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDetailsAPI } from "../actions";
import styled from "styled-components";
function OtherUserProfile(props) {
    const location = useLocation();
    const userId = location.pathname.split("/").pop();
    useEffect(()=>{
            props.getUserDetails(userId);
    },[]);
    return (
        <Container>
            <CoverImg>
                {
                    props.userDetails.coverImg === "" ? <img src="/images/cover.jpg" alt="cover" /> : <img src={props.userDetails.coverImg} alt="cover" />
                }
            </CoverImg>
            <Profile>
                <ProfileImg>
                    <img src={props.userDetails.photoUrl} alt="profile" />
                </ProfileImg>
                <Info>
                    <h2>{props.userDetails.name}</h2>
                    <p>{
                        props.userDetails.bio === "" ? "No Bio" : props.userDetails.bio
                        }</p>
                    <h3><span>Email: </span>{props.userDetails.email}</h3>
                    <h3><span>Education: </span>Sanskrithi School of Engineering</h3>
                    <h3><span>Skills: </span>React, Spring</h3>
                </Info>
            </Profile>
        </Container>
        
    );
}
const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const CoverImg = styled.div`
    width:80%;
    margin: 0 auto;
    height:200px;
    position: relative;
    border: 2px solid black;
    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }
`;

const Profile = styled.div`
    border:2px solid black;
    width:50%;
    height:200px;
    display:flex;
    flex-direction:row;
    align-items:center;
    position:absolute;
    top:150px;
    left:15%;
`;

const ProfileImg = styled.div`
    width:200px;
    height:100%;
    img{
        width:200px;
        height:200px;
        object-fit:cover;
    }
`;

const Info = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:left;
    margin-left:20px;
    h2{
        font-size:24px;
        font-weight:500;
        color:black;
        line-height:1.5;
        margin-bottom:5px;
    }
    h3{
        font-size:15px;
        font-weight:350;
        color:black;
        line-height:1.5;
        margin-bottom:10px;
    }
`;



const mapStateToProps = (state) => {
return {
    userDetails:state.userDetailsState.userDetails,
};
};
const mapDispatchToProps = (dispatch) => ({
    getUserDetails:(userId)=>dispatch(getUserDetailsAPI(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile);
  