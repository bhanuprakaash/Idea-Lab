import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUserDetailsAPI } from '../actions';
import { useEffect } from 'react';
import PostModel from './PostModel';
import { useState } from 'react';
const Leftside = (props) => {
  const [showModel, setShowModel] = useState('close');
  useEffect(() => {
    if (props.user) {
      props.getUserDetails(props.user.uid);
    }
  }, []);
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
  return (
    <Container>
      <ArtCard>
        <div>
          <img src="/images/idea-got-it.svg" alt="add" width="200px" />
        </div>
        <HeadLine>
          <h2>
            <span style={{ color: 'rgb(102,103,171)' }}>Hey!</span>
            <br></br>Found anything new?
          </h2>
          <h3>Let's share it with your tech community! </h3>
        </HeadLine>
        <Info>
          <div>
            <p>
              <img src="/images/icons8-add(1).svg" alt="add" width="50px" onClick={handleClick} />
            </p>
            <article>
              <p>
                <img src="/images/camera.svg" alt="" />
                <span>Photo</span>
              </p>
              <p>
                <img src="/images/video-icon.svg" alt="" />
                <span>Video</span>
              </p>
              <p>
                <img src="/images/icons8-macbook-idea.svg" alt="" />
                <span>Idea</span>
              </p>
            </article>
          </div>
        </Info>
      </ArtCard>
      <PostModel showModel={showModel} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
  margin-top: 10px;
  width: 100%;
`;

const ArtCard = styled.div`
  min-height: 450px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  background-image: url('images/space-paper-airplane-with-blue-line.png');
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: bottom right;
  border-radius: 10px;
  transition: box-shadow 83ms;
  position: sticky;
  top: 110px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  div {
    height: 45%;
    img {
      object-fit: contain;
      height: 100%;
      cursor: pointer;
    }
    text-align: center;
    margin-bottom: 0px;
  }
`;

const HeadLine = styled.section`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 16px;
  border: none;
  text-align: left;
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
    margin-bottom: 10px;
  }
`;
// const Info = styled.section`
//   border:none;
//   div{
//     display: flex;
//     flex-wrap: wrap;
//     height:120px;
//     margin:  0 20px;
//     padding:10px;
//     padding-top: 0px;
//     border-radius: 10px;
//     border: 2px solid black;
//     justify-content: space-between;
//     p{
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       padding: 20px;
//     }
//     article{
//       display: flex;
//       flex-direction: column;
//       padding: 15px;
//       p{
//         padding:0;
//         display: flex;
//         flex-direction: row;
//         align-items: center;
//         font-weight: 600;
//         margin-bottom: 5px;
//         img{
//           width: 30px;
//           height: 30px;
//           margin-right: 5px;
//         }
//       }
//       span{
//         font-size: 18px;
//         color:rgba(102,103,171);
//         margin-top: 2px;
//       }

//     }

//   }
//   /* section{
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 10px;
//     cursor: pointer;
//     img{
//       width: 30px;
//       height: 30px;
//       margin-bottom: 5px;
//     } */
//     /* p{
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       font-weight: 600;
//       margin-bottom: 5px
//     }
//     span{
//       font-size: 14px;
//     }
//   }
//   p{
//         color: rgba(0, 0, 0, 0.6);
//         font-size: 14px;
//         line-height: 1.5;
//         background: transparent;
//         border: none;
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         font-weight: 600;
//         margin-bottom: 5px;
//     } */
// `;

const Info = styled.section`
  border: none;
  margin-bottom: 10px;
  div {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    height: auto;
    padding: 10px;
    padding-top: 0px;
    border-radius: 10px;
    border: 2px solid black;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    article {
      display: flex;
      flex-direction: column;
      padding: 15px;
      p {
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        margin-bottom: 5px;
        img {
          width: 30px;
          height: 30px;
          margin-right: 5px;
        }
      }
      span {
        font-size: 18px;
        color: rgba(102, 103, 171);
        margin-top: 2px;
      }
    }
  }
  @media only screen and (max-width: 750px) {
    div {
      padding: 0;
      margin: 0;
      padding: 5px;
      article {
        margin-top: 20px;
      }
    }
    p {
      align-items: center;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    userDetails: state.userDetailsState.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (userId) => dispatch(getUserDetailsAPI(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leftside);
