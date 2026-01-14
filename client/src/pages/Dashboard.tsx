import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  BarChart as BarChartIcon
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Header } from "@/components/Header";

// Static Data
const STATS = [
  { label: "Total Projects", value: 12, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Tasks", value: 48, icon: Clock, color: "text-primary", bg: "bg-primary/5" },
  { label: "Completed", value: 156, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { label: "High Priority", value: 7, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
];

const CHART_DATA = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 5 },
  { name: "Thu", tasks: 8 },
  { name: "Fri", tasks: 12 },
  { name: "Sat", tasks: 6 },
  { name: "Sun", tasks: 3 },
];

export default function Dashboard() {
  return (
    <div className="p-3 md:p-5 max-w-7xl mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-[11px] md:text-xs text-muted-foreground font-medium">Overview of your team's current productivity.</p>
        </div>
        <div className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md self-start">
          Updated: Today, 10:30 AM
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-border/40 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden group">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{stat.label}</p>
                  <h3 className="text-lg md:text-xl font-black mt-1.5 text-foreground leading-none">{stat.value}</h3>
                </div>
                <div className={`${stat.bg} ${stat.color} p-2 md:p-2.5 rounded-lg group-hover:scale-105 transition-transform`}>
                  <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-4 border-b border-border/20 px-4 py-3">
            <CardTitle className="text-xs md:text-sm font-bold">Task Velocity</CardTitle>
            <BarChartIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4 overflow-hidden px-2">
            <div className="h-[180px] md:h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 9}} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 9}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    cursor={{fill: '#f9fafb'}}
                  />
                  <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-4 border-b border-border/20 px-4 py-3">
            <CardTitle className="text-xs md:text-sm font-bold">Activity Pulse</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4 overflow-hidden px-2">
            <div className="h-[180px] md:h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 9}} dy={5} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 9}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-border/40 shadow-sm rounded-xl overflow-hidden">
         <CardHeader className="bg-secondary/10 px-4 py-3 border-b border-border/20">
            <CardTitle className="text-xs md:text-sm font-bold">Recent Projects</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <div className="divide-y divide-border/20">
               {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/5 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                           <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                           <p className="text-xs font-bold">Project Initiative {i}</p>
                           <p className="text-[10px] text-muted-foreground">Updated 2h ago</p>
                        </div>
                     </div>
                     <Badge variant="outline" className="text-[9px] font-bold h-4">Active</Badge>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
