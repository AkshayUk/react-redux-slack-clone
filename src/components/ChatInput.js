import { Button } from "@material-ui/core";
import firebase from "firebase";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";

function ChatInput({ channelName, channelId, chatRef }) {
  const [user] = useAuthState(auth);

  const inputRef = useRef(null);
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .add({
        message: inputRef.current.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL
      });

    inputRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form>
        <input ref={inputRef} placeholder={`Message #${channelName}`} />
        <Button type="sumbit" onClick={handleSendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;

    > input {
      position: fixed;
      bottom: 30px;
      width: 75%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 10px;
      outline: none;
    }

    > button {
      display: none;
    }
  }
`;
