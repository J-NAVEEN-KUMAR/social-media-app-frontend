import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Users } from "../DummyData";
import Online from "./Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

const RightbarContainer = styled.div`
  flex: 2.5;
`;
const RightbarWrapper = styled.div`
  padding: 20px 20px;
`;
const BirthdayContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BirthdayImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const BirthdayText = styled.span`
  font-weight: 300;
  font-size: 15px;
`;
const RightbarTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
`;
const RightbarFriendList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const RightbarInfo = styled.div`
  margin-bottom: 30px;
`;
const RightbarInfoItem = styled.div`
  margin-bottom: 10px;
`;
const RightbarInfoKey = styled.span`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
`;
const RightbarInfoKeyValue = styled.span`
  font-weight: 300;
`;
const RightbarFollowings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const RightbarFollowing = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  cursor: pointer;
`;
const RightbarFollowingImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;
const RightbarFollowingName = styled.span``;
const RightbarFollowButton = styled.button`
  margin-top: 30px;
  margin-bottom: 10px;
  border: none;
  background-color: #1872f2;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user);
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );
  

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);
  // console.log("useEffect", friends)

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };
  
  const HomeRightbar = () => {
    return (
      <>
        <BirthdayContainer>
          <BirthdayImg src={`${PF}gift.png`}></BirthdayImg>
          <BirthdayText>
            <b>Soni</b> and <b>3 others</b> have birthdays today
          </BirthdayText>
        </BirthdayContainer>
        <RightbarTitle>See, who are Online...!</RightbarTitle>
        <RightbarFriendList>
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </RightbarFriendList>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        {user.username !== currentUser.username && (
          <RightbarFollowButton onClick={handleClick}>
            {followed ? "Unfolow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </RightbarFollowButton>
        )}
        <RightbarTitle>About You</RightbarTitle>
        <RightbarInfo>
          <RightbarInfoItem>
            <RightbarInfoKey>Lives in :</RightbarInfoKey>
            <RightbarInfoKeyValue>
              <b>{user.city}</b>
            </RightbarInfoKeyValue>
          </RightbarInfoItem>
          <RightbarInfoItem>
            <RightbarInfoKey>From :</RightbarInfoKey>
            <RightbarInfoKeyValue>
              <b>{user.from}</b>
            </RightbarInfoKeyValue>
          </RightbarInfoItem>
          <RightbarInfoItem>
            <RightbarInfoKey>Relationship :</RightbarInfoKey>
            <RightbarInfoKeyValue>
              <b>
                {user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : user.relationship === 3
                  ? "Complicated"
                  : "Prefer not to say"}
              </b>
            </RightbarInfoKeyValue>
          </RightbarInfoItem>
        </RightbarInfo>
        <RightbarTitle>Your Friends</RightbarTitle>
        <RightbarFollowings>
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ "text-decoration": "none" }}
            >
              <RightbarFollowing>
                <RightbarFollowingImg
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "persons/defaultavatar.png"
                  }
                ></RightbarFollowingImg>
                <RightbarFollowingName>{friend.username}</RightbarFollowingName>
              </RightbarFollowing>
            </Link>
          ))}
        </RightbarFollowings>
      </>
    );
  };
  return (
    <RightbarContainer>
      <RightbarWrapper>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </RightbarWrapper>
    </RightbarContainer>
  );
};

export default Rightbar;
