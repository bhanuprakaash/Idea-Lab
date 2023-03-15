import React from 'react';
export default function Greeting(props) {
  const currentTime = new Date().getHours();
  let greeting;
  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good Morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  return (
    <div>
      <h1>Hey! {greeting},</h1>
      <h2>{props.displayWord}</h2>
    </div>
  );
}
