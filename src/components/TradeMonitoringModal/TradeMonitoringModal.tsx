import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  Position,
  MarkerType,
  Handle,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  RiskShieldIcon,
  BarChartIcon,
  TargetIcon,
  GreenTickIcon,
  PendingIcon,
  SuccessCheckIcon,
  CloseIcon,
  RiskIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@/assets/icons";
import styles from "./TradeMonitoringModal.module.css";
import { BadgeEdge } from "@/widgets/ChartBadgeEdge/ChartBadgeEdge";

interface TradeMonitoringModalProps {
  onClose: () => void;
}

/* ---------------------------------------------
   Helpers
---------------------------------------------- */
const dashedBlue = {
  stroke: "#43556E",
  strokeWidth: 2,
  strokeDasharray: "5 5",
};

const dashedGreen = {
  stroke: "#19E299",
  strokeWidth: 2,
  strokeDasharray: "5 5",
};

const arrowBlue = {
  type: MarkerType.ArrowClosed,
  color: "#43556E",
  width: 20,
  height: 20,
};

const arrowGreen = {
  type: MarkerType.ArrowClosed,
  color: "#19E299",
  width: 20,
  height: 20,
};

/* ---------------------------------------------
   Custom Node Components
---------------------------------------------- */

const StartNode = () => (
  <div className={styles.startLabel}>
    Start
    <Handle type="source" position={Position.Right} />
  </div>
);

const EndNode = () => (
  <div className={styles.endLabel}>
    End
    {/* ✅ Execution → End from left */}
    <Handle
      id="fromExecution"
      type="target"
      position={Position.Left}
      style={{ top: "50%" }}
    />
    {/* ✅ Risk → End comes from bottom */}
    <Handle id="fromRisk" type="target" position={Position.Bottom} />
  </div>
);

const edgeTypes = { badge: BadgeEdge };

const RiskValidationNode = () => (
  <div className={`${styles.card} ${styles.cardCompleted}`}>
    <Handle type="target" position={Position.Left} />

    <div className={styles.cardHeader}>
      <RiskIcon width={18} height={18} />
      <h3 className={styles.cardTitle}>RISK VALIDATION</h3>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.cardRow}>
        <span>• Capital Allocation: ₹3,00,000</span>
        <GreenTickIcon width={16} height={16} />
      </div>
      <div className={styles.cardRow}>
        <span>• Position Size: 10% of capital</span>
        <GreenTickIcon width={16} height={16} />
      </div>
      <div className={styles.cardRow}>
        <span>• Risk per Trade: 1% (₹3,000)</span>
        <GreenTickIcon width={16} height={16} />
      </div>
      <div className={styles.cardRow}>
        <span>• Risk–Reward Ratio: 1 : 2</span>
        <GreenTickIcon width={16} height={16} />
      </div>
    </div>

    <div className={styles.statusBadge}>
      <SuccessCheckIcon width={16} height={16} />
      <span>Completed</span>
    </div>

    <Handle type="source" position={Position.Right} />
  </div>
);

const MonitoringNode = () => (
  <div className={`${styles.card} ${styles.cardRunning}`}>
    {/* ✅ only ONE target handle */}
    <Handle type="target" position={Position.Left} />

    <div className={styles.cardHeader}>
      <BarChartIcon width={18} height={18} />
      <h3 className={styles.cardTitle}>MONITORING</h3>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.cardRow}>
        <span>• Condition</span>
        <span>Nifty &gt; 26000</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Market Bias</span>
        <span>Bullish</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Current</span>
        <span>29000</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Target</span>
        <span>26000</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Progress</span>
        <div className={styles.progressBar}>
          <div className={styles.progressBarTrack}>
            <div
              className={`${styles.parallelogram} ${styles.parallelogramFilled}`}
            />
            <div
              className={`${styles.parallelogram} ${styles.parallelogramFilled}`}
            />
            <div
              className={`${styles.parallelogram} ${styles.parallelogramFilled}`}
            />
            <div
              className={`${styles.parallelogram} ${styles.parallelogramFilled}`}
            />
            <div
              className={`${styles.parallelogram} ${styles.parallelogramFilled}`}
            />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
          </div>
          <span className={styles.progressText}>63%</span>
        </div>
      </div>
    </div>

    <div className={styles.statusBadge}>
      <div className={styles.spinner}></div>
      <span>Running</span>
    </div>

    {/* ✅ Single source to Entry Execution */}
    <Handle type="source" position={Position.Right} />
  </div>
);

