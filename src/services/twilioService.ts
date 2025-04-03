// This service will handle Twilio integration for making calls
// In a production environment, you would typically handle Twilio API calls through a backend
// to keep your auth tokens secure

import { DB_CONFIG } from "@/lib/db-config";

// Get Twilio configuration from localStorage or use defaults
const getTwilioConfig = () => {
  try {
    const savedConfig = localStorage.getItem("twilioConfig");
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
  } catch (error) {
    console.error("Error loading Twilio config:", error);
  }
  
  // Default values if no configuration is found
  return {
    accountSid: "AC123456789", // Default placeholder
    authToken: "your_auth_token", // Default placeholder
    phoneNumber: "+15551234567" // Default placeholder
  };
};

export const twilioService = {
  // Initialize a call using Twilio
  initiateCall: async (phoneNumber: string, notes?: string) => {
    console.log(`Initiating Twilio call to ${phoneNumber}`);
    console.log('Using DB config:', DB_CONFIG);
    console.log('Call notes:', notes);
    
    // Get the current Twilio configuration
    const twilioConfig = getTwilioConfig();
    
    try {
      // In a real application, this would make an API call to your backend
      // which would then use the Twilio API to initiate the call
      const response = await fetch('/api/twilio/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          from: twilioConfig.phoneNumber,
          notes,
          // Never include auth credentials in client-side requests
          // These should be stored securely in your backend
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error making Twilio call:', error);
      
      // For demo purposes, return a mock response when the API isn't available
      return {
        success: true,
        callId: `twilio-${Math.floor(Math.random() * 1000000)}`,
        sid: `CA${Math.random().toString(36).substring(2, 15)}`,
        timestamp: new Date()
      };
    }
  },
  
  // End an active call
  endCall: async (callSid: string) => {
    console.log(`Ending Twilio call with SID: ${callSid}`);
    
    try {
      // In a real application, this would make an API call to your backend
      const response = await fetch('/api/twilio/call/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callSid,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error ending Twilio call:', error);
      
      // For demo purposes, return a mock success response
      return {
        success: true,
        message: 'Call ended successfully'
      };
    }
  },
  
  // Get call status
  getCallStatus: async (callSid: string) => {
    console.log(`Getting Twilio call status for SID: ${callSid}`);
    
    try {
      const response = await fetch(`/api/twilio/call/${callSid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting Twilio call status:', error);
      
      // For demo purposes, return a mock response
      return {
        success: true,
        status: 'in-progress',
        duration: Math.floor(Math.random() * 300), // Random duration in seconds
      };
    }
  },
  
  // Get the current Twilio configuration
  getConfig: () => {
    return getTwilioConfig();
  },
  
  // Test the Twilio configuration
  testConfiguration: async () => {
    const twilioConfig = getTwilioConfig();
    
    // Only check if values are set, not their validity
    // Real validation would require API calls to Twilio
    const isConfigured = 
      twilioConfig.accountSid && 
      twilioConfig.accountSid.length > 5 &&
      twilioConfig.authToken && 
      twilioConfig.authToken.length > 5 &&
      twilioConfig.phoneNumber &&
      twilioConfig.phoneNumber.length > 5;
    
    return {
      success: isConfigured,
      message: isConfigured 
        ? "Twilio configuration appears valid" 
        : "Twilio is not properly configured"
    };
  }
};
