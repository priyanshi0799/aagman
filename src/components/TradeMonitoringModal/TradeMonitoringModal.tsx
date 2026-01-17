import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  Position,
  Handle,
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
import type { TradeMonitoringData } from "@/types/tradeMonitoring";
import {
  mockTradeMonitoringData,
  mockFlowNodes,
  mockFlowEdges,
} from "@/utils/mockTradeData";
import { dashedBlue, dashedGreen, arrowBlue, arrowGreen } from "@/utils/helper";
import { allBrokers } from "@/utils/data";

interface TradeMonitoringModalProps {
  onClose: () => void;
  data?: TradeMonitoringData; // Optional: if not provided, uses mock data
  selectedBroker?: string; // Selected broker name from chat input
}

const StartNode = () => (
  <div className={styles.startLabel}>
    Start
    <Handle type="source" position={Position.Right} />
  </div>
);

const EndNode = () => (
  <div className={styles.endLabel}>
    End
    <Handle
      id="fromExecution"
      type="target"
      position={Position.Left}
      style={{ top: "50%" }}
    />
    <Handle id="fromRisk" type="target" position={Position.Bottom} />
  </div>
);

const edgeTypes = { badge: BadgeEdge };

const RiskValidationNode = ({ data }: { data: any }) => {
  const { riskValidation } = data;
  return (
    <div className={`${styles.card} ${styles.cardCompleted}`}>
      <Handle type="target" position={Position.Left} />

      <div className={styles.cardHeader}>
        <RiskIcon width={18} height={18} />
        <h3 className={styles.cardTitle}>RISK VALIDATION</h3>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <span>
            • Capital Allocation: ₹
            {riskValidation.capitalAllocation.toLocaleString()}
          </span>
          <GreenTickIcon width={16} height={16} />
        </div>
        <div className={styles.cardRow}>
          <span>• Position Size: {riskValidation.positionSize}</span>
          <GreenTickIcon width={16} height={16} />
        </div>
        <div className={styles.cardRow}>
          <span>
            • Risk per Trade: {riskValidation.riskPerTrade.percentage}% (₹
            {riskValidation.riskPerTrade.amount.toLocaleString()})
          </span>
          <GreenTickIcon width={16} height={16} />
        </div>
        <div className={styles.cardRow}>
          <span>• Risk–Reward Ratio: {riskValidation.riskRewardRatio}</span>
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
};

const MonitoringNode = ({ data }: { data: any }) => {
  const { monitoring } = data;
  const filledSegments = Math.floor((monitoring.progress / 100) * 8);

  return (
    <div className={`${styles.card} ${styles.cardRunning}`}>
      <Handle type="target" position={Position.Left} />

      <div className={styles.cardHeader}>
        <BarChartIcon width={18} height={18} />
        <h3 className={styles.cardTitle}>MONITORING</h3>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <span>• Condition</span>
          <span>{monitoring.condition}</span>
        </div>
        {monitoring.marketBias && (
          <div className={styles.cardRow}>
            <span>• Market Bias</span>
            <span>{monitoring.marketBias}</span>
          </div>
        )}
        <div className={styles.cardRow}>
          <span>• Current</span>
          <span>{monitoring.current.toLocaleString()}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Target</span>
          <span>{monitoring.target.toLocaleString()}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Progress</span>
          <div className={styles.progressBar}>
            <div className={styles.progressBarTrack}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`${styles.parallelogram} ${
                    i < filledSegments ? styles.parallelogramFilled : ""
                  }`}
                />
              ))}
            </div>
            <span className={styles.progressText}>{monitoring.progress}%</span>
          </div>
        </div>
      </div>

      <div className={styles.statusBadge}>
        <div className={styles.spinner}></div>
        <span>Running</span>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const EntryExecutionNode = ({ data }: { data: any }) => {
  const { entryExecution } = data;
  const ActionIcon =
    entryExecution.action === "buy" ? ArrowUpIcon : ArrowDownIcon;
  const badgeClass =
    entryExecution.action === "buy"
      ? styles.cardBuyBadge
      : styles.cardSellBadge;

  return (
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
              src={entryExecution.stock.logoUrl}
              alt={entryExecution.stock.symbol}
              width={32}
              height={32}
              className={styles.cardStockImg}
            />
            <div>
              <div className={styles.cardStockName}>
                {entryExecution.stock.symbol}
              </div>
              <div className={styles.cardStockExchange}>
                {entryExecution.stock.exchange}
              </div>
            </div>
          </div>
          <div className={badgeClass}>
            <ActionIcon width={16} height={16} />
            {entryExecution.action === "buy" ? "Buy" : "Sell"}
          </div>
        </div>

        <div className={styles.cardRow}>
          <span>• Quantity</span>
          <span>
            {entryExecution.quantity} {entryExecution.quantityUnit}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span>• Trigger price</span>
          <span>
            {entryExecution.triggerPrice
              ? `₹${entryExecution.triggerPrice.toLocaleString()}`
              : "-"}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span>• Executed time</span>
          <span className={entryExecution.executedTime ? "" : styles.textError}>
            {entryExecution.executedTime || "Not executed"}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span>• Investment</span>
          <span>
            {entryExecution.investment
              ? `₹${entryExecution.investment.toLocaleString()}`
              : "-"}
          </span>
        </div>
      </div>

      <div className={styles.statusBadge}>
        <PendingIcon width={16} height={16} />
        <span>Pending</span>
      </div>

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
};

const MonitoringProfitNode = ({ data }: { data: any }) => {
  const { monitoringProfit } = data;
  const filledSegments = Math.floor((monitoringProfit.progress / 100) * 8);

  return (
    <div className={`${styles.card} ${styles.cardPending}`}>
      <Handle type="target" position={Position.Left} />

      <div className={styles.cardHeader}>
        <BarChartIcon width={18} height={18} />
        <h3 className={styles.cardTitle}>MONITORING</h3>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <span>• Condition</span>
          <span>{monitoringProfit.condition}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Current</span>
          <span>{monitoringProfit.current.toLocaleString()}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Target</span>
          <span>{monitoringProfit.target.toLocaleString()}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Progress</span>
          <div className={styles.progressBar}>
            <div className={styles.progressBarTrack}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`${styles.parallelogram} ${
                    i < filledSegments ? styles.parallelogramFilled : ""
                  }`}
                />
              ))}
            </div>
            <span className={styles.progressText}>
              {monitoringProfit.progress}%
            </span>
          </div>
        </div>
        <div className={styles.cardRow}>
          <span>• Time</span>
          <span>
            <span className={styles.textSuccess}>
              {monitoringProfit.timeElapsed}{" "}
            </span>
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
};

