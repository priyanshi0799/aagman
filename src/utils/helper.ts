import { MarkerType } from "reactflow";

/**
 * React Flow edge styling configurations
 * Used for Trade Monitoring flow diagram
 */

export const dashedBlue = {
  stroke: "#43556E",
  strokeWidth: 2,
  strokeDasharray: "5 5",
};

export const dashedGreen = {
  stroke: "#19E299",
  strokeWidth: 2,
  strokeDasharray: "5 5",
};

export const arrowBlue = {
  type: MarkerType.ArrowClosed,
  color: "#43556E",
  width: 20,
  height: 20,
};

export const arrowGreen = {
  type: MarkerType.ArrowClosed,
  color: "#19E299",
  width: 20,
  height: 20,
};
