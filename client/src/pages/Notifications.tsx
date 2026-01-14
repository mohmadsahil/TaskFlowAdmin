import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NOTIFICATIONS = [
  { id: 1, title: "Alice Manager assigned you a task", message: "Design System Updates", time: "2m ago", type: "assignment", icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
  { id: 2, title: "Task Completed", message: "Bob Developer finished 'Backend API Integration'", time: "1h ago", type: "completion", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { id: 3, title: "Project Deadline Approaching", message: "SaaS Platform Redesign due in 2 days", time: "3h ago", type: "alert", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  { id: 4, title: "Workflow Updated", message: "The 'Software Development' workflow was modified", time: "5h ago", type: "info", icon: Info, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function Notifications() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-secondary/10 overflow-auto">
        <Header />
        <div className="p-8 max-w-3xl mx-auto">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
              <p className="text-muted-foreground mt-1 font-medium">Stay updated with your team's activity</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full">4 New Alerts</Badge>
          </div>

          <div className="space-y-4">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="bg-white p-6 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer group flex gap-5 items-start relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`${n.bg} ${n.color} p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                  <n.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-foreground text-lg">{n.title}</h3>
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 font-medium leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
