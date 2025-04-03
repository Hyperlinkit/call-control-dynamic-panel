
import { DB_CONFIG } from "@/lib/db-config";

// This is a mock service for frontend demonstration
// In a real application, these would communicate with a backend API
// that interfaces with the MySQL database

export interface QueueItem {
  id: number;
  callerName: string;
  phoneNumber: string;
  waitTime: number;
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export interface AgentStatusData {
  id: number;
  name: string;
  status: 'available' | 'busy' | 'offline' | 'break';
  activeCalls: number;
  lastActivity: Date;
}

export const dbService = {
  // Make a new call
  makeCall: async (phoneNumber: string, notes?: string) => {
    console.log(`Making call to ${phoneNumber} with notes: ${notes}`);
    console.log('Using DB config:', DB_CONFIG);
    
    try {
      // In a real app, this would be an API call to the backend
      // return await fetch('/api/calls', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber, notes })
      // }).then(res => res.json());
      
      // Mock response
      return {
        success: true,
        callId: Math.floor(Math.random() * 1000000),
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error making call:', error);
      throw new Error('Failed to initiate call');
    }
  },
  
  // Get queue status
  getQueueStatus: async (): Promise<QueueItem[]> => {
    console.log('Getting queue status');
    console.log('Using DB config:', DB_CONFIG);
    
    try {
      // In a real app, this would be an API call to the backend
      // return await fetch('/api/queue').then(res => res.json());
      
      // Mock response
      return [
        {
          id: 1,
          callerName: 'John Doe',
          phoneNumber: '(555) 123-4567',
          waitTime: 128, // seconds
          priority: 'high',
          timestamp: new Date(Date.now() - 128000)
        },
        {
          id: 2,
          callerName: 'Jane Smith',
          phoneNumber: '(555) 987-6543',
          waitTime: 45,
          priority: 'medium',
          timestamp: new Date(Date.now() - 45000)
        },
        {
          id: 3,
          callerName: 'Robert Johnson',
          phoneNumber: '(555) 456-7890',
          waitTime: 210,
          priority: 'low',
          timestamp: new Date(Date.now() - 210000)
        }
      ];
    } catch (error) {
      console.error('Error getting queue status:', error);
      throw new Error('Failed to retrieve queue status');
    }
  },
  
  // Get agent statuses
  getAgentStatuses: async (): Promise<AgentStatusData[]> => {
    console.log('Getting agent statuses');
    console.log('Using DB config:', DB_CONFIG);
    
    try {
      // In a real app, this would be an API call to the backend
      // return await fetch('/api/agents/status').then(res => res.json());
      
      // Mock response
      return [
        {
          id: 1,
          name: 'Alice Cooper',
          status: 'available',
          activeCalls: 0,
          lastActivity: new Date(Date.now() - 300000) // 5 minutes ago
        },
        {
          id: 2,
          name: 'Bob Smith',
          status: 'busy',
          activeCalls: 2,
          lastActivity: new Date(Date.now() - 60000) // 1 minute ago
        },
        {
          id: 3,
          name: 'Charlie Brown',
          status: 'break',
          activeCalls: 0,
          lastActivity: new Date(Date.now() - 900000) // 15 minutes ago
        },
        {
          id: 4,
          name: 'Diana Prince',
          status: 'offline',
          activeCalls: 0,
          lastActivity: new Date(Date.now() - 3600000) // 1 hour ago
        }
      ];
    } catch (error) {
      console.error('Error getting agent statuses:', error);
      throw new Error('Failed to retrieve agent statuses');
    }
  },
  
  // Get call reports summary
  getCallReports: async () => {
    console.log('Getting call reports');
    console.log('Using DB config:', DB_CONFIG);
    
    try {
      // In a real app, this would be an API call to the backend
      // return await fetch('/api/reports/calls').then(res => res.json());
      
      // Mock response
      return {
        totalCalls: 432,
        answeredCalls: 389,
        missedCalls: 43,
        avgWaitTime: 37, // seconds
        avgCallDuration: 189, // seconds
        peakHour: 14, // 2 PM
        callsByAgent: [
          { agentName: 'Alice Cooper', calls: 127, avgDuration: 175 },
          { agentName: 'Bob Smith', calls: 143, avgDuration: 203 },
          { agentName: 'Charlie Brown', calls: 119, avgDuration: 168 }
        ]
      };
    } catch (error) {
      console.error('Error getting call reports:', error);
      throw new Error('Failed to retrieve call reports');
    }
  }
};
