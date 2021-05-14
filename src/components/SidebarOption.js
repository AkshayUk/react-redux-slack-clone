import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { db } from "../firebase";
import * as appAction from "../redux/actions/appAction";

function SidebarOption({ title, Icon, addChannel, channelId }) {
  const dispatch = useDispatch();
  const handleAddChannel = () => {
    const channelName = prompt("Please enter a channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName
      });
    }
  };

  const handleSetChannel = () => {
    if (channelId) {
      dispatch(appAction.setChannelId(channelId));
    }
  };

  return (
    <SidebarOptionContainer
      onClick={addChannel ? handleAddChannel : handleSetChannel}
    >
      {Icon && <Icon style={{ fontSize: 20, marginRight: 10 }} />}
      {Icon ? (
        <h4>{title}</h4>
      ) : (
        <SidebarChannelItem>
          <span>#</span> {title}
        </SidebarChannelItem>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  background-color: var(--slack-color);
  cursor: pointer;
  > h4 {
    font-weight: 400;
    font-size: 14px;
  }

  :hover {
    > h4 {
      font-weight: 600;
    }
  }
`;

const SidebarChannelItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  color: white;
  font-size: 14px;
  background-color: var(--slack-color);
  cursor: pointer;
  > span {
    font-weight: 400;
    margin-right: 10px;
  }
`;