const EntryExecutionNode = () => (
  <div className={`${styles.card} ${styles.cardPending}`}>
    <Handle type="target" position={Position.Left} />

    <div className={styles.cardHeader}>
      <TargetIcon width={18} height={18} />
      <h3 className={styles.cardTitle}>ENTRY EXECUTION</h3>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.cardStockRow}>
        <div className={styles.cardStockRowLeft}>
          <Image
            src="/images/reliance.png"
            alt="RELIANCE"
            width={32}
            height={32}
            className={styles.cardStockImg}
          />
          <div>
            <div className={styles.cardStockName}>RELIANCE</div>
            <div className={styles.cardStockExchange}>NSE EQ Intraday</div>
          </div>
        </div>
        <div className={styles.cardBuyBadge}>
          <ArrowUpIcon width={16} height={16} />
          Buy
        </div>
      </div>

      <div className={styles.cardRow}>
        <span>• Quantity</span>
        <span>100 shares</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Trigger price</span>
        <span>-</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Executed time</span>
        <span className={styles.textError}>Not executed</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Investment</span>
        <span>-</span>
      </div>
    </div>

    <div className={styles.statusBadge}>
      <PendingIcon width={16} height={16} />
      <span>Pending</span>
    </div>

    {/* ✅ Two source handles for branching */}
    <Handle
      id="toProfitMonitoring"
      type="source"
      position={Position.Right}
      style={{ top: "30%" }}
    />
    <Handle
      id="toRisk"
      type="source"
      position={Position.Right}
      style={{ top: "70%" }}
    />
  </div>
);

const MonitoringProfitNode = () => (
  <div className={`${styles.card} ${styles.cardPending}`}>
    <Handle type="target" position={Position.Left} />

    <div className={styles.cardHeader}>
      <BarChartIcon width={18} height={18} />
      <h3 className={styles.cardTitle}>MONITORING</h3>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.cardRow}>
        <span>• Condition</span>
        <span>Profit &gt; 15000</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Current</span>
        <span>0</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Target</span>
        <span>15000</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Progress</span>
        <div className={styles.progressBar}>
          <div className={styles.progressBarTrack}>
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
            <div className={styles.parallelogram} />
          </div>
          <span className={styles.progressText}>0%</span>
        </div>
      </div>
      <div className={styles.cardRow}>
        <span>• Time</span>
        <span>
          <span className={styles.textSuccess}>0h </span>
          <span className={styles.strategyText}>elapsed</span>
        </span>
      </div>
    </div>

    <div className={styles.statusBadge}>
      <PendingIcon width={16} height={16} />
      <span>Pending</span>
    </div>

    <Handle id="toExecution" type="source" position={Position.Right} />
  </div>
);

const RiskNode = () => (
  <div className={`${styles.card} ${styles.cardPending}`}>
    {/* incoming from left */}
    <Handle type="target" position={Position.Left} />

    <div className={styles.cardHeader}>
      <RiskShieldIcon width={18} height={18} />
      <h3 className={styles.cardTitle}>RISK</h3>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.cardRow}>
        <span>• Type</span>
        <span>Stop Loss</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Level</span>
        <span>2925</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Risk amount</span>
        <span>3000</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Protects</span>
        <div className={styles.protectsRow}>
          <Image
            src="/images/reliance.png"
            alt="RELIANCE"
            width={24}
            height={24}
            className={styles.miniLogo}
          />
          <span>RELIANCE</span>
        </div>
      </div>
    </div>

    <div className={styles.statusBadge}>
      <PendingIcon width={16} height={16} />
      <span>Pending</span>
    </div>

    {/* ✅ To End directly from Bottom */}
    <Handle id="toEnd" type="source" position={Position.Bottom} />
  </div>
);

