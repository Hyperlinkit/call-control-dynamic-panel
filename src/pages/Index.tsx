
import React, { useState } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentCalls from "@/components/dashboard/RecentCalls";
import { callMetrics, calls } from "@/lib/data";
import { agents } from "@/lib/data";
import { PhoneCall, Users, BarChart3, FileText } from "lucide-react";
import MakeCallModal from "@/components/modals/MakeCallModal";
import ViewQueueModal from "@/components/modals/ViewQueueModal";
import AgentStatusModal from "@/components/modals/AgentStatusModal";
import CallReportsModal from "@/components/modals/CallReportsModal";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Get active calls
  const activeCalls = calls.filter(call => call.status === "active" || call.status === "waiting");
  const availableAgents = agents.filter(agent => agent.status === "available").length;

  // Modal states
  const [isMakeCallModalOpen, setIsMakeCallModalOpen] = useState(false);
  const [isViewQueueModalOpen, setIsViewQueueModalOpen] = useState(false);
  const [isAgentStatusModalOpen, setIsAgentStatusModalOpen] = useState(false);
  const [isCallReportsModalOpen, setIsCallReportsModalOpen] = useState(false);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-success mr-2"></div>
            <span>{availableAgents} agents available</span>
          </div>
          <div className="mx-2">•</div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
            <span>{activeCalls.length} active calls</span>
          </div>
        </div>
      </div>

      <DashboardStats metrics={callMetrics} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentCalls calls={calls} />

        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => setIsMakeCallModalOpen(true)}
                className="bg-primary text-primary-foreground"
              >
                <PhoneCall className="h-4 w-4 mr-2" /> Make Call
              </Button>
              
              <Button 
                onClick={() => setIsViewQueueModalOpen(true)}
                variant="secondary"
              >
                <FileText className="h-4 w-4 mr-2" /> View Queue
              </Button>
              
              <Button 
                onClick={() => setIsAgentStatusModalOpen(true)}
                variant="secondary"
              >
                <Users className="h-4 w-4 mr-2" /> Agent Status
              </Button>
              
              <Button 
                onClick={() => setIsCallReportsModalOpen(true)}
                variant="secondary"
              >
                <BarChart3 className="h-4 w-4 mr-2" /> Call Reports
              </Button>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Connection</span>
                <span className="text-sm text-success font-medium">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Call System</span>
                <span className="text-sm text-success font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">API Status</span>
                <span className="text-sm text-success font-medium">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last System Update</span>
                <span className="text-sm text-muted-foreground">Today, 9:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <MakeCallModal 
        isOpen={isMakeCallModalOpen} 
        onClose={() => setIsMakeCallModalOpen(false)} 
      />
      
      <ViewQueueModal 
        isOpen={isViewQueueModalOpen} 
        onClose={() => setIsViewQueueModalOpen(false)} 
      />
      
      <AgentStatusModal 
        isOpen={isAgentStatusModalOpen} 
        onClose={() => setIsAgentStatusModalOpen(false)} 
      />
      
      <CallReportsModal 
        isOpen={isCallReportsModalOpen} 
        onClose={() => setIsCallReportsModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
