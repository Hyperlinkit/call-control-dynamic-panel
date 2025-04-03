
import { Agent, Call, CallMetrics } from './types';

// Mock agents data
export const agents: Agent[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'available',
    extension: '101',
    activeCalls: 0,
    totalCalls: 45,
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    status: 'on-call',
    extension: '102',
    activeCalls: 1,
    totalCalls: 38,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
  },
  {
    id: '3',
    name: 'Michael Davis',
    email: 'michael.davis@example.com',
    status: 'break',
    extension: '103',
    activeCalls: 0,
    totalCalls: 53,
    avatar: 'https://ui-avatars.com/api/?name=Michael+Davis&background=0D8ABC&color=fff',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    status: 'available',
    extension: '104',
    activeCalls: 0,
    totalCalls: 32,
    avatar: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=0D8ABC&color=fff',
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    status: 'offline',
    extension: '105',
    activeCalls: 0,
    totalCalls: 27,
    avatar: 'https://ui-avatars.com/api/?name=Robert+Brown&background=0D8ABC&color=fff',
  },
];

// Mock calls data
export const calls: Call[] = [
  {
    id: '1',
    caller: 'Jane Cooper',
    callerNumber: '+1 (555) 123-4567',
    agent: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    duration: 437, // 7 minutes and 17 seconds
    status: 'active',
    direction: 'inbound',
    notes: 'Customer inquiry about premium subscription plan',
  },
  {
    id: '2',
    caller: 'Brooklyn Simmons',
    callerNumber: '+1 (555) 234-5678',
    agent: null,
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    duration: null,
    status: 'waiting',
    direction: 'inbound',
    notes: '',
  },
  {
    id: '3',
    caller: 'Leslie Alexander',
    callerNumber: '+1 (555) 345-6789',
    agent: 'John Smith',
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    duration: 173, // 2 minutes and 53 seconds
    status: 'ended',
    direction: 'inbound',
    notes: 'Technical support for login issues',
  },
  {
    id: '4',
    caller: 'Dianne Russell',
    callerNumber: '+1 (555) 456-7890',
    agent: 'Emily Wilson',
    timestamp: new Date(Date.now() - 120 * 60000), // 2 hours ago
    duration: 62, // 1 minute and 2 seconds
    status: 'ended',
    direction: 'outbound',
    notes: 'Follow-up on previous inquiry',
  },
  {
    id: '5',
    caller: 'Cameron Williamson',
    callerNumber: '+1 (555) 567-8901',
    agent: 'Michael Davis',
    timestamp: new Date(Date.now() - 180 * 60000), // 3 hours ago
    duration: 0,
    status: 'missed',
    direction: 'inbound',
    notes: '',
  },
  {
    id: '6',
    caller: 'Guy Hawkins',
    callerNumber: '+1 (555) 678-9012',
    agent: 'Robert Brown',
    timestamp: new Date(Date.now() - 240 * 60000), // 4 hours ago
    duration: 315, // 5 minutes and 15 seconds
    status: 'ended',
    direction: 'inbound',
    notes: 'Billing question',
  },
  {
    id: '7',
    caller: 'Kristin Watson',
    callerNumber: '+1 (555) 789-0123',
    agent: 'John Smith',
    timestamp: new Date(Date.now() - 300 * 60000), // 5 hours ago
    duration: 247, // 4 minutes and 7 seconds
    status: 'ended',
    direction: 'inbound',
    notes: 'Service upgrade inquiry',
  },
  {
    id: '8',
    caller: 'Cody Fisher',
    callerNumber: '+1 (555) 890-1234',
    agent: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 360 * 60000), // 6 hours ago
    duration: 183, // 3 minutes and 3 seconds
    status: 'ended',
    direction: 'outbound',
    notes: 'Scheduled call for account review',
  },
];

// Mock call metrics
export const callMetrics: CallMetrics = {
  totalCalls: 47,
  answeredCalls: 42,
  missedCalls: 5,
  avgWaitTime: 28, // 28 seconds
  avgCallDuration: 195, // 3 minutes and 15 seconds
  callsPerHour: [
    { hour: 9, count: 5 },
    { hour: 10, count: 8 },
    { hour: 11, count: 12 },
    { hour: 12, count: 7 },
    { hour: 13, count: 4 },
    { hour: 14, count: 6 },
    { hour: 15, count: 5 },
  ],
};

// Helper functions
export const formatDuration = (seconds: number | null): string => {
  if (seconds === null) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber; // Already formatted in our mock data
};

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric'
  }).format(date);
};
