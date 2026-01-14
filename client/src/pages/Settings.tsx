import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, User, Palette } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-72 transition-[margin] duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full overflow-auto">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">Manage your account and preferences.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 scrollbar-none">
              {[
                { label: "Profile", icon: User, active: true },
                { label: "Notifications", icon: Bell },
                { label: "Security", icon: Shield },
                { label: "Appearance", icon: Palette },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all whitespace-nowrap ${
                    item.active 
                      ? "bg-white shadow-md font-bold text-primary border border-border/30" 
                      : "text-muted-foreground hover:bg-white/50 hover:text-foreground font-medium"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>

            <Card className="col-span-1 lg:col-span-2 p-6 md:p-8 border-border/50 shadow-sm rounded-3xl bg-white">
              <h3 className="text-xl font-bold mb-8 text-foreground">Profile Details</h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-10 border-b border-border/30 text-center sm:text-left">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-secondary shadow-xl">
                  <AvatarImage src="https://i.pravatar.cc/150?u=alice" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">AM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="default" className="rounded-xl px-6 font-bold h-11 shadow-sm">Change Avatar</Button>
                  <Button variant="ghost" className="text-red-500 hover:bg-red-50 rounded-xl px-6 font-bold h-11">Remove</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
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
                <h4 className="font-bold text-lg text-foreground">Notifications</h4>
                <div className="space-y-4">
                  {[
                    { title: "Task Assignments", desc: "Receive alerts when assigned new work.", checked: true },
                    { title: "Deadline Reminders", desc: "Alerts before task due dates.", checked: true },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30">
                      <div className="pr-4">
                        <p className="font-bold text-sm text-foreground">{item.title}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 font-medium">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-10 mt-10 border-t border-border/30">
                <Button className="w-full sm:w-auto rounded-xl px-10 h-12 text-base font-bold shadow-lg shadow-primary/20">Save Changes</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
