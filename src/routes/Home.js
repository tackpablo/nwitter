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
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    // create a query against a collection, specify ordering
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );

    // event listener for any changes (add, delete, update, etc) to database query which updates our nweets
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
      const addNweetRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", addNweetRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
  };

  // Handler for input value changes
  const onChangeHandler = (event) => {
    // destructure based on the target's value, same as event.target.value
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // Handler for image changes
  const onFileChangeHandler = (event) => {
    // destructure based on the target's files, same as event.target.files
    const {
      target: { files },
    } = event;

    const file = files[0];
    // FileReader API - async reads contents of files
    const reader = new FileReader();
    // event listener for file reader that listens for reader to finish reading
    reader.onloadend = (finishedEvent) => {
      // destructure based on the finishedEvent's result, same as finishedEvent.currentTarget.result
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  // Handler for input value changes
  const onClearAttachmentHandler = () => setAttachment(null);

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
        <input type="file" accept="image/*" onChange={onFileChangeHandler} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentHandler}>Clear</button>
          </div>
        )}
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
