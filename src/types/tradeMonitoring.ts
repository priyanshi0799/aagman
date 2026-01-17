export type TradeStatus = "active" | "completed" | "paused" | "stopped";
export type NodeStatus = "completed" | "running" | "pending";
export type TradeAction = "buy" | "sell";
export type OrderType = "market" | "limit" | "stop-loss";

export interface StockInfo {
  symbol: string;
  name: string;
  exchange: string;
  logoUrl: string;
}

export interface BrokerInfo {
  id: string;
  name: string;
  logoUrl: string;
}

export interface PriceLevel {
  entry: number;
  stopLoss: number;
  target: number;
}

export interface StrategyInfo {
  name: string;
  description: string;
}

export interface ValidationItem {
  label: string;
  value: string;
  isValid: boolean;
}

export interface RiskValidation {
  capitalAllocation: number;
  positionSize: string;
  riskPerTrade: {
    percentage: number;
    amount: number;
  };
  riskRewardRatio: string;
  status: NodeStatus;
}

export interface MonitoringCondition {
  condition: string;
  marketBias?: string;
  current: number;
  target: number;
  progress: number;
  status: NodeStatus;
}

export interface EntryExecution {
  stock: StockInfo;
  action: TradeAction;
  quantity: number;
  quantityUnit: string;
  triggerPrice: number | null;
  executedTime: string | null;
  investment: number | null;
  status: NodeStatus;
}

export interface MonitoringProfit {
  condition: string;
  current: number;
  target: number;
  progress: number;
  timeElapsed: string;
  status: NodeStatus;
}

export interface RiskProtection {
  type: string;
  level: number;
  riskAmount: number;
  protects: StockInfo;
  status: NodeStatus;
}

export interface Execution {
  stock: StockInfo;
  action: TradeAction;
  quantity: number;
  quantityUnit: string;
  price: number | null;
  executedTime: string | null;
  status: NodeStatus;
}

export interface TradeMonitoringData {
  id: string;
  title: string;
  tradeStatus: TradeStatus;
  description: string;
  stock: StockInfo;
  broker: BrokerInfo;
  timestamp: string;
  action: TradeAction;
  strategy: StrategyInfo;
  priceLevel: PriceLevel;
  riskValidation: RiskValidation;
  monitoring: MonitoringCondition;
  entryExecution: EntryExecution;
  monitoringProfit: MonitoringProfit;
  risk: RiskProtection;
  execution: Execution;
}

export interface FlowNodePosition {
  x: number;
  y: number;
}

export interface FlowNodeData {
  id: string;
  type: string;
  position: FlowNodePosition;
}

export interface FlowEdgeData {
  id: string;
  source: string;
  target: string;
  type: string;
  sourceHandle?: string;
  targetHandle?: string;
  label?: string;
  animated?: boolean;
}
