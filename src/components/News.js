import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';


const News = () => {
  const [articles, setArticles] = useState([]);
  const [isFetchData, setIsFetchData] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      
      const result = await axios(
        'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=70697cf9e48f4099a26835ff0a84a9e7',
      );
      setArticles(result.data.articles);
      setIsFetchData(false); 
    };
    fetchData();

  }, []);
  if (isFetchData) {
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
    <div className='root'>
    <div className='organizrow'>
      {articles.map((article) => (
        <div key={article.url} className="organizcols locomo-top-hide">
          <div className='orcol orcol1'>
            <div className='content'>
            <a href={article.url} target="_blank" rel="noreferrer">
        <img src={article.urlToImage} alt={article.title} /></a>
          
            </div>
          </div>
          <div className='orcol orcol2'>
            <div className='content'>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            
            </div>
          </div>
        </div>
      ))}
    </div> 
    </div>
  );
};


export default News;
