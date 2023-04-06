import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [isFetchData, setIsFetchData] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apikey = 'c299eee1d750bf5caf033eb567f73fd1';
      const url = 'https://gnews.io/api/v4/search?q=technology&lang=en&country=us&max=10&apikey=' + apikey;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setArticles(data.articles);
          setIsFetchData(false);
        });
    };
    fetchData();
    console.log('articles', articles);
  }, []);
  if (isFetchData) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <img src="./images/circle-loading-lines.gif" alt="loading" width={100} />
      </div>
    );
  }

  return (
    <Root>
      <h1 style={{ color: 'rgb(85, 85, 85)' }}>
        Tech <span style={{ color: 'rgb(102,103,171)' }}>Today</span>
      </h1>
      <div className="organizrow">
        {articles.map((article) => (
          <div key={article.url} className="organizcols locomo-top-hide">
            <div className="orcol orcol1">
              <div className="content">
                <a href={article.url} target="_blank" rel="noreferrer">
                  {article.image ? (
                    <img src={article.image} alt={article.title} />
                  ) : (
                    <img src="./images/newss.bmp" alt={article.title} />
                  )}
                </a>
              </div>
            </div>
            <div className="orcol orcol2">
              <div className="content">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Root>
  );
};

const Root = styled.div`
  background-color: #ffffff;
  padding: 0 0 0 0;
  margin-top: 100px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: rgb(102, 103, 171);
  font-weight: 400;
  text-align: left;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 20px;
    padding-top: 50px;
  }
  .organizrow {
    osition: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 60px 0 20px;
    margin: 70px 0 10px;
  }
  .organizrow .organizcols {
    position: relative;
    cursor: pointer;
    height: 180px;
    width: 30%;
    margin: -10% 1.2% 20%;
    /*margin: -6% 1.2% 12%;*/
    
  }
  .organizrow .organizcols .orcol {
    height: 195px;
    transition: 0.5s;
  }

  .organizrow .organizcols .orcol.orcol1 {
    position: relative;
    background: #f6f6f6;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #aecfdc;
  }

  .organizrow .organizcols:hover .orcol.orcol1 {
    background: rgb(102, 103, 171);
    border-color: #ecf6fa;
    transform: translateY(0);
  }

  .organizrow .organizcols:hover {
    z-index: 3;
  }

  .organizrow .organizcols .orcol.orcol1 .content {
    opacity: 1;
    transition: 0.5s;
  }

  .organizrow .organizcols:hover .orcol.orcol1 .content {
    opacity: 1;
  }

  .organizrow .organizcols .orcol.orcol1 .content img {
    max-width: 100%;
    margin-bottom: 18px;
  }

  .organizrow .organizcols .orcol.orcol1.makeinindia .content img {
    height: 36px;
    max-width: 100%;
    margin: 18px 0 19px;
  }

  .organizrow .organizcols .orcol.orcol1 .content h2 {
    margin: 10px 0;
    padding: 0;
    text-align: left;
    font-size: 22px;
    line-height: 1.1;
    font-weight: 700;
    color: rgb(102, 103, 171);
    letter-spacing: -0.025em;
  }

  .organizrow .organizcols .orcol.orcol1 .content p {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 400;
    color: rgb(102, 103, 171);
  }

  .organizrow .organizcols .orcol.orcol2 {
    position: relative;
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    box-sizing: border-box;
    /*box-shadow: 0 10px 25px rgb(0 0 0 / 16%);*/
    transform: translateY(-120px);
    height: auto;
  }

  .organizrow .organizcols:hover .orcol.orcol2 {
    transform: translateY(0);
    background: #fff;
    box-shadow: 0 5px 28px rgb(0 0 0 / 12%);
  }

  .organizrow .organizcols:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 220px;
    left: 0;
    right: 0;
    top: 8px;
    bottom: 0;
    background: rgb(0 0 0 / 15%);
    filter: blur(19px);
    opacity: 0;
  }

  .organizrow .organizcols:hover:before {
    opacity: 1;
    transition: 0.5s;
    height: 100%;
  }

  .organizrow .organizcols .orcol.orcol2 .content p {
    font-size: 15px;
    line-height: 1.2;
    padding: 5px 0;
    font-weight: 400;
    list-style: square;
    margin: 0 0 5px;
  }
`;

export default News;
