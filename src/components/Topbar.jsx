import {
  MapsUgcOutlined,
  NotificationImportantOutlined,
  PersonAddOutlined,
  Search,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

//TopbarContainer
const TopbarContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: #128c7e;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

//TopbarLeft
const TopbarLeft = styled.div`
  flex: 4;
`;
const Searchbar = styled.div`
  width: 90%;
  height: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const SearchInput = styled.input`
  border: none;
  width: 90%;
  &:focus {
    outline: none;
  }
`;

//TopbarCenter
const TopbarCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
`;
const Logo = styled.div`
  font-size: 24px;
  font-family: "Alfa Slab One", cursive;
  font-weight: 400;
  color: #204e4a;
  cursor: pointer;
`;

//TopbarRight
const TopbarRight = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;
const TopbarLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopbarLink = styled.div`
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
const TopbarIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopbarIconItem = styled.div`
  margin-right: 15px;
  cursor: pointer;
  position: relative;
`;
const TopbarIconBadge = styled.div`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;
const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const { userInfo } = user;

  return (
    <TopbarContainer>
      <TopbarLeft>
        <Searchbar>
          <Search style={{ fontSize: "20px !important", marginLeft: "10px" }} />
          <SearchInput placeholder="Search for people, posts or pages"></SearchInput>
        </Searchbar>
      </TopbarLeft>
      <TopbarCenter>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>NJ Connect</Logo>
        </Link>
      </TopbarCenter>
      <TopbarRight>
        <TopbarLinks>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <TopbarLink>Home</TopbarLink>
          </Link>
          <TopbarLink>
            <Link
              to={`/profile/${userInfo.username}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              Timeline
            </Link>
          </TopbarLink>
        </TopbarLinks>
        <TopbarIcons>
          <TopbarIconItem>
            <PersonAddOutlined />
            <TopbarIconBadge>1</TopbarIconBadge>
          </TopbarIconItem>
          <TopbarIconItem>
            <MapsUgcOutlined />
            <TopbarIconBadge>10</TopbarIconBadge>
          </TopbarIconItem>
          <TopbarIconItem>
            <NotificationImportantOutlined />
            <TopbarIconBadge>20</TopbarIconBadge>
          </TopbarIconItem>
        </TopbarIcons>
        <TopbarLink style={{ marginRight: "0" }}>Logout</TopbarLink>
        <Link to={`/profile/${userInfo.username}`}>
          <ProfilePic
            src={
              userInfo.profilePicture
                ? PF + userInfo.profilePicture
                : PF + "persons/defaultavatar.png"
            }
          ></ProfilePic>
        </Link>
      </TopbarRight>
    </TopbarContainer>
  );
};

export default Topbar;
