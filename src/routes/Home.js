import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetForm from "../components/NweetForm";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

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

  return (
    <div className="container">
      <NweetForm userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
