
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { dbService } from "@/services/dbService";
import { twilioService } from "@/services/twilioService";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

interface MakeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MakeCallModal: React.FC<MakeCallModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Phone number is required",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setCallStatus("connecting");
    
    try {
      // Initiate call with Twilio
      const callResult = await twilioService.initiateCall(phoneNumber, notes);
      
      if (callResult.success) {
        // Save the call in our database
        await dbService.makeCall(phoneNumber, notes);
        
        toast({
          title: "Call Initiated",
          description: `Call to ${phoneNumber} has been initiated successfully.`,
        });
        
        // Set call as connected
        setCallStatus("connected");
        
        // Optional: Poll for call status updates
        // In a real app, you might use WebSockets for this instead
        const statusInterval = setInterval(async () => {
          if (callResult.sid) {
            const statusResult = await twilioService.getCallStatus(callResult.sid);
            if (statusResult.status === 'completed') {
              clearInterval(statusInterval);
              setCallStatus("completed");
              setTimeout(() => {
                setPhoneNumber("");
                setNotes("");
                setCallStatus(null);
                onClose();
              }, 2000);
            }
          }
        }, 5000);
        
        // Clear interval after 2 minutes to prevent indefinite polling
        setTimeout(() => {
          clearInterval(statusInterval);
        }, 120000);
      } else {
        throw new Error("Failed to initiate call");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call. Please try again.",
        variant: "destructive",
      });
      setCallStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCallStatus = () => {
    if (!callStatus) return null;
    
    let statusColor = "bg-primary";
    let statusText = "Initiating Call...";
    
    if (callStatus === "connected") {
      statusColor = "bg-success";
      statusText = "Call Connected";
    } else if (callStatus === "completed") {
      statusColor = "secondary";
      statusText = "Call Completed";
    }
    
    return (
      <div className="mt-4 flex justify-center">
        <Badge variant="outline" className={`${statusColor} text-primary-foreground`}>
          <Phone className="h-3 w-3 mr-1" />
          {statusText}
        </Badge>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make a Call</DialogTitle>
          <DialogDescription>
            Enter the phone number and any notes for this call.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this call..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          {renderCallStatus()}
          
          <DialogFooter className="sm:justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              disabled={isLoading || callStatus === "connected"}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || callStatus === "connected"}
            >
              {isLoading ? "Initiating..." : "Make Call"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MakeCallModal;
