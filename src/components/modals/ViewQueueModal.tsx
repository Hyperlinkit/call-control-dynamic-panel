
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
import { dbService, QueueItem } from "@/services/dbService";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ViewQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ViewQueueModal: React.FC<ViewQueueModalProps> = ({ isOpen, onClose }) => {
  const [queueData, setQueueData] = useState<QueueItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchQueueData();
    }
  }, [isOpen]);

  const fetchQueueData = async () => {
    setIsLoading(true);
    try {
      const data = await dbService.getQueueStatus();
      setQueueData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch queue data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatWaitTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Current Call Queue</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-auto max-h-[60vh]">
            {queueData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caller</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Time in Queue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queueData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.callerName}</TableCell>
                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell>{formatWaitTime(item.waitTime)}</TableCell>
                      <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                      <TableCell>
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No calls currently in queue
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewQueueModal;
