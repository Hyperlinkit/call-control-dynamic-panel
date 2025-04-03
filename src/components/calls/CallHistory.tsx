
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone } from "lucide-react";
import { Call } from "@/lib/types";
import { formatDuration, formatTimestamp } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallHistoryProps {
  calls: Call[];
}

const CallHistory = ({ calls }: CallHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [directionFilter, setDirectionFilter] = useState<string>("all");

  const filteredCalls = calls.filter(call => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      searchQuery === "" ||
      call.caller.toLowerCase().includes(searchLower) ||
      call.callerNumber.toLowerCase().includes(searchLower) ||
      (call.agent && call.agent.toLowerCase().includes(searchLower)) ||
      (call.notes && call.notes.toLowerCase().includes(searchLower));

    // Status filter
    const matchesStatus = 
      statusFilter === "all" ||
      call.status === statusFilter;

    // Direction filter
    const matchesDirection = 
      directionFilter === "all" ||
      call.direction === directionFilter;

    return matchesSearch && matchesStatus && matchesDirection;
  });

  // Sort calls by timestamp (newest first)
  const sortedCalls = [...filteredCalls].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getCallIcon = (call: Call) => {
    if (call.status === "missed") return <PhoneMissed className="h-4 w-4 text-destructive" />;
    if (call.status === "active") return <Phone className="h-4 w-4 text-success" />;
    
    return call.direction === "inbound" 
      ? <PhoneIncoming className="h-4 w-4 text-info" />
      : <PhoneOutgoing className="h-4 w-4 text-primary" />;
  };

  const getStatusClass = (status: Call["status"]) => {
    switch (status) {
      case "active": return "text-success";
      case "waiting": return "text-warning";
      case "missed": return "text-destructive";
      default: return "";
    }
  };

  const formatStatus = (status: Call["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Call History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search calls..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
              <SelectItem value="missed">Missed</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={directionFilter}
            onValueChange={setDirectionFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Directions</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setDirectionFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Caller</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{getCallIcon(call)}</TableCell>
                  <TableCell className="font-medium">{call.caller}</TableCell>
                  <TableCell>{call.callerNumber}</TableCell>
                  <TableCell>{call.agent || "—"}</TableCell>
                  <TableCell>{formatTimestamp(call.timestamp)}</TableCell>
                  <TableCell>
                    {call.status === "active" ? "Active" : (
                      call.status === "waiting" ? "Waiting" : (
                        call.duration !== null ? formatDuration(call.duration) : "—"
                      )
                    )}
                  </TableCell>
                  <TableCell className={getStatusClass(call.status)}>
                    {formatStatus(call.status)}
                  </TableCell>
                </TableRow>
              ))}

              {sortedCalls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No calls found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallHistory;
