import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useProjects } from "@/hooks/use-projects";
import { useTasks } from "@/hooks/use-tasks";
import { format } from "date-fns";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from "framer-motion";

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

export default function Dashboard() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: tasks, isLoading: tasksLoading } = useTasks();

  const stats = [
    { label: "Total Projects", value: projects?.length || 0, icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Tasks", value: tasks?.filter(t => t.status !== "Done").length || 0, icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Completed", value: tasks?.filter(t => t.status === "Done").length || 0, icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
    { label: "Overdue", value: 2, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  const pieData = [
    { name: 'To Do', value: 4 },
    { name: 'In Progress', value: 3 },
    { name: 'Review', value: 2 },
    { name: 'Done', value: 5 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-secondary/5 overflow-auto">
        <Header />
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 border-none shadow-lg shadow-purple-900/5 hover:shadow-xl transition-shadow bg-white/80 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-2 p-6 border-none shadow-lg shadow-purple-900/5">
              <h3 className="font-semibold text-lg mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Sarah Jenkins</span> moved task{" "}
                        <span className="font-medium text-primary">"Update Authentication"</span> to{" "}
                        <span className="bg-secondary px-2 py-0.5 rounded text-xs font-medium">In Review</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-none shadow-lg shadow-purple-900/5 flex flex-col items-center justify-center">
              <h3 className="font-semibold text-lg mb-4 self-start w-full">Task Distribution</h3>
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-4 flex-wrap justify-center">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
