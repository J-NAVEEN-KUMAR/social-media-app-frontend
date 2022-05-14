import { MoreVert } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const PostContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`;
const PostWrapper = styled.div`
  padding: 10px;
`;
const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`;
const PostTopRight = styled.div`
  cursor: pointer;
`;
const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
const PostUsername = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin: 0 10px;
`;
const PostDate = styled.span`
  font-size: 12px;
`;
const PostCenter = styled.div`
  margin: 20px 0;
`;
const PostText = styled.span``;
const PostImg = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;
const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostBottomLeft = styled.div`
  display: flex;
  align-items: center;
`;
const PostBottomRight = styled.div``;
const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`;
const PostLikeCounter = styled.span`
  font-size: 15px;
`;
const PostCommentText = styled.span`
  cursor: pointer;
  font-size: 15px;
`;

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [IsLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  // const { userInfo } = currentUser;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/users?userId=${post.userId}`
      );
      setUser(res.data);
      // console.log(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const handleLike = () => {
    try {
      axios.put(`${process.env.REACT_APP_API}/posts/` + post._id + "/likes", {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(IsLiked ? like - 1 : like + 1);
    setIsLiked(!IsLiked);
  };
  return (
    <PostContainer>
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <Link to={`/profile/${user.username}`}>
              <ProfileImg
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : PF + "persons/defaultavatar.png"
                }
              ></ProfileImg>
            </Link>
            <PostUsername>{user.username}</PostUsername>
            <PostDate>{format(post.createdAt)}</PostDate>
          </PostTopLeft>
          <PostTopRight>
            <MoreVert />
          </PostTopRight>
        </PostTop>
        <PostCenter>
          <PostText>{post.desc}</PostText>
          <PostImg src={PF + post.img}></PostImg>
        </PostCenter>
        <PostBottom>
          <PostBottomLeft>
            <LikeIcon src={`${PF}like.png`} onClick={handleLike}></LikeIcon>
            <LikeIcon src={`${PF}heart.png`} onClick={handleLike}></LikeIcon>
            <PostLikeCounter>{like} people like this!</PostLikeCounter>
          </PostBottomLeft>
          <PostBottomRight>
            <PostCommentText>{post.comment} comments</PostCommentText>
          </PostBottomRight>
        </PostBottom>
      </PostWrapper>
    </PostContainer>
  );
};

export default Post;
