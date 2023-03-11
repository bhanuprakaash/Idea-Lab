import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=70697cf9e48f4099a26835ff0a84a9e7',
      );

      setArticles(result.data.articles);
    };

    fetchData();
  }, []);

  return (
    <Container>
    {articles.map((article) => (
      <ArticleContainer key={article.url}>
        <img src={article.urlToImage} alt={article.title} />
        <div>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url}>Click Here</a>
        </div>
      </ArticleContainer>
    ))}
  </Container>
  );

};
const Container = styled.div`
  padding-top:75px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ArticleContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }

  a {
    font-size: 16px;
    color: #0000ff;
    text-decoration: none;
  }
`;

export default News;