import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

const NweetForm = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // Handler for input value changes
  const onClearAttachmentHandler = () => setAttachment(null);

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

  // Handler for submission of nweet to make request to firebase to save nweets
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let attachmentUrl = "";

      if (attachment !== "") {
        // reference the firestore bucket
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
  );
};

export default NweetForm;
