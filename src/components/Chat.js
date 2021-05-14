import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import React, { useEffect, useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector((state) => state.app.roomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loadingMessages] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [roomId, loadingMessages, roomMessages]);

  return (
    <ChatContainer>
      {roomId ? (
        <>
          {" "}
          <ChatHeader>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails && roomDetails.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </ChatHeader>
          <ChatMessages>
            {loadingMessages && <h5 style={{ padding: 30 }}>Loading..</h5>}
            {roomMessages?.docs.map((doc) => {
              return <ChatBubble data={doc.data()} />;
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails && roomDetails.data().name}
            channelId={roomId}
          />
        </>
      ) : null}
    </ChatContainer>
  );
}

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    margin-right: 5px;
  }
  > .MuiSvgIcon-root {
    padding-right: 8px;
    color: gold;
  }
`;

const HeaderRight = styled.div`
  cursor: pointer;
  > p {
    display: flex;
    align-items: center;

    > .MuiSvgIcon-root {
      padding-right: 8px;
      color: var(--slack-secondary);
    }
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 80px;
`;
