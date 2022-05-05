import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/Timeline";
import Topbar from "../components/Topbar";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
`;
const Home = () => {
  return (
    <>
      <Topbar />
      <HomeContainer>
        <Sidebar />
        <Timeline />
        <Rightbar />
      </HomeContainer>
    </>
  );
};

export default Home;
