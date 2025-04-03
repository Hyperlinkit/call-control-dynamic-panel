
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentCalls from "@/components/dashboard/RecentCalls";
import { callMetrics, calls } from "@/lib/data";
import { agents } from "@/lib/data";

const Index = () => {
  // Get active calls
  const activeCalls = calls.filter(call => call.status === "active" || call.status === "waiting");
  const availableAgents = agents.filter(agent => agent.status === "available").length;
  
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
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                Make Call
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4">
                View Queue
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4">
                Agent Status
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4">
                Call Reports
              </button>
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
    </div>
  );
};

export default Index;
