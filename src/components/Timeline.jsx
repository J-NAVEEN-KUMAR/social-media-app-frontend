import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Post from "./Post";
import Share from "./Share";
import axios from "axios";
import { AuthContext } from "../components/context/AuthContext";

const TimelineContainer = styled.div`
  flex: 4.5;
`;

const Timeline = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <TimelineContainer>
      {(!username || username === user.username) && <Share />}

      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </TimelineContainer>
  );
};

export default Timeline;
