import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  // Handler for deleting of nweets
  const onDeleteHandler = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");

    if (ok) {
      // reference the firestore db collection and nweet id
      const deleteNweet = doc(dbService, "nweets", `${nweetObj.id}`);
      // delete nweet
      await deleteDoc(deleteNweet);
      // delete nweet attachment URL
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  };

  // Handler for rendering edit form
  const toggleEditingHandler = () => setEditing((prev) => !prev);

  // Handler for submitting editing of nweet
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updateNweetRef = doc(dbService, "nweets", `${nweetObj.id}`);

    await updateDoc(updateNweetRef, {
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmitHandler} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChangeHandler}
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditingHandler} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner ? (
            <h6>- Owner &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h6>
          ) : (
            <h6>- from {nweetObj.creatorId}</h6>
          )}
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="nweet attachment" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteHandler}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditingHandler}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
