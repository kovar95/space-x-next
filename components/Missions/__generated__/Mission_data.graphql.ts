/**
 * @generated SignedSource<<8f7ff423065bf836f28c066a22cb0cd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Mission_data$data = {
  readonly dbID: string;
  readonly iconUrl: string | null;
  readonly id: string;
  readonly isFavourite: boolean;
  readonly launchDate: string | null;
  readonly missionName: string;
  readonly previewImageUrl: string;
  readonly webcastLink: string | null;
  readonly " $fragmentType": "Mission_data";
};
export type Mission_data$key = {
  readonly " $data"?: Mission_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"Mission_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Mission_data",
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
      "name": "dbID",
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
      "name": "isFavourite",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "webcastLink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "previewImageUrl",
      "storageKey": null
    }
  ],
  "type": "Mission",
  "abstractKey": null
};

(node as any).hash = "c131bb9a7eeedecbcb9318b80c382f3f";

export default node;