const ExecutionNode = () => (
  <div className={`${styles.card} ${styles.cardPending}`}>
    <Handle type="target" position={Position.Left} />

    <div className={styles.cardHeader}>
      <TargetIcon width={18} height={18} />
      <h3 className={styles.cardTitle}>EXECUTION</h3>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.cardStockRow}>
        <div className={styles.cardStockRowLeft}>
          <Image
            src="/images/reliance.png"
            alt="RELIANCE"
            width={32}
            height={32}
            className={styles.cardStockImg}
          />
          <div>
            <div className={styles.cardStockName}>RELIANCE</div>
            <div className={styles.cardStockExchange}>NSE EQ Intraday</div>
          </div>
        </div>
        <div className={styles.cardSellBadge}>
          <ArrowDownIcon width={16} height={16} />
          Sell
        </div>
      </div>

      <div className={styles.cardRow}>
        <span>• Quantity</span>
        <span>100 shares</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Price</span>
        <span>-</span>
      </div>
      <div className={styles.cardRow}>
        <span>• Executed time</span>
        <span className={styles.textError}>Not executed</span>
      </div>
    </div>

    <div className={styles.statusBadge}>
      <PendingIcon width={16} height={16} />
      <span>Pending</span>
    </div>

    <Handle id="toEnd" type="source" position={Position.Right} />
  </div>
);

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  riskValidation: RiskValidationNode,
  monitoring: MonitoringNode,
  entryExecution: EntryExecutionNode,
  monitoringProfit: MonitoringProfitNode,
  risk: RiskNode,
  execution: ExecutionNode,
};

