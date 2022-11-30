/**
 * @generated SignedSource<<b8f4ef7fc456ca521439adfb93178f86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateFavouriteMissionsMutation$variables = {
  id: string;
  userName: string;
};
export type UpdateFavouriteMissionsMutation$data = {
  readonly updateFavouriteMissions: {
    readonly id: string;
    readonly isFavourite: boolean;
  } | null;
};
export type UpdateFavouriteMissionsMutation = {
  response: UpdateFavouriteMissionsMutation$data;
  variables: UpdateFavouriteMissionsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userName"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "userName",
        "variableName": "userName"
      }
    ],
    "concreteType": "Mission",
    "kind": "LinkedField",
    "name": "updateFavouriteMissions",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isFavourite",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateFavouriteMissionsMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateFavouriteMissionsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "54cf0865c41e03129337188eb76d10db",
    "id": null,
    "metadata": {},
    "name": "UpdateFavouriteMissionsMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateFavouriteMissionsMutation(\n  $id: String!\n  $userName: String!\n) {\n  updateFavouriteMissions(id: $id, userName: $userName) {\n    id\n    isFavourite\n  }\n}\n"
  }
};
})();

(node as any).hash = "50d41993a0a67bf5039d7375db8e87e2";

export default node;
