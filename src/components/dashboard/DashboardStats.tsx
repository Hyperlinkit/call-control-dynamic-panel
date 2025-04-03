
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhoneCall, PhoneMissed, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { CallMetrics } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DashboardStatsProps {
  metrics: CallMetrics;
}

const DashboardStats = ({ metrics }: DashboardStatsProps) => {
  const callsAnsweredPercent = Math.round(
    (metrics.answeredCalls / metrics.totalCalls) * 100
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="stat-card-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
          <PhoneCall className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalCalls}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
            <div className="flex items-center text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12%</span>
            </div>
            <span>from yesterday</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="stat-card-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Answered Calls</CardTitle>
          <div className="flex items-center justify-center rounded-full w-4 h-4 bg-green-100">
            <PhoneCall className="h-3 w-3 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">{metrics.answeredCalls}</div>
            <div className="text-sm text-muted-foreground">{callsAnsweredPercent}%</div>
          </div>
          <Progress value={callsAnsweredPercent} className="h-2 mt-2" />
        </CardContent>
      </Card>
      
      <Card className="stat-card-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
          <div className="flex items-center justify-center rounded-full w-4 h-4 bg-red-100">
            <PhoneMissed className="h-3 w-3 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.missedCalls}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
            <div className="flex items-center text-red-500">
              <ArrowDownLeft className="h-3 w-3 mr-1" />
              <span>3%</span>
            </div>
            <span>from yesterday</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="stat-card-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(metrics.avgCallDuration)}</div>
          <div className="text-xs text-muted-foreground mt-2">
            Avg wait: {formatTime(metrics.avgWaitTime)}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Call Volume Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={metrics.callsPerHour}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="hour" 
                  tickFormatter={(hour) => `${hour}:00`}
                  axisLine={false}
                />
                <YAxis axisLine={false} />
                <Tooltip 
                  formatter={(value) => [`${value} calls`, 'Volume']}
                  labelFormatter={(hour) => `${hour}:00`}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(var(--primary))" 
                  fill="hsla(var(--primary), 0.2)" 
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
