import { commitMutation, graphql } from "react-relay";
import environment from "../src/RelayEnvironment";
import { PayloadData, PayloadError } from "relay-runtime";
import { UpdateFavouriteMissionsMutation } from "./__generated__/UpdateFavouriteMissionsMutation.graphql";

const TOAST_MESSAGE = "Failed to update favorite missions";

const mutation = graphql`
  mutation UpdateFavouriteMissionsMutation($id: String!, $userName: String!) {
    updateFavouriteMissions(id: $id, userName: $userName) {
      id
      isFavourite
    }
  }
`;

const updateFavoriteMissions = (
  id: UpdateFavouriteMissionsMutation["variables"]["id"],
  userName: UpdateFavouriteMissionsMutation["variables"]["userName"]
): Promise<UpdateFavouriteMissionsMutation["response"]> => {
  return new Promise((resolve, reject) => {
    const variables = {
      id,
      userName,
    };
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (
        response: PayloadData,
        errors: ReadonlyArray<PayloadError> | null | undefined
      ) => {
        if (errors?.length || !response["updateFavouriteMissions"]) {
          reject(TOAST_MESSAGE);
        } else {
          resolve(response["updateFavouriteMissions"]);
        }
      },
      onError: (error) => {
        reject(error?.message ?? TOAST_MESSAGE);
      },
    });
  });
};

export default updateFavoriteMissions;
