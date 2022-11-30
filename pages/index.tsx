import { Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import { Box, styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Private from "../components/auth/Private";
import MainContentLazy from "../components/MainContent/MainContentLazy";
import CircularProgress from "@mui/material/CircularProgress";
import { isAuth } from "../src/helpers";
import { LoadingButton } from "../components/Missions";
import astronaut from "../images/astronaut.png";

const AvatarItem = styled(Box)(() => ({
  color: "#ffffff",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "150px",
  left: "10px",
  top: "67px",
  zIndex: 3,
}));

const StyledImg = styled("img")(() => ({
  width: "38px",
  filter: "hue-rotate(300deg)",
}));

const Home = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const userName = isAuth();
    if (userName) {
      setUser(userName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Private>
      <Header />
      <AvatarItem>
        <picture>
          <source srcSet={astronaut.src} type="image/png" />
          <StyledImg src={astronaut.src} alt="logo" />
        </picture>
        {user}
      </AvatarItem>
      <Suspense
        fallback={
          <LoadingButton>
            <CircularProgress
              size="40"
              sx={{
                display: "block",
                width: "100px",
                color: "#00f6a9",
                marginTop: "100px",
              }}
            />
          </LoadingButton>
        }
      >
        <MainContentLazy />
      </Suspense>
    </Private>
  );
};

export default Home;
