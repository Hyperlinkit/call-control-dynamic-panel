
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Phone, PhoneOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Agent } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface AgentsListProps {
  agents: Agent[];
}

const AgentsList = ({ agents }: AgentsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.extension.includes(searchQuery)
  );

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "available":
        return "bg-success";
      case "on-call":
        return "bg-info";
      case "break":
        return "bg-warning";
      case "offline":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const formatStatus = (status: Agent["status"]) => {
    switch (status) {
      case "on-call":
        return "On Call";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const handleCallAgent = (agent: Agent) => {
    toast.success(`Calling ${agent.name}...`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1">
          <CardTitle>Agents</CardTitle>
        </div>
        <Button variant="outline" size="sm">
          Add Agent
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex flex-col rounded-lg border p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback>
                      {agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ext. {agent.extension}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleCallAgent(agent)}
                    >
                      <Phone className="h-4 w-4 mr-2" /> Call
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <PhoneOff className="h-4 w-4 mr-2" /> Set Offline
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1">
                <div className="text-sm">{agent.email}</div>
                <div className="flex items-center">
                  <div
                    className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(
                      agent.status
                    )}`}
                  ></div>
                  <span className="text-sm">{formatStatus(agent.status)}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm border-t pt-3">
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-1">Active:</span>
                  <Badge variant="outline" className="font-normal">
                    {agent.activeCalls}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-1">Total:</span>
                  <Badge variant="outline" className="font-normal">
                    {agent.totalCalls}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {filteredAgents.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No agents found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentsList;
