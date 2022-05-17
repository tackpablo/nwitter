import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Nweet from "../components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // query firebase for nweet collection, order returned items by createdAt and then desc
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );

    // event listener for any changes (add, delete, update, etc) to database which sets the nweet and is real time (renders)
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  // Handler for submission of nweet to make request to firebase to save nweets
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
  };

  // Handler for input value changes
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
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            // checks if nweet creator is same as logged in user id
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
