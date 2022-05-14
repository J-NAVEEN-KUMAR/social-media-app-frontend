import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const ProfileContainer = styled.div`
  display: flex;
`;
const ProfileRight = styled.div`
  flex: 9;
`;
const ProfileRightTop = styled.div``;
const ProfileRightBottom = styled.div`
  display: flex;
`;
const ProfileCover = styled.div`
  height: 320px;
  position: relative;
`;
const ProfileCoverImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
const ProfileUserImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150px;
  border: 3px solid #128c7e;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProfileInfoName = styled.h4`
  font-size: 24px;
`;
const ProfileInfoDesc = styled.span`
  font-weight: 300;
`;

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/users?username=${username}`
      );
      // console.log("PROFILE==>",res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <ProfileContainer>
        <Sidebar />
        <ProfileRight>
          <ProfileRightTop>
            <ProfileCover>
              <ProfileCoverImg
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "persons/defaultcover.jpg"
                }
                alt=""
              ></ProfileCoverImg>
              <ProfileUserImg
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "persons/defaultavatar.png"
                }
                alt=""
              ></ProfileUserImg>
            </ProfileCover>
            <ProfileInfo>
              <ProfileInfoName>{user.username}</ProfileInfoName>
              <ProfileInfoDesc>{user.desc}</ProfileInfoDesc>
            </ProfileInfo>
          </ProfileRightTop>
          <ProfileRightBottom>
            <Timeline username={username} />
            <Rightbar user={user} />
          </ProfileRightBottom>
        </ProfileRight>
      </ProfileContainer>
    </>
  );
};

export default Profile;
