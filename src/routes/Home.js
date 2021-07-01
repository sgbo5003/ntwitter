import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Ntweet" />
      </form>
    </div>
  );
};
export default Home;
