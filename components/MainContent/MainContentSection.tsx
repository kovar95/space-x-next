import { graphql, usePaginationFragment } from "react-relay";
import { MainContentSection_data$key as MainContentSectionType } from "./__generated__/MainContentSection_data.graphql";
import { MainContentSectionRefetchQuery } from "./__generated__/MainContentSectionRefetchQuery.graphql";
import Favourites from "../Favourites";
import Missions from "../Missions";
import { removeNilValues } from "../../src/isNonNill";

const PaginationFragmentQuery = graphql`
  fragment MainContentSection_data on RootQueryType
  @argumentDefinitions(
    userName: { type: "String!" }
    first: { type: "Int" }
    after: { type: "String" }
  )
  @refetchable(queryName: "MainContentSectionRefetchQuery") {
    missionConnection(userName: $userName, first: $first, after: $after)
      @connection(key: "MainContent_missionConnection", filters: []) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          missionName
          isFavourite
          ...Mission_data
        }
      }
    }
  }
`;

type Props = {
  data: MainContentSectionType | null;
};

const MainContentSection: React.FC<Props> = ({ data }) => {
  const {
    data: fragmentData,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<
    MainContentSectionRefetchQuery,
    MainContentSectionType
  >(PaginationFragmentQuery, data);

  const allMissions = removeNilValues(
    fragmentData?.missionConnection?.edges?.map((edge) => edge?.node)
  );

  const favouriteMissions = allMissions.filter(
    (mission) => mission.isFavourite
  );

  return (
    <>
      <Missions
        missions={allMissions}
        loadNext={loadNext}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
      <Favourites missions={favouriteMissions} />
    </>
  );
};

export default MainContentSection;
