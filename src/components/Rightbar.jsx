import styled from "styled-components";
import { Users } from "../DummyData";
import Online from "./Online";

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
  justify-content: space-around;
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

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
        <RightbarTitle>Friends</RightbarTitle>
        <RightbarFollowings>
          <RightbarFollowing>
            <RightbarFollowingImg
              src={`${PF}persons/chandler.jpg`}
            ></RightbarFollowingImg>
            <RightbarFollowingName>Chandler</RightbarFollowingName>
          </RightbarFollowing>
          
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
