import { getLikesAPI, getUserDetailsAPI } from '../actions';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const Likes = (props) => {
  const postId = props.postId;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (props.user) {
      props.getLikes(props.postId);
    }
  }, [postId]);

  useEffect(() => {
    if (props.likes) {
      const fetchUserDetails = async () => {
        console.log(props.likes.userId);
        const userData = await props.getUserDetails(props.likes.userId);
        console.log(userData);
        setUsers([...users, userData.name]);
      };

      fetchUserDetails();
    }
  }, [props.likes]);

  useEffect(() => {
    return () => {
      setUsers([]);
    };
  }, []);

  if (!props.likes) {
    return <div>loading...</div>;
  }

  return (
    <div>
      Likes:
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    likes: state.likesState.likes,
    user: state.userState.user,
    userDetails: state.userDetailsState.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getLikes: (postId) => dispatch(getLikesAPI(postId)),
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
