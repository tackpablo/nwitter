import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          value={nweet}
          onChange={onChangeHandler}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
