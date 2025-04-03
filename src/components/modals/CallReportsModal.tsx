
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dbService } from "@/services/dbService";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface CallReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallReportsModal: React.FC<CallReportsModalProps> = ({ isOpen, onClose }) => {
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchReportData();
    }
  }, [isOpen]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const data = await dbService.getCallReports();
      setReportData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch call reports",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Call Reports</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : reportData ? (
          <div className="space-y-6 overflow-auto max-h-[70vh] pr-2">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reportData.totalCalls}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Answered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">
                    {reportData.answeredCalls} 
                    <span className="text-xs ml-2 font-normal text-muted-foreground">
                      ({Math.round((reportData.answeredCalls / reportData.totalCalls) * 100)}%)
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Missed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {reportData.missedCalls}
                    <span className="text-xs ml-2 font-normal text-muted-foreground">
                      ({Math.round((reportData.missedCalls / reportData.totalCalls) * 100)}%)
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reportData.peakHour}:00</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Times</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Wait Time</div>
                  <div className="text-xl font-semibold">{formatTime(reportData.avgWaitTime)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Call Duration</div>
                  <div className="text-xl font-semibold">{formatTime(reportData.avgCallDuration)}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={reportData.callsByAgent}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="agentName" />
                      <YAxis />
                      <Tooltip formatter={(value) => [value, 'Calls']} />
                      <Legend />
                      <Bar dataKey="calls" fill="hsl(var(--primary))" name="Total Calls" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent Name</TableHead>
                      <TableHead>Total Calls</TableHead>
                      <TableHead>Avg Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.callsByAgent.map((agent: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{agent.agentName}</TableCell>
                        <TableCell>{agent.calls}</TableCell>
                        <TableCell>{formatTime(agent.avgDuration)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No report data available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallReportsModal;
