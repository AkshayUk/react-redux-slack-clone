import AddIcon from "@material-ui/icons/Add";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CreateIcon from "@material-ui/icons/Create";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import SidebarOption from "./SidebarOption";

function Sidebar() {
  const [user] = useAuthState(auth);
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack UI</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>
      <SidebarOption title="Add Channel" addChannel Icon={AddIcon} />
      {loading && (
        <SidebarOption title="Loading channels.." Icon={AutorenewIcon} />
      )}
      {channels &&
        channels.docs.map((doc) => (
          <SidebarOption
            key={doc.id}
            channelId={doc.id}
            title={doc.data().name}
          />
        ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.3;
  border-top: 1px solid var(--slack-secondary);
  max-width: 260px;
  margin-top: 60px;
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid var(--slack-secondary);
  padding: 12px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: var(--slack-secondary);
    font-size: 18px;
    background-color: white;
    border-radius: 100px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    color: green;
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
  }
`;
