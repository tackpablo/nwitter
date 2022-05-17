import React, { useState } from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  // Handler for deleting of nweets
  const onDeleteHandler = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");

    if (ok) {
      // reference the firestore db collection and nweet id
      const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
      // delete nweet
      await deleteDoc(NweetTextRef);
    }
  };

  // Handler for rendering edit form
  const toggleEditingHandler = () => setEditing((prev) => !prev);

  // Handler for submitting editing of nweet
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    // reference the firestore db collection and nweet id
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

    await updateDoc(NweetTextRef, {
      text: newNweet,
    });

    setEditing(false);
  };

  // Handler for input value changes
  const onChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChangeHandler}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditingHandler}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteHandler}>Delete Nweet</button>
              <button onClick={toggleEditingHandler}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
