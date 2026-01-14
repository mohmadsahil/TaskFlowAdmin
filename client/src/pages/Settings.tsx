import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, User, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            {[
              { label: "Profile", icon: User, active: true },
              { label: "Notifications", icon: Bell },
              { label: "Security", icon: Shield },
              { label: "Appearance", icon: Palette },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active 
                    ? "bg-white shadow-sm font-medium text-primary border border-border/50" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          <Card className="col-span-2 p-8 border-none shadow-lg shadow-purple-900/5 bg-white/80 backdrop-blur">
            <h3 className="text-xl font-bold mb-6">Profile Details</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="mr-2">Change Avatar</Button>
                <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="Jane Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="jane@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input defaultValue="Senior Developer" disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input defaultValue="Engineering" />
              </div>
            </div>

            <div className="border-t border-border/50 pt-6">
              <h4 className="font-semibold mb-4">Email Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Task Assignments</p>
                    <p className="text-xs text-muted-foreground">Get notified when you are assigned a new task</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Project Updates</p>
                    <p className="text-xs text-muted-foreground">Receive weekly digest of project activity</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-8 mt-6 border-t border-border/50">
              <Button className="bg-primary shadow-lg shadow-primary/25">Save Changes</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
