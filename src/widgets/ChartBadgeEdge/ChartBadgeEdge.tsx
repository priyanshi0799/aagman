import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "reactflow";

type BadgeEdgeData = {
  label: string;
  bg?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number;
  radius?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  offsetX?: number; // move label left/right
  offsetY?: number; // move label up/down
};

export const BadgeEdge = (props: EdgeProps) => {
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style,
    data,
  } = props as EdgeProps & { data?: BadgeEdgeData };

  const d = data || { label: "" };

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const offsetX = d.offsetX ?? 0;
  const offsetY = d.offsetY ?? -22; // ✅ default slightly above line

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${
              labelX + offsetX
            }px, ${labelY + offsetY}px)`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: d.bg ?? "#2a2a2a",
              color: d.textColor ?? "#fff",
              fontSize: d.fontSize ?? 9,
              fontWeight: d.fontWeight ?? 700,
              borderRadius: d.radius ?? 999,
              paddingTop: d.paddingTop ?? 8,
              paddingBottom: d.paddingBottom ?? 8,
              paddingLeft: d.paddingLeft ?? 16, // ✅ left padding control
              paddingRight: d.paddingRight ?? 12,
              whiteSpace: "nowrap",
            }}
          >
            {d.label}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
