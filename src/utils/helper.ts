import { MarkerType } from "reactflow";

/**
 * React Flow edge styling configurations
 * Used for Trade Monitoring flow diagram
 */

export const dashedBlue = {
  stroke: "#43556E",
  strokeWidth: 2.5,
  strokeDasharray: "6 4",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const dashedGreen = {
  stroke: "#19E299",
  strokeWidth: 2.5,
  strokeDasharray: "6 4",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const arrowBlue = {
  type: MarkerType.ArrowClosed,
  color: "#43556E",
  width: 25,
  height: 25,
  markerUnits: "userSpaceOnUse" as const,
  orient: "auto" as const,
  strokeWidth: 1,
};

export const arrowGreen = {
  type: MarkerType.ArrowClosed,
  color: "#19E299",
  width: 25,
  height: 25,
  markerUnits: "userSpaceOnUse" as const,
  orient: "auto" as const,
  strokeWidth: 1,
};
