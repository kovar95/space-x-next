import React, { useEffect } from "react";
import Mission from "../Missions/Mission";
import { Motion, spring } from "react-motion";
import { useFavourites } from "../../src/jotai";
import { styled } from "@mui/material/styles";
import { Mission as MissionType } from "../filters/useAppliedFilters";
import { useAppliedFilters } from "../filters/useAppliedFilters";
import { useRef } from "react";

const FavouritesSection = styled("div")(() => ({
  minHeight: "100px",
  position: "absolute",
  height: "100%",
  maxWidth: "1000px",
  width: "80%",
  margin: "62px auto",
  paddingTop: "60px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  left: 0,
  right: 0,
}));

type Props = {
  missions: MissionType[];
};

const Favourites: React.FC<Props> = ({ missions }) => {
  const { showFavourites } = useFavourites();
  const filteredMissions = useAppliedFilters(missions);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFavourites && sectionRef.current) {
      setTimeout(
        () => sectionRef.current?.scrollIntoView({ behavior: "smooth" }),
        500
      );
    }
  }, [showFavourites]);

  return (
    <Motion
      defaultStyle={{ opacity: 0, x: 300, y: 40 }}
      style={{
        opacity: spring(showFavourites ? 1 : 0, {
          stiffness: 100,
          damping: 10,
        }),
        x: spring(showFavourites ? 0 : 300, { stiffness: 100, damping: 10 }),
        y: spring(showFavourites ? 40 : 0, { stiffness: 100, damping: 10 }),
      }}
    >
      {(style) => (
        <FavouritesSection
          style={{
            opacity: style.opacity,
            transform: `translateX(${style.x}px) translateY(${style.y}px)`,
            display: style.x < 70 ? "flex" : "none",
          }}
          ref={sectionRef}
        >
          {filteredMissions?.map((mission, index) => {
            return (
              <Mission
                key={`${mission.id}-${index}`}
                mission={mission}
                isFavouritesSection={true}
              />
            );
          })}
        </FavouritesSection>
      )}
    </Motion>
  );
};

export default Favourites;
