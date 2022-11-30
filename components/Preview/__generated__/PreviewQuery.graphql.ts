/**
 * @generated SignedSource<<13398f8d17f9c2b32226dac286f389d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PreviewQuery$variables = {
  id: string;
};
export type PreviewQuery$data = {
  readonly missionDetails: {
    readonly details: string | null;
    readonly flightNumber: number | null;
    readonly iconUrl: string;
    readonly launchDate: string | null;
    readonly launchSuccess: boolean | null;
    readonly missionName: string | null;
    readonly photosLinks: ReadonlyArray<string>;
  } | null;
};
export type PreviewQuery = {
  response: PreviewQuery$data;
  variables: PreviewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
      }
    ],
    "concreteType": "MissionDetails",
    "kind": "LinkedField",
    "name": "missionDetails",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "flightNumber",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "missionName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "launchDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "iconUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "details",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "launchSuccess",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photosLinks",
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
    "name": "PreviewQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PreviewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "98aa014109224ecbb9b5faed0fe92838",
    "id": null,
    "metadata": {},
    "name": "PreviewQuery",
    "operationKind": "query",
    "text": "query PreviewQuery(\n  $id: ID!\n) {\n  missionDetails(id: $id) {\n    flightNumber\n    missionName\n    launchDate\n    iconUrl\n    details\n    launchSuccess\n    photosLinks\n  }\n}\n"
  }
};
})();

(node as any).hash = "d136bec7fccd81ef6b05b8fe99033bde";

export default node;
