
export type CallStatus = "active" | "waiting" | "ended" | "missed";

export type CallDirection = "inbound" | "outbound";

export type Call = {
  id: string;
  caller: string;
  callerNumber: string;
  agent: string | null;
  timestamp: Date;
  duration: number | null; // in seconds
  status: CallStatus;
  direction: CallDirection;
  notes?: string;
};

export type Agent = {
  id: string;
  name: string;
  email: string;
  status: "available" | "on-call" | "break" | "offline";
  extension: string;
  activeCalls: number;
  totalCalls: number;
  avatar?: string;
};

export type CallMetrics = {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  avgWaitTime: number; // in seconds
  avgCallDuration: number; // in seconds
  callsPerHour: { hour: number; count: number }[];
};
