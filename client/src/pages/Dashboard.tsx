import { Header } from "@/components/Header";
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
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">Welcome back, Alice Manager!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden group">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-2 text-foreground">{stat.value}</h3>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 md:p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card className="border-border/50 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-6 border-b border-border/30">
            <CardTitle className="text-base md:text-lg font-bold">Task Velocity</CardTitle>
            <BarChartIcon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6 overflow-hidden">
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    cursor={{fill: '#f3f4f6'}}
                  />
                  <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-6 border-b border-border/30">
            <CardTitle className="text-base md:text-lg font-bold">Activity Pulse</CardTitle>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6 overflow-hidden">
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                  <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