const RiskNode = ({ data }: { data: any }) => {
  const { risk } = data;

  return (
    <div className={`${styles.card} ${styles.cardPending}`}>
      <Handle type="target" position={Position.Left} />

      <div className={styles.cardHeader}>
        <RiskShieldIcon width={18} height={18} />
        <h3 className={styles.cardTitle}>RISK</h3>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardRow}>
          <span>• Type</span>
          <span>{risk.type}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Level</span>
          <span>{risk.level.toLocaleString()}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Risk amount</span>
          <span>{risk.riskAmount.toLocaleString()}</span>
        </div>
        <div className={styles.cardRow}>
          <span>• Protects</span>
          <div className={styles.protectsRow}>
            <Image
              src={risk.protects.logoUrl}
              alt={risk.protects.symbol}
              width={24}
              height={24}
              className={styles.miniLogo}
            />
            <span>{risk.protects.symbol}</span>
          </div>
        </div>
      </div>

      <div className={styles.statusBadge}>
        <PendingIcon width={16} height={16} />
        <span>Pending</span>
      </div>

      <Handle id="toEnd" type="source" position={Position.Bottom} />
    </div>
  );
};

const ExecutionNode = ({ data }: { data: any }) => {
  const { execution } = data;
  const ActionIcon = execution.action === "buy" ? ArrowUpIcon : ArrowDownIcon;
  const badgeClass =
    execution.action === "buy" ? styles.cardBuyBadge : styles.cardSellBadge;

  return (
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
              src={execution.stock.logoUrl}
              alt={execution.stock.symbol}
              width={32}
              height={32}
              className={styles.cardStockImg}
            />
            <div>
              <div className={styles.cardStockName}>
                {execution.stock.symbol}
              </div>
              <div className={styles.cardStockExchange}>
                {execution.stock.exchange}
              </div>
            </div>
          </div>
          <div className={badgeClass}>
            <ActionIcon width={16} height={16} />
            {execution.action === "buy" ? "Buy" : "Sell"}
          </div>
        </div>

        <div className={styles.cardRow}>
          <span>• Quantity</span>
          <span>
            {execution.quantity} {execution.quantityUnit}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span>• Price</span>
          <span>
            {execution.price ? `₹${execution.price.toLocaleString()}` : "-"}
          </span>
        </div>
        <div className={styles.cardRow}>
          <span>• Executed time</span>
          <span className={execution.executedTime ? "" : styles.textError}>
            {execution.executedTime || "Not executed"}
          </span>
        </div>
      </div>

      <div className={styles.statusBadge}>
        <PendingIcon width={16} height={16} />
        <span>Pending</span>
      </div>

      <Handle id="toEnd" type="source" position={Position.Right} />
    </div>
  );
};

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
  data = mockTradeMonitoringData, // Default to mock data if not provided
  selectedBroker = "Zerodha", // Default broker if not provided
}) => {
  // Get broker info from selected broker name
  const brokerInfo =
    allBrokers.find((b) => b.name === selectedBroker) || allBrokers[0];

  // Update data with selected broker
  const modalData = {
    ...data,
    broker: {
      id: brokerInfo.id,
      name: brokerInfo.name,
      logoUrl: brokerInfo.image,
    },
  };

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

  // Convert mock flow nodes to React Flow format with data
  const nodes: Node[] = useMemo(
    () =>
      mockFlowNodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          riskValidation: modalData.riskValidation,
          monitoring: modalData.monitoring,
          entryExecution: modalData.entryExecution,
          monitoringProfit: modalData.monitoringProfit,
          risk: modalData.risk,
          execution: modalData.execution,
        },
      })),
    [modalData]
  );

  // Convert mock flow edges to React Flow format with styling
  const edges: Edge[] = useMemo(
    () =>
      mockFlowEdges.map((edge) => {
        // Determine style based on edge connections
        const isGreenEdge =
          edge.id === "e-start-riskValidation" ||
          edge.id === "e-riskValidation-monitoring";

        // Add label data for specific edges
        const edgeData =
          edge.label === "PROFIT TARGET" || edge.label === "PROTECTION"
            ? {
                label: edge.label,
                padding: 9,
                paddingLeft: 12,
              }
            : undefined;

        // Use badge type for labeled edges
        const edgeType =
          edge.label === "PROFIT TARGET" || edge.label === "PROTECTION"
            ? "badge"
            : edge.type;

        return {
          ...edge,
          type: edgeType,
          data: edgeData,
          style: isGreenEdge ? dashedGreen : dashedBlue,
          markerEnd: isGreenEdge ? arrowGreen : arrowBlue,
          animated: false,
        };
      }),
    []
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>{modalData.title}</h2>
            <div className={styles.tradeBadge}>
              <span className={styles.activeDot}></span>
              <span className={styles.tradeActiveText}>
                {modalData.tradeStatus === "active"
                  ? "Trade Active"
                  : modalData.tradeStatus === "completed"
                  ? "Trade Completed"
                  : modalData.tradeStatus === "paused"
                  ? "Trade Paused"
                  : "Trade Stopped"}
              </span>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              <CloseIcon
                width={20}
                height={20}
                className={styles.closeButtonIcon}
              />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className={styles.scrollableContent}>
            {/* Stock Info Section */}
            <div className={styles.infoSection}>
              {/* Top Row */}
              <div className={styles.topRow}>
                <div className={styles.leftColumn}>
                  <p className={styles.description}>{modalData.description}</p>
                  <div className={styles.stockInfo}>
                    <Image
                      src={modalData.stock.logoUrl}
                      alt={modalData.stock.symbol}
                      width={32}
                      height={32}
                      className={styles.stockLogo}
                    />
                    <div className={styles.stockDetails}>
                      <div className={styles.stockName}>
                        {modalData.stock.symbol}
                      </div>
                      <div className={styles.stockExchange}>
                        {modalData.stock.exchange}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.rightColumn}>
                  <p className={styles.dateTime}>{modalData.timestamp}</p>
                  <div className={styles.badges}>
                    <span className={styles.buyBadge}>
                      {modalData.action === "buy" ? "Buy" : "Sell"}
                    </span>
                    <div className={styles.brokerBadge}>
                      <Image
                        src={modalData.broker.logoUrl}
                        alt={modalData.broker.name}
                        width={16}
                        height={16}
                        className={styles.brokerLogo}
                      />
                      <span className={styles.brokerName}>
                        {modalData.broker.name}
                      </span>
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
                      {modalData.strategy.name}
                      <br />
                      {modalData.strategy.description}
                    </div>
                  </div>
                </div>

                <div className={styles.pricesSection}>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>Entry Price</div>
                    <div className={styles.priceValue}>
                      ₹{modalData.priceLevel.entry.toLocaleString()}
                    </div>
                  </div>
                  <div className={styles.priceDivider}></div>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>Stop Loss</div>
                    <div className={styles.priceValue}>
                      ₹{modalData.priceLevel.stopLoss.toLocaleString()}
                    </div>
                  </div>
                  <div className={styles.priceDivider}></div>
                  <div className={styles.priceBox}>
                    <div className={styles.priceLabel}>Target Price</div>
                    <div className={styles.priceValue}>
                      ₹{modalData.priceLevel.target.toLocaleString()}
                    </div>
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

          <div className={styles.footer}>
            <button className={styles.btnSecondary}>Stop Monitoring</button>
            <button className={styles.btnPrimary}>Pause Monitoring</button>
          </div>
        </div>
      </div>
    </div>
  );
};
