import React from "react";
import Link from "next/link";
import { styled, Stack, Container } from "@mui/material";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import { graphql, useLazyLoadQuery } from "react-relay";
import { PreviewQuery as MissionDetailsType } from "./__generated__/PreviewQuery.graphql";
import { format } from "date-fns";

const MissionDetailQuery = graphql`
  query PreviewQuery($id: ID!) {
    missionDetails(id: $id) {
      flightNumber
      missionName
      launchDate
      iconUrl
      details
      launchSuccess
      photosLinks
    }
  }
`;

const PreviewWrapper = styled("section")(() => ({
  width: "95%",
  maxWidth: "900px",
  height: "90%",
  maxHeight: "645px",
  position: "relative",
  margin: "50px auto",
  overflow: "auto",
  background: "linear-gradient(45deg, #2f4f4f,#09172c)",
  padding: "50px 10px 10px",
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "column",
  alignItems: "flex-end",
  borderRadius: "10px",
  boxShadow: "18px 18px 43px 31px rgb(121 255 224 / 72%)",
  zIndex: 33,
  "& span": {
    width: "100%",
    margin: "1px 0px",
    color: "#ffffff",
    fontSize: "21px",
    textShadow: "1px 1px 2px #000000",
    "@media only screen and (max-width: 500px)": {
      fontSize: "16px",
    },
  },
}));

const Picture = styled("img")(() => ({
  display: "block",
  width: "100px",
  border: "1px solid #ffffff",
  margin: "10px",
  cursor: "pointer",
  height: "auto",
  maxHeight: "100%",
}));

const MissionPatch = styled("img")(() => ({
  width: "100%",
  maxWidth: "170px",
}));

const Wrapper = styled("div")(() => ({
  width: "100%",
  height: "100%",
  position: "fixed",
  top: "0px",
  backgroundColor: "#0f1419f2",
  zIndex: 22,
}));

const MissionHeader = styled("h2")(() => ({
  position: "fixed",
  borderRadius: "10px 10px 0 0",
  margin: 0,
  padding: "15px",
  backgroundColor: "#202025",
  borderBottom: "0.5px solid #ffffff",
  width: "95%",
  maxWidth: "900px",
  textAlign: "center",
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "bold",
  textShadow: "1px 1px 2px #000000",
  top: "32px",
  left: "50%",
  transform: "translate(-50%, 0)",
  zIndex: 44,
}));

const CloseButton = styled(CancelPresentationRoundedIcon)(() => ({
  position: "absolute",
  right: "16px",
  cursor: "pointer",
  "&:hover": {
    color: "#ff0000",
    textShadow: "1px 1px 2px black, -1px -1px 2px #000000",
  },
}));

type Props = {
  id: string;
};

const Preview: React.FC<Props> = ({ id }) => {
  const data = useLazyLoadQuery<MissionDetailsType>(
    MissionDetailQuery,
    { id },
    { fetchPolicy: "store-or-network" }
  );

  if (!data?.missionDetails) {
    return <div>No missinon data</div>;
  }

  const {
    missionName,
    flightNumber,
    launchDate,
    launchSuccess,
    iconUrl,
    photosLinks,
    details,
  } = data.missionDetails;

  return (
    <Wrapper>
      <PreviewWrapper>
        <MissionHeader>
          <span>{missionName}</span>
          <Link href="/">
            <CloseButton color="warning" fontSize="large" />
          </Link>
        </MissionHeader>

        <Container>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Stack direction="column">
              <span>
                <strong>Flight number:</strong> {flightNumber}
              </span>
              <span>
                <strong>Launch date:</strong>{" "}
                {launchDate
                  ? format(new Date(launchDate), "d MMMM yyyy · HH:mm")
                  : "N/A"}
              </span>
              <span>
                <strong>Launch success:</strong>{" "}
                {launchSuccess ? "Successful" : "Failed"}
              </span>
            </Stack>
            <picture>
              <source srcSet={iconUrl} type="image/png" />
              <MissionPatch src={iconUrl} alt="missionPatch" />
            </picture>
          </Stack>

          <span>
            <strong>Photos:</strong>
          </span>

          <Stack direction="row" flexWrap="wrap">
            {photosLinks?.length ? (
              photosLinks.map((pic) => {
                return (
                  <Link
                    href={pic}
                    target="_blank"
                    key={pic}
                    rel="noopener noreferrer"
                  >
                    <picture>
                      <source srcSet={pic} type="image/png" />
                      <Picture src={pic} alt="flightPic" />
                    </picture>
                  </Link>
                );
              })
            ) : (
              <span>No available photos</span>
            )}
          </Stack>

          <span>
            <strong>Details:</strong> {details}
          </span>
        </Container>
      </PreviewWrapper>
    </Wrapper>
  );
};

export default Preview;
