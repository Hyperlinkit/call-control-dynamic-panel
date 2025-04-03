
import CallHistoryComponent from "@/components/calls/CallHistory";
import { calls } from "@/lib/data";

const CallHistory = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage all call records
        </p>
      </div>
      
      <CallHistoryComponent calls={calls} />
    </div>
  );
};

export default CallHistory;
