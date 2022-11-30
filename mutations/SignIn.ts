import { commitMutation, graphql } from "react-relay";
import environment from "../src/RelayEnvironment";
import { PayloadData, PayloadError } from "relay-runtime";
import { SignInMutation } from "./__generated__/SignInMutation.graphql";

const TOAST_MESSAGE = "Failed to update favorite missions";

const mutation = graphql`
  mutation SignInMutation($userName: String!) {
    signIn(userName: $userName) {
      name
    }
  }
`;

const updateFavoriteMissions = (
  userName: SignInMutation["variables"]["userName"]
): Promise<SignInMutation["response"]["signIn"]["name"]> => {
  return new Promise((resolve, reject) => {
    const variables = {
      userName,
    };
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: (
        response: PayloadData,
        errors: ReadonlyArray<PayloadError> | null | undefined
      ) => {
        if (errors?.length || !response["signIn"]) {
          reject(TOAST_MESSAGE);
        } else {
          resolve(response["signIn"]["name"]);
        }
      },
      onError: (error) => {
        reject(error?.message ?? TOAST_MESSAGE);
      },
    });
  });
};

export default updateFavoriteMissions;
