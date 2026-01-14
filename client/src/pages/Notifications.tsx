import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const NOTIFICATIONS = [
  { id: 1, title: "Alice Manager assigned you a task", message: "Design System Updates", time: "2m ago", type: "assignment", icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
  { id: 2, title: "Task Completed", message: "Bob Developer finished 'Backend API Integration'", time: "1h ago", type: "completion", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { id: 3, title: "Project Deadline Approaching", message: "SaaS Platform Redesign due in 2 days", time: "3h ago", type: "alert", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  { id: 4, title: "Workflow Updated", message: "The 'Software Development' workflow was modified", time: "5h ago", type: "info", icon: Info, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function Notifications() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden transition-[margin] duration-300">
        <div className="p-4 md:p-8 max-w-3xl mx-auto w-full overflow-auto">
          <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">Stay updated with your team's activity</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-xs">4 New Alerts</Badge>
          </div>

          <div className="space-y-4 pb-10">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="bg-white p-5 md:p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group flex gap-4 md:gap-5 items-start relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`${n.bg} ${n.color} p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm flex-shrink-0`}>
                  <n.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h3 className="font-bold text-foreground text-base md:text-lg leading-tight">{n.title}</h3>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{n.time}</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 font-medium leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
