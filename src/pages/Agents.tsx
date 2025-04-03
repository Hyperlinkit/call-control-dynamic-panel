
import AgentsList from "@/components/agents/AgentsList";
import { agents } from "@/lib/data";

const Agents = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage call agents and status
        </p>
      </div>
      
      <AgentsList agents={agents} />
    </div>
  );
};

export default Agents;
