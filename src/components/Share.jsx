import {
  AddLocationAltOutlined,
  AddPhotoAlternateOutlined,
  LocalOfferOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { AuthContext } from "../components/context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

const ShareContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0px;
`;
const ShareWrapper = styled.div`
  padding: 10px;
`;
const ShareTop = styled.div`
  display: flex;
  align-items: center;
`;
const ShareProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const ShareInput = styled.input`
  border: none;
  width: 80%;

  &: focus {
    outline: none;
  }
`;
const ShareHr = styled.hr`
  margin: 20px;
  height: 2px;
  background-color: #128c7e;
`;

const ShareBottom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
`;
const ShareOptions = styled.div`
  display: flex;
  margin-left: 20px;
`;
const ShareOption = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;
const ShareIcon = styled.div`
  font-size: 18px;
  margin-right: 3px;
`;
const ShareOptionText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
const Button = styled.button`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: #128c7e;
  font-weight: 500;
  cursor: pointer;
  color: white;
`;

const Share = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ShareContainer>
      <ShareWrapper>
        <ShareTop>
          <ShareProfileImg
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/persons/defaultavatar.png"
            }
          ></ShareProfileImg>
          <ShareInput
            placeholder={`Share your thoughts ${user.username} ...!`}
            ref={desc}
          ></ShareInput>
        </ShareTop>
        <ShareHr></ShareHr>
        <ShareBottom onSubmit={handleSubmit}>
          <ShareOptions>
            <ShareOption>
              <ShareIcon>
                <AddPhotoAlternateOutlined htmlColor="#8a3ab9" />
                <ShareOptionText>Add Photos</ShareOptionText>
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </ShareIcon>
            </ShareOption>
            <ShareOption>
              <ShareIcon>
                <LocalOfferOutlined htmlColor="#4c68d7" />
                <ShareOptionText>Tag friends</ShareOptionText>
              </ShareIcon>
            </ShareOption>
            <ShareOption>
              <ShareIcon>
                <AddLocationAltOutlined htmlColor=" #cd486b" />
                <ShareOptionText>Add Location</ShareOptionText>
              </ShareIcon>
            </ShareOption>
          </ShareOptions>
          <Button typeof="submit">Post</Button>
        </ShareBottom>
      </ShareWrapper>
    </ShareContainer>
  );
};

export default Share;
