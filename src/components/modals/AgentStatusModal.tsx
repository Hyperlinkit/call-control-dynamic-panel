
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dbService, AgentStatusData } from "@/services/dbService";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AgentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgentStatusModal: React.FC<AgentStatusModalProps> = ({ isOpen, onClose }) => {
  const [agentData, setAgentData] = useState<AgentStatusData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchAgentData();
    }
  }, [isOpen]);

  const fetchAgentData = async () => {
    setIsLoading(true);
    try {
      const data = await dbService.getAgentStatuses();
      setAgentData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch agent status data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success text-success-foreground">Available</Badge>;
      case 'busy':
        return <Badge variant="default">Busy</Badge>;
      case 'offline':
        return <Badge variant="secondary">Offline</Badge>;
      case 'break':
        return <Badge variant="outline">On Break</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatTimeSince = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agent Status</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-auto max-h-[60vh]">
            {agentData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active Calls</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentData.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell>{agent.name}</TableCell>
                      <TableCell>{getStatusBadge(agent.status)}</TableCell>
                      <TableCell>{agent.activeCalls}</TableCell>
                      <TableCell>{formatTimeSince(agent.lastActivity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No agents available
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AgentStatusModal;