/* ---------------------------------------------
   Main Component
---------------------------------------------- */
export const TradeMonitoringModal: React.FC<TradeMonitoringModalProps> = ({
  onClose,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const nodes: Node[] = useMemo(
    () => [
      {
        id: "start",
        type: "start",
        position: { x: 63, y: 344.5 },
        data: {},
      },
      {
        id: "riskValidation",
        type: "riskValidation",
        position: { x: 230, y: 285 },
        data: {},
      },
      {
        id: "monitoring",
        type: "monitoring",
        position: { x: 677, y: 273 },
        data: {},
      },
      {
        id: "entryExecution",
        type: "entryExecution",
        position: { x: 1124, y: 261 },
        data: {},
      },
      {
        id: "monitoringProfit",
        type: "monitoringProfit",
        position: { x: 1647, y: 111 },
        data: {},
      },
      {
        id: "risk",
        type: "risk",
        position: { x: 1647, y: 439 },
        data: {},
      },
      {
        id: "execution",
        type: "execution",
        position: { x: 2212, y: 265 },
        data: {},
      },
      {
        id: "end",
        type: "end",
        position: { x: 2659, y: 338 },
        data: {},
      },
    ],
    []
  );

  const edges: Edge[] = useMemo(
    () => [
      {
        id: "e-start-riskValidation",
        source: "start",
        target: "riskValidation",
        type: "straight",
        style: dashedGreen,
        markerEnd: arrowGreen,
      },
      {
        id: "e-riskValidation-monitoring",
        source: "riskValidation",
        target: "monitoring",
        type: "straight",
        style: dashedGreen,
        markerEnd: arrowGreen,
      },
      {
        id: "e-monitoring-entryExecution",
        source: "monitoring",
        target: "entryExecution",
        type: "straight",
        animated: false,
        style: dashedBlue,
        markerEnd: arrowBlue,
      },
      {
        id: "e-entryExecution-monitoringProfit",
        source: "entryExecution",
        sourceHandle: "toProfitMonitoring",
        target: "monitoringProfit",
        type: "smoothstep",

        style: dashedBlue,
        markerEnd: arrowBlue,
      },
      {
        id: "e-monitoringProfit-execution",
        source: "monitoringProfit",
        sourceHandle: "toExecution",
        target: "execution",
        type: "badge",
        data: {
          label: "PROFIT TARGET",
          padding: 9,
          paddingLeft: 12,
        },
        style: dashedBlue,
        markerEnd: arrowBlue,
      },
      {
        id: "e-entryExecution-risk",
        source: "entryExecution",
        sourceHandle: "toRisk",
        target: "risk",
        type: "badge",
        data: {
          label: "PROTECTION",
          padding: 9,
          paddingLeft: 12,
        },
        style: dashedBlue,
        markerEnd: arrowBlue,
      },
      {
        id: "e-execution-end",
        source: "execution",
        sourceHandle: "toEnd",
        target: "end",
        targetHandle: "fromExecution",
        type: "straight",
        style: dashedBlue,
        markerEnd: arrowBlue,
      },
      {
        id: "e-risk-end",
        source: "risk",
        sourceHandle: "toEnd",
        target: "end",
        targetHandle: "fromRisk",
        type: "step",
        style: dashedBlue,
        markerEnd: arrowBlue,
      },
    ],
    []
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>Monitoring Details</h2>
            <div className={styles.tradeBadge}>
              <span className={styles.activeDot}></span>
              <span className={styles.tradeActiveText}>Trade Active</span>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              <CloseIcon width={20} height={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className={styles.scrollableContent}>
            {/* Stock Info Section */}
            <div className={styles.infoSection}>
              {/* Top Row */}
              <div className={styles.topRow}>
                <div className={styles.leftColumn}>
                  <p className={styles.description}>
                    Find and trade a high-volume breakout in RELIANCE
                  </p>
                  <div className={styles.stockInfo}>
                    <Image
                      src="/images/reliance.png"
                      alt="RELIANCE"
                      width={32}
                      height={32}
                      className={styles.stockLogo}
                    />
                    <div className={styles.stockDetails}>
                      <div className={styles.stockName}>RELIANCE</div>
                      <div className={styles.stockExchange}>
                        NSE EQ Intraday
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.rightColumn}>
                  <p className={styles.dateTime}>19 Aug 2025, 14:13</p>
                  <div className={styles.badges}>
                    <span className={styles.buyBadge}>Buy</span>
                    <div className={styles.brokerBadge}>
                      <Image
                        src="/images/zerodha.png"
                        alt="Zerodha"
                        width={16}
                        height={16}
                        className={styles.brokerLogo}
                      />
                      <span className={styles.brokerName}>Zerodha</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className={styles.bottomRow}>
                <div className={styles.strategySection}>
                  <TargetIcon
                    width={18}
                    height={18}
                    className={styles.strategyIcon}
                  />
                  <div className={styles.strategyContent}>
                    <div className={styles.strategyLabel}>Strategy</div>
                    <div className={styles.strategyText}>
                      High-Volume Breakout
                      <br />
                      Broke above ₹2,950 with 220% volume
                    </div>
                  </div>
                </div>

                <div className={styles.pricesSection}>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>Entry Price</div>
                    <div className={styles.priceValue}>₹2,955</div>
                  </div>
                  <div className={styles.priceDivider}></div>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>Stop Loss</div>
                    <div className={styles.priceValue}>₹2,925</div>
                  </div>
                  <div className={styles.priceDivider}></div>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>Target Price</div>
                    <div className={styles.priceValue}>₹3,050</div>
                  </div>
                </div>
              </div>
            </div>

            {/* React Flow Timeline */}
            <div className={styles.flowContainer}>
              <ReactFlowProvider>
                <ReactFlow
                  key="trade-monitoring-flow"
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.2 }}
                  nodesDraggable={false}
                  nodesConnectable={false}
                  elementsSelectable={false}
                  zoomOnScroll={false}
                  panOnScroll={true}
                  panOnDrag={true}
                  zoomOnDoubleClick={false}
                  minZoom={0.3}
                  maxZoom={2}
                  proOptions={{ hideAttribution: true }}
                  style={{ width: "100%", height: "100%" }}
                  edgeTypes={edgeTypes}
                />
              </ReactFlowProvider>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <button className={styles.btnSecondary}>Stop Monitoring</button>
            <button className={styles.btnPrimary}>Pause Monitoring</button>
          </div>
        </div>
      </div>
    </div>
  );
};
