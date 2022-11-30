import React, { useEffect, Suspense } from "react";
import {
  graphql,
  useQueryLoader,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { MainContentLazyQuery as MainContentQueryType } from "./__generated__/MainContentLazyQuery.graphql";
import CircularProgress from "@mui/material/CircularProgress";
import { isAuth } from "../../src/helpers";
import MainContentSection from "./MainContentSection";

export type MainContentQueryReference = PreloadedQuery<MainContentQueryType>;

type PreloadedMainContentProps = {
  mainContentQueryReference: MainContentQueryReference;
};

const MissionsQuery = graphql`
  query MainContentLazyQuery($userName: String!) {
    ...MainContentSection_data @arguments(userName: $userName)
  }
`;

const MainContentLazy = () => {
  const [mainContentQueryReference, loadMainContent] =
    useQueryLoader<MainContentQueryType>(MissionsQuery);

  useEffect(() => {
    loadMainContent(
      { userName: isAuth() },
      { fetchPolicy: "store-or-network" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mainContentQueryReference) {
    return null;
  }

  return (
    <PreloadedMissions mainContentQueryReference={mainContentQueryReference} />
  );
};

const PreloadedMissions: React.FC<PreloadedMainContentProps> = ({
  mainContentQueryReference,
}) => {
  const data = usePreloadedQuery<MainContentQueryType>(
    MissionsQuery,
    mainContentQueryReference
  );

  return <MainContentSection data={data} />;
};

export default MainContentLazy;
