import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
const Home = (props) => {
  const [delayComplete, setDelayComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setDelayComplete(true);
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor:"white",
          width:"100%",
        }}
      >
        <img
          src="./images/circle-loading-lines.gif"
          alt="loading"
          width={100}
        />
      </div>
    );
  }

    return (
        <Container>
          {delayComplete && (!props.user && <Navigate to="/" />)}
            <Layout>
                
                <Main/>
            </Layout>
        </Container>
    );
};

const Container = styled.div`
  padding-top: 75px;
  max-width: 100%;
`;



const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};
export default connect(mapStateToProps)(Home);
