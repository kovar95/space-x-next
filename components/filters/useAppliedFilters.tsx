import { useEffect } from "react";
import { useState } from "react";
import { useFilter, useSort } from "../../src/jotai";
import { MainContentSection_data$data as MainContentType } from "../MainContent/__generated__/MainContentSection_data.graphql";

export type Mission = NonNullable<
  NonNullable<
    NonNullable<NonNullable<MainContentType["missionConnection"]>["edges"]>[0]
  >["node"]
>;

const compare = (a: Mission, b: Mission) => {
  if (a.missionName < b.missionName) {
    return -1;
  }
  if (a.missionName > b.missionName) {
    return 1;
  }
  return 0;
};

export const useAppliedFilters = (missions: Mission[] | null): Mission[] => {
  const [filteredMission, setFilteredMissions] = useState<Mission[]>(
    missions ?? []
  );

  const { filter } = useFilter();
  const { sort } = useSort();

  useEffect(() => {
    let newMissions =
      missions?.filter((item) =>
        item.missionName.toLowerCase().includes(filter.toLowerCase().trim())
      ) ?? [];
    if (sort) {
      newMissions.sort(compare);
    }
    console.log(newMissions);
    setFilteredMissions(newMissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sort, missions]);

  return filteredMission;
};
