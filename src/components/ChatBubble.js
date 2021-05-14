import React from "react";
import styled from "styled-components";

function ChatBubble(props) {
  const { message, timestamp, user, userImage } = props.data;
  return (
    <ChatBubbleContainer>
      <img src={userImage} alt="User image" />
      <ChatBubbleMessageInfo>
        <h4>
          {user}{" "}
          <span>{timestamp && new Date(timestamp.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </ChatBubbleMessageInfo>
    </ChatBubbleContainer>
  );
}

export default ChatBubble;

const ChatBubbleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 40px;
    width: 40px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 10px;
  }
`;

const ChatBubbleMessageInfo = styled.div`
  > h4 {
    > span {
      opacity: 0.6;
      font-weight: 600;
      font-size: 12px;
    }
  }
`;
