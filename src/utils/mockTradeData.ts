import type {
  TradeMonitoringData,
  FlowNodeData,
  FlowEdgeData,
} from "@/types/tradeMonitoring";

/**
 * Mock data representing a trade monitoring response from the backend API
 * In production, this would be fetched from an API endpoint
 */
export const mockTradeMonitoringData: TradeMonitoringData = {
  id: "trade_001",
  title: "Monitoring Details",
  tradeStatus: "active",
  description: "Find and trade a high-volume breakout in RELIANCE",
  stock: {
    symbol: "RELIANCE",
    name: "RELIANCE",
    exchange: "NSE EQ Intraday",
    logoUrl: "/images/reliance.png",
  },
  broker: {
    id: "zerodha",
    name: "Zerodha",
    logoUrl: "/images/zerodha.png",
  },
  timestamp: "19 Aug 2025, 14:13",
  action: "buy",
  strategy: {
    name: "High-Volume Breakout",
    description: "Broke above ₹2,950 with 220% volume",
  },
  priceLevel: {
    entry: 2955,
    stopLoss: 2925,
    target: 3050,
  },
  riskValidation: {
    capitalAllocation: 300000,
    positionSize: "10% of capital",
    riskPerTrade: {
      percentage: 1,
      amount: 3000,
    },
    riskRewardRatio: "1 : 2",
    status: "completed",
  },
  monitoring: {
    condition: "Nifty > 26000",
    marketBias: "Bullish",
    current: 29000,
    target: 26000,
    progress: 63,
    status: "running",
  },
  entryExecution: {
    stock: {
      symbol: "RELIANCE",
      name: "RELIANCE",
      exchange: "NSE EQ Intraday",
      logoUrl: "/images/reliance.png",
    },
    action: "buy",
    quantity: 100,
    quantityUnit: "shares",
    triggerPrice: null,
    executedTime: null,
    investment: null,
    status: "pending",
  },
  monitoringProfit: {
    condition: "Profit > 15000",
    current: 0,
    target: 15000,
    progress: 0,
    timeElapsed: "0h",
    status: "pending",
  },
  risk: {
    type: "Stop Loss",
    level: 2925,
    riskAmount: 3000,
    protects: {
      symbol: "RELIANCE",
      name: "RELIANCE",
      exchange: "NSE EQ Intraday",
      logoUrl: "/images/reliance.png",
    },
    status: "pending",
  },
  execution: {
    stock: {
      symbol: "RELIANCE",
      name: "RELIANCE",
      exchange: "NSE EQ Intraday",
      logoUrl: "/images/reliance.png",
    },
    action: "sell",
    quantity: 100,
    quantityUnit: "shares",
    price: null,
    executedTime: null,
    status: "pending",
  },
};

/**
 * Flow configuration for the trade monitoring timeline
 * This defines the node positions for the React Flow diagram
 */
export const mockFlowNodes: FlowNodeData[] = [
  {
    id: "start",
    type: "start",
    position: { x: 63, y: 344.5 },
  },
  {
    id: "riskValidation",
    type: "riskValidation",
    position: { x: 230, y: 285 },
  },
  {
    id: "monitoring",
    type: "monitoring",
    position: { x: 677, y: 273 },
  },
  {
    id: "entryExecution",
    type: "entryExecution",
    position: { x: 1124, y: 261 },
  },
  {
    id: "monitoringProfit",
    type: "monitoringProfit",
    position: { x: 1647, y: 111 },
  },
  {
    id: "risk",
    type: "risk",
    position: { x: 1647, y: 439 },
  },
  {
    id: "execution",
    type: "execution",
    position: { x: 2212, y: 265 },
  },
  {
    id: "end",
    type: "end",
    position: { x: 2659, y: 338 },
  },
];

/**
 * Flow edge configuration for connecting nodes
 * Defines the connections and labels for the trade flow diagram
 */
export const mockFlowEdges: FlowEdgeData[] = [
  {
    id: "e-start-riskValidation",
    source: "start",
    target: "riskValidation",
    type: "straight",
  },
  {
    id: "e-riskValidation-monitoring",
    source: "riskValidation",
    target: "monitoring",
    type: "straight",
  },
  {
    id: "e-monitoring-entryExecution",
    source: "monitoring",
    target: "entryExecution",
    type: "straight",
  },
  {
    id: "e-entryExecution-monitoringProfit",
    source: "entryExecution",
    sourceHandle: "toProfitMonitoring",
    target: "monitoringProfit",
    type: "smoothstep",
    label: "PROFIT TARGET",
  },
  {
    id: "e-monitoringProfit-execution",
    source: "monitoringProfit",
    sourceHandle: "toExecution",
    target: "execution",
    type: "smoothstep",
  },
  {
    id: "e-entryExecution-risk",
    source: "entryExecution",
    sourceHandle: "toRisk",
    target: "risk",
    type: "smoothstep",
    label: "PROTECTION",
  },
  {
    id: "e-execution-end",
    source: "execution",
    sourceHandle: "toEnd",
    target: "end",
    targetHandle: "fromExecution",
    type: "straight",
  },
  {
    id: "e-risk-end",
    source: "risk",
    sourceHandle: "toEnd",
    target: "end",
    targetHandle: "fromRisk",
    type: "step",
  },
];
