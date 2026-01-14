import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
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
      <main className="flex-1 ml-64 min-h-screen bg-secondary/10 overflow-auto">
        <Header />
        <div className="p-8 max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1 font-medium">Manage your account and preferences.</p>
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    item.active 
                      ? "bg-white shadow-md font-bold text-primary border border-border/30" 
                      : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>

            <Card className="col-span-2 p-8 border-border/50 shadow-sm rounded-3xl bg-white">
              <h3 className="text-xl font-bold mb-8">Profile Details</h3>
              
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-border/30">
                <Avatar className="w-24 h-24 border-4 border-secondary shadow-xl">
                  <AvatarImage src="https://i.pravatar.cc/150?u=alice" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">AM</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="default" className="rounded-xl px-6">Change Avatar</Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-red-500 hover:bg-red-50 rounded-xl px-6">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Full Name</label>
                  <Input defaultValue="Alice Manager" className="rounded-xl border-border/50 h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Email Address</label>
                  <Input defaultValue="alice@taskflow.com" className="rounded-xl border-border/50 h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Job Title</label>
                  <Input defaultValue="Senior Project Manager" className="rounded-xl border-border/50 h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Department</label>
                  <Input defaultValue="Product Operations" className="rounded-xl border-border/50 h-11" />
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-border/30">
                <h4 className="font-bold text-lg">Notifications</h4>
                <div className="space-y-5">
                  {[
                    { title: "Task Assignments", desc: "Receive alerts when you're assigned new work.", checked: true },
                    { title: "Deadline Reminders", desc: "Get notified before task due dates.", checked: true },
                    { title: "Project Activity", desc: "Weekly summary of project progress.", checked: false },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30">
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-10 mt-10 border-t border-border/30">
                <Button className="rounded-xl px-10 h-12 text-base font-bold shadow-lg shadow-primary/20">Save Changes</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
