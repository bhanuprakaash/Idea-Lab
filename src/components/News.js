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
        <div key={article.url}>
          <h2>{article.title}</h2>
          <img src={article.urlToImage} alt={article.title} />
          <p>{article.description}</p>
          <a href={article.url}>Clicke Here</a>
        </div>
      ))}
    </Container>
  );

};
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 1128px;
    min-height: 100vh;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    h2 {
        text-align: center;
        margin: 20px 0;
    }
    p {
        text-align: center;
        margin: 20px 0;
    }
`;


export default News;
