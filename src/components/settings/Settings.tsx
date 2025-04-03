
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveIcon, DatabaseIcon, PhoneIcon, BellIcon, KeyIcon } from "lucide-react";
import { toast } from "sonner";

const generalFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  adminEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  supportPhone: z.string().optional(),
  welcomeMessage: z.string().optional(),
});

const databaseFormSchema = z.object({
  host: z.string().min(1, { message: "Host is required" }),
  port: z.string().min(1, { message: "Port is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  database: z.string().min(1, { message: "Database name is required" }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  desktopNotifications: z.boolean(),
  missedCallAlerts: z.boolean(),
  systemUpdates: z.boolean(),
});

// New Twilio settings form schema
const twilioFormSchema = z.object({
  accountSid: z.string().min(1, { message: "Twilio Account SID is required" }),
  authToken: z.string().min(1, { message: "Twilio Auth Token is required" }),
  phoneNumber: z.string().min(1, { message: "Twilio Phone Number is required" }),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;
type DatabaseFormValues = z.infer<typeof databaseFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type TwilioFormValues = z.infer<typeof twilioFormSchema>;

const SettingsComponent = () => {
  const [activeTab, setActiveTab] = useState("general");

  // General Form
  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      companyName: "Call Control Systems",
      adminEmail: "admin@example.com",
      supportPhone: "+1 (555) 123-4567",
      welcomeMessage: "Thank you for calling. Your call is important to us.",
    },
  });

  // Database Form
  const databaseForm = useForm<DatabaseFormValues>({
    resolver: zodResolver(databaseFormSchema),
    defaultValues: {
      host: "localhost",
      port: "3306",
      username: "callsystem",
      password: "••••••••",
      database: "call_control_db",
    },
  });

  // Notifications Form
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      desktopNotifications: true,
      missedCallAlerts: true,
      systemUpdates: true,
    },
  });

  // Twilio Form
  const twilioForm = useForm<TwilioFormValues>({
    resolver: zodResolver(twilioFormSchema),
    defaultValues: {
      accountSid: "",
      authToken: "",
      phoneNumber: "",
    },
  });

  const onGeneralSubmit = (data: GeneralFormValues) => {
    toast.success("General settings saved successfully!");
    console.log("General settings:", data);
  };

  const onDatabaseSubmit = (data: DatabaseFormValues) => {
    toast.success("Database settings saved successfully!");
    console.log("Database settings:", data);
  };

  const onNotificationsSubmit = (data: NotificationsFormValues) => {
    toast.success("Notification preferences saved!");
    console.log("Notification settings:", data);
  };

  const onTwilioSubmit = (data: TwilioFormValues) => {
    // Update Twilio configuration
    localStorage.setItem("twilioConfig", JSON.stringify({
      accountSid: data.accountSid,
      authToken: data.authToken,
      phoneNumber: data.phoneNumber,
    }));
    
    toast.success("Twilio settings saved successfully!");
    console.log("Twilio settings:", data);
  };

  // Check if we have saved Twilio config and load it
  React.useEffect(() => {
    const savedTwilioConfig = localStorage.getItem("twilioConfig");
    if (savedTwilioConfig) {
      try {
        const config = JSON.parse(savedTwilioConfig);
        twilioForm.reset({
          accountSid: config.accountSid,
          authToken: config.authToken,
          phoneNumber: config.phoneNumber,
        });
      } catch (error) {
        console.error("Error loading Twilio config:", error);
      }
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general" className="flex items-center">
              <SaveIcon className="h-4 w-4 mr-2" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center">
              <DatabaseIcon className="h-4 w-4 mr-2" />
              <span>Database</span>
            </TabsTrigger>
            <TabsTrigger value="twilio" className="flex items-center">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>Twilio</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <BellIcon className="h-4 w-4 mr-2" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Form {...generalForm}>
              <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                <FormField
                  control={generalForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={generalForm.control}
                  name="adminEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={generalForm.control}
                  name="supportPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={generalForm.control}
                  name="welcomeMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Message</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full md:w-auto">
                  <SaveIcon className="h-4 w-4 mr-2" /> Save General Settings
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="database">
            <Form {...databaseForm}>
              <form onSubmit={databaseForm.handleSubmit(onDatabaseSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={databaseForm.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database Host</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={databaseForm.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={databaseForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={databaseForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={databaseForm.control}
                  name="database"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Database Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex gap-2">
                  <Button type="submit">
                    <DatabaseIcon className="h-4 w-4 mr-2" /> Save Database Settings
                  </Button>
                  <Button type="button" variant="outline">
                    Test Connection
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          {/* New Twilio Settings Tab */}
          <TabsContent value="twilio">
            <Form {...twilioForm}>
              <form onSubmit={twilioForm.handleSubmit(onTwilioSubmit)} className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2 flex items-center">
                    <KeyIcon className="h-4 w-4 mr-2" />
                    Twilio API Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Enter your Twilio API credentials to enable calling features. 
                    Your credentials are stored securely in your browser and are not sent to our servers.
                  </p>
                </div>
                
                <FormField
                  control={twilioForm.control}
                  name="accountSid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twilio Account SID</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="AC123456789abcdef123456789" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={twilioForm.control}
                  name="authToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twilio Auth Token</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password" 
                          placeholder="Your auth token" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={twilioForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twilio Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="+15551234567" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">
                  <PhoneIcon className="h-4 w-4 mr-2" /> Save Twilio Settings
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Form {...notificationsForm}>
              <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                <FormField
                  control={notificationsForm.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email Notifications</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Receive call summaries and alerts via email
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationsForm.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">SMS Notifications</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Receive call alerts via text message
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationsForm.control}
                  name="desktopNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Desktop Notifications</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Show desktop alerts for incoming calls
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationsForm.control}
                  name="missedCallAlerts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Missed Call Alerts</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Get notified about missed calls
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={notificationsForm.control}
                  name="systemUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">System Updates</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Get notified about system updates and maintenance
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit">
                  <BellIcon className="h-4 w-4 mr-2" /> Save Notification Settings
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsComponent;
