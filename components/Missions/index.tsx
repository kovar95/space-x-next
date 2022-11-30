import React, { useEffect } from "react";
import Mission from "./Mission";
import { styled } from "@mui/material/styles";
import { Motion, spring } from "react-motion";
import { useFavourites } from "../../src/jotai";
import { Mission as MissionType } from "../filters/useAppliedFilters";
import { useAppliedFilters } from "../filters/useAppliedFilters";
import { useInView } from "react-intersection-observer";
import CircularProgress from "@mui/material/CircularProgress";

const PAGE_SIZE = 20;

const MissionsWrapper = styled("div")(() => ({
  height: "100%",
  maxWidth: "1000px",
  width: "80%",
  margin: "62px auto",
  padding: "20px",
  display: "flex",
  justifyContent: "space-around",
  position: "absolute",
  flexWrap: "wrap",
  right: 0,
  left: 0,
}));

export const LoadingButton = styled("div")(() => ({
  width: "100%",
  padding: "20px",
  display: "flex",
  justifyContent: "center",
}));

type Props = {
  missions: MissionType[];
  loadNext: (page: number) => void;
  hasNext: boolean;
  isLoadingNext: boolean;
};

const Missions: React.FC<Props> = ({
  missions,
  loadNext,
  hasNext,
  isLoadingNext,
}) => {
  const { showFavourites } = useFavourites();
  const filteredMission = useAppliedFilters(missions);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNext) {
      loadNext(PAGE_SIZE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Motion
      defaultStyle={{ opacity: 1, x: 0 }}
      style={{
        opacity: spring(showFavourites ? 0 : 1, {
          stiffness: 100,
          damping: 10,
        }),
        x: spring(showFavourites ? -300 : 0, { stiffness: 100, damping: 10 }),
      }}
    >
      {(style) => (
        <MissionsWrapper
          style={{
            opacity: style.opacity,
            transform: `translateX(${style.x}px)`,
            display: style.x < 70 ? "flex" : "none",
          }}
        >
          <>
            {filteredMission.map((mission) => {
              return <Mission key={mission.id} mission={mission} />;
            })}
            <LoadingButton ref={ref}>
              {isLoadingNext && (
                <CircularProgress
                  size="40"
                  sx={{ display: "block", width: "100px", color: "#00f6a9" }}
                />
              )}
            </LoadingButton>
          </>
        </MissionsWrapper>
      )}
    </Motion>
  );
};

export default Missions;
