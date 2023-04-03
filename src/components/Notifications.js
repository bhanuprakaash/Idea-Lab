import React from 'react';
import styled from 'styled-components';
const Notifications = () => {
  return (
    <Container>
      <img src="/images/notifications.svg" alt="notifications" />
      <h1 style={{ color: 'rgb(85, 85, 85)' }}>
        Get <span style={{ color: 'rgb(102,103,171)' }}>Notified</span>
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

export default Notifications;
