import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetForm = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // Handler for input value changes
  const onClearAttachmentHandler = () => setAttachment(null);

  // Handler for input value changes
  const onChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // Handler for image changes
  const onFileChangeHandler = (event) => {
    const {
      target: { files },
    } = event;

    const file = files[0];
    // FileReader API - async reads contents of files
    const reader = new FileReader();
    // event listener for file reader that listens for reader to finish reading
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  // Handler for submission of nweet to make request to firebase to save nweets
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (nweet === "") {
        return;
      }

      let attachmentUrl = "";

      if (attachment !== "") {
        // reference the firestore bucket (place that holds image information)
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(response.ref);
      }

      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };

      // add new nweet
      const addNweet = await addDoc(collection(dbService, "nweets"), nweetObj);
      console.log("Document written with ID: ", addNweet.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChangeHandler}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChangeHandler}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="nweet attachment preview"
          />
          <div
            className="factoryForm__clear"
            onClick={onClearAttachmentHandler}
          >
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetForm;
