import {
  Bookmark,
  Chat,
  Group,
  HelpOutline,
  RssFeed,
  Event,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Users } from "../DummyData";
import Friends from "./Friends";

const SidebarContainer = styled.div`
  flex: 2;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  position: sticky;
  top: 50px;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
`;
const SidebarList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const SidebarListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const SidebarIcon = styled.div`
  margin-right: 15px;
`;
const SidebarTitle = styled.span``;
const SidebarBUtton = styled.button`
  width: 150px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: 500;
  cursor:pointer;
`;
const SidebarHr = styled.hr`
  margin: 20px 0;
`;
const SidebarFriendList = styled.li`
  padding: 0;
  margin: 0;
  list-style: none;
`;


const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarWrapper>
        <SidebarList>
          <SidebarListItem>
            <SidebarIcon>
              <RssFeed />
            </SidebarIcon>
            <SidebarTitle>Feed</SidebarTitle>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Chat />
            </SidebarIcon>
            <SidebarTitle>Chats</SidebarTitle>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <PlayCircleFilledOutlined />
            </SidebarIcon>
            <SidebarTitle>Videos</SidebarTitle>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Group />
            </SidebarIcon>
            <SidebarTitle>Groups</SidebarTitle>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Bookmark />
            </SidebarIcon>
            <SidebarTitle>Bookmarks</SidebarTitle>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <HelpOutline />
            </SidebarIcon>
            <SidebarTitle>Questions</SidebarTitle>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarIcon>
              <Event />
            </SidebarIcon>
            <SidebarTitle>Events</SidebarTitle>
          </SidebarListItem>
        </SidebarList>
        <SidebarBUtton>Show More</SidebarBUtton>
        <SidebarHr></SidebarHr>
        <SidebarFriendList>
          {Users.map(user => 
            <Friends key={user.id} user={user}/>
          )}
        </SidebarFriendList>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
