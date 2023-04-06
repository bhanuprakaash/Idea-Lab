import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
const MindShare = () => {
  useEffect(() => {
    document.title = 'Mind Share | Idea Lab';
  }, []);
  return (
    <Container>
      <img src="/images/bubble-gum-message-sent.gif" alt="message" />
      <h1 style={{ color: 'rgb(85, 85, 85)' }}>
        Mind <span style={{ color: 'rgb(102,103,171)' }}>Share</span>
      </h1>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  padding: 0 0 0 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  img {
    width: 350px;
  }
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin: 20px;
    padding-top: 20px;
  }
`;

export default MindShare;
