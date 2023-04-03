import Header from './Header';
import MyNetwork from './MyNetwork';
import ExplorePeople from './ExplorePeople';
import styled from 'styled-components';
const LabCommunity = () => {
  return (
    <Container>
      <Header />
      <MyNetwork />
      <ExplorePeople />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #ffffff;
`;

export default LabCommunity;
