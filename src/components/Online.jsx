import styled from "styled-components";
import { Link } from "react-router-dom";

const RightbarFriend = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const RightbarProfileImgContainer = styled.div`
  margin-right: 10px;
  position: relative;
`;
const RightbarProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const RightbarOnline = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: limegreen;
  position: absolute;
  bottom: -2px;
  right: 0;
  border: 2px solid white;
`;
const RightbarUsername = styled.span``;

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <RightbarFriend>
      <RightbarProfileImgContainer>
        <Link to={`/profile/${user.username}`}>
          <RightbarProfileImg
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "persons/defaultavatar.png"
            }
          ></RightbarProfileImg>
        </Link>
        <RightbarOnline></RightbarOnline>
      </RightbarProfileImgContainer>
      <RightbarUsername>{user.username}</RightbarUsername>
    </RightbarFriend>
  );
};

export default Online;
