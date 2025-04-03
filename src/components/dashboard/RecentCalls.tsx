
import { formatDuration, formatPhoneNumber, formatTimestamp } from "@/lib/data";
import { Call } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentCallsProps {
  calls: Call[];
}

const RecentCalls = ({ calls }: RecentCallsProps) => {
  // Sort calls by timestamp (newest first)
  const sortedCalls = [...calls].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);
  
  const getStatusClass = (status: Call["status"]) => {
    switch (status) {
      case "active": return "call-status-active pl-4";
      case "waiting": return "call-status-waiting pl-4";
      case "ended": return "call-status-ended pl-4";
      case "missed": return "call-status-ended pl-4";
      default: return "";
    }
  };
  
  const getCallIcon = (call: Call) => {
    if (call.status === "missed") return <PhoneMissed className="h-4 w-4 text-destructive" />;
    
    if (call.status === "active") {
      return <Phone className="h-4 w-4 text-success" />;
    }
    
    return call.direction === "inbound" 
      ? <PhoneIncoming className="h-4 w-4 text-info" />
      : <PhoneOutgoing className="h-4 w-4 text-primary" />;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Calls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedCalls.map(call => (
            <div key={call.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2">
                  {getCallIcon(call)}
                </div>
                <div>
                  <h4 className={cn("font-medium", getStatusClass(call.status))}>
                    {call.caller}
                  </h4>
                  <p className="text-sm text-muted-foreground">{formatPhoneNumber(call.callerNumber)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{formatTimestamp(call.timestamp)}</p>
                <p className="text-sm text-muted-foreground">
                  {call.status === "active" ? "Active" : (
                    call.status === "waiting" ? "Waiting" : (
                      call.duration !== null ? formatDuration(call.duration) : "Missed"
                    )
                  )}
                </p>
              </div>
            </div>
          ))}
          
          {sortedCalls.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No recent calls</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCalls;
