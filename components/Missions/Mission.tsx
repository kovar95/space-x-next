import React from "react";
import Link from "next/link";
import { styled } from "@mui/material";
import { useError } from "../../src/jotai";
import { useFragment, graphql } from "react-relay";
import { Mission_data$key as MissionType } from "./__generated__/Mission_data.graphql";
import { format } from "date-fns";
import updateFavoriteMissions from "../../mutations/UpdateFavouriteMissions";
import { isAuth } from "../../src/helpers";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const MissionFragment = graphql`
  fragment Mission_data on Mission {
    id
    dbID
    missionName
    launchDate
    iconUrl
    isFavourite
    webcastLink
    previewImageUrl
  }
`;

const StyledCard = styled("div")<{ isFav?: boolean }>(({ isFav }) => ({
  position: "relative",
  width: "200px",
  height: "260px",
  margin: "10px",
  color: isFav ? "#ffffff" : "#bebebe",
  fontWeight: 600,
  textShadow: "0.5px 0.5px 1px black",
  background: isFav ? "linear-gradient(45deg, #5b683c,#09172c)" : "#202025",
  // boxShadow: "0.5px 0.5px 1px 1px #0e5757",
  boxShadow: "1px 1px 6px 1px rgb(121 255 224 / 72%)",
  cursor: "pointer",
  transition: "all 0.5s",
  "& > div:first-of-type": {
    boxShadow: "inset 0px 9px 20px 2px rgb(121 255 224 / 72%)",
  },
  "&:hover": {
    boxShadow: "30px 25px 15px 1px rgb(121 255 224 / 72%)",
    "& > div:first-of-type": {
      height: "85%",
    },
    "& > div:last-of-type": {
      height: "15%",
      borderTop: "none",
    },
    "& img": {
      filter: "none",
    },
    "& img.patch": {
      transform: "none",
      width: "30px",
      top: "5px",
      left: "5px",
    },
  },
  "& span": {
    display: "block",
    fontWeight: 100,
    margin: 0,
  },
  "& > picture > img": {
    position: "absolute",
    display: "block",
    width: "71px",
    bottom: "5px",
    right: "9px",
  },
}));

const StyledLink = styled(Link)(() => ({
  color: "#bebebe",
}));

const MainInfo = styled("div")(() => ({
  height: "40%",
  transition: "all 0.5s",
  position: "relative",
}));

const Footer = styled("div")(() => ({
  position: "relative",
  height: "60%",
  padding: "5px",
  fontsize: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  transition: "all 0.5s",
  background: "#2f4f4f",
  borderTop: "1px solid",
}));

const LaunchDate = styled("div")(() => ({
  width: "50px",
  textAlign: "center",
}));

const Patch = styled("img")(() => ({
  position: "absolute",
  width: "60px",
  left: "50%",
  transform: "translate(-50%, 0)",
  top: "70px",
  zIndex: 4,
  transition: "all 0.5s",
}));

const Image = styled("img")(() => ({
  width: "100%",
  height: "243px",
  filter: "opacity(0.5) drop-shadow(0 0 0 #2f4f4f) blur(2px)",
  transition: "all 0.5s",
}));

const MissionName = styled("h3")(() => ({
  position: "absolute",
  width: "100%",
  left: 0,
  bottom: "35px",
  textAlign: "center",
}));

const FooterActions = styled("div")(() => ({
  width: "70px",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
}));

type Props = {
  mission: MissionType;
  isFavouritesSection?: boolean;
};

const Card: React.FC<Props> = ({ mission, isFavouritesSection }) => {
  const fragmentData = useFragment<MissionType>(MissionFragment, mission);

  const {
    missionName,
    launchDate,
    isFavourite,
    iconUrl,
    dbID,
    webcastLink,
    previewImageUrl,
  } = fragmentData;

  const { setError } = useError();

  const toggleFavourite = async () => {
    try {
      await updateFavoriteMissions(dbID, isAuth());
    } catch (error) {
      setError({
        title: "Update favourite missions error",
        description: error as string,
      });
    }
  };

  return (
    <StyledCard isFav={isFavouritesSection}>
      <MainInfo>
        <picture>
          <source srcSet={previewImageUrl} type="image/png" />
          <Image src={previewImageUrl} alt="link" />
        </picture>
        {iconUrl ? (
          <picture>
            <source srcSet={iconUrl} type="image/png" />
            <Patch className="patch" src={iconUrl} alt="link" />
          </picture>
        ) : null}
      </MainInfo>
      <Footer>
        <MissionName>{missionName}</MissionName>
        <LaunchDate>
          {launchDate ? format(new Date(launchDate), "d MMM yyyy") : "N/A"}
        </LaunchDate>
        <FooterActions>
          {webcastLink ? (
            <StyledLink
              href={webcastLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon />
            </StyledLink>
          ) : null}
          {!isFavouritesSection && (
            <>
              <span onClick={toggleFavourite}>
                {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </span>
              <StyledLink href={`/${encodeURIComponent(dbID)}`}>
                <InfoIcon />
              </StyledLink>
            </>
          )}
        </FooterActions>
      </Footer>
    </StyledCard>
  );
};

export default Card;
