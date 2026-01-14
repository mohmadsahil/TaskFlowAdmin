import { cn } from "@/lib/utils";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { CreateTaskModal } from "@/components/CreateTaskModal";
import { 
  Plus, 
  LayoutGrid, 
  List, 
  Search, 
  Filter,
  Clock
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Static Data
const STATIC_TASKS = [
  { id: 1, title: "Design System Updates", status: "In Progress", priority: "High", dueDate: "2026-01-20", category: "Design", description: "Review and update all component tokens for accessibility." },
  { id: 2, title: "Backend API Integration", status: "Todo", priority: "Medium", dueDate: "2026-01-22", category: "Dev", description: "Connect frontend authentication flows to the new REST endpoints." },
  { id: 3, title: "Unit Testing", status: "Review", priority: "Low", dueDate: "2026-01-25", category: "QA", description: "Achieve 80% coverage for the core business logic." },
  { id: 4, title: "User Authentication", status: "Done", priority: "High", dueDate: "2026-01-21", category: "Dev", description: "Implement secure login with JWT and refresh tokens." },
  { id: 5, title: "Mobile UI Mockups", status: "In Progress", priority: "Medium", dueDate: "2026-01-28", category: "Design", description: "Create high-fidelity wireframes for the mobile dashboard view." },
  { id: 6, title: "Performance Audit", status: "Todo", priority: "High", dueDate: "2026-02-05", category: "QA", description: "Identify bottlenecks in the dashboard data loading." },
];

const COLUMNS = ["Todo", "In Progress", "Review", "Done"];

export default function Tasks() {
  const [view, setView] = useState<"board" | "list">("board");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(STATIC_TASKS);

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || t.priority === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId"));
    if (taskId) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="p-3 md:p-5 flex flex-col h-full overflow-hidden">
      <header className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Tasks</h1>
            <p className="text-[11px] md:text-xs text-muted-foreground font-medium">Manage and monitor team workload efficiently.</p>
          </div>
          <CreateTaskModal 
            trigger={
              <Button className="w-full sm:w-auto rounded-lg gap-1.5 h-9 px-4 text-xs font-bold shadow-sm">
                <Plus className="w-4 h-4" /> New Task
              </Button>
            }
            onSuccess={(newTask) => {
              setTasks(prev => [...prev, { ...newTask, id: prev.length + 1 }]);
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-2 justify-between items-stretch bg-white p-2 rounded-xl border border-border/40 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary/20 border-none rounded-lg py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none rounded-lg gap-1.5 font-bold h-8 text-[11px] border-border/40 px-3">
                  <Filter className="w-3.5 h-3.5" /> {filter === "All" ? "Priority" : filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-lg">
                {["All", "High", "Medium", "Low"].map(p => (
                  <DropdownMenuItem key={p} onClick={() => setFilter(p)} className="text-xs rounded-md">{p}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex bg-secondary/30 p-0.5 rounded-lg border border-border/30">
              <Button 
                variant={view === "board" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-md gap-1.5 px-2.5 h-7 text-[10px] font-bold"
                onClick={() => setView("board")}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Board
              </Button>
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-md gap-1.5 px-2.5 h-7 text-[10px] font-bold"
                onClick={() => setView("list")}
              >
                <List className="w-3.5 h-3.5" /> List
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto min-h-0">
        {view === "board" ? (
          <div className="flex gap-3 md:gap-4 h-full min-w-max pb-3">
            {COLUMNS.map((step) => {
              const columnTasks = filteredTasks.filter(t => t.status === step);
              
              return (
                <div 
                  key={step} 
                  className="w-64 md:w-72 flex flex-col h-full bg-white/40 rounded-xl border border-border/40 shadow-sm overflow-hidden"
                  onDrop={(e) => handleDrop(e, step)}
                  onDragOver={handleDragOver}
                >
                  <div className="p-3.5 flex justify-between items-center bg-white/70 backdrop-blur-sm border-b border-border/20">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        step === 'Todo' ? 'bg-slate-400' : 
                        step === 'In Progress' ? 'bg-blue-400' : 
                        step === 'Review' ? 'bg-orange-400' : 'bg-green-400'
                      }`} />
                      <span className="font-bold text-[10px] uppercase tracking-widest">{step}</span>
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 px-1.5 h-4 text-[9px]">
                        {columnTasks.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 custom-scrollbar">
                    <AnimatePresence>
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                        >
                          <TaskCard task={task as any} />
                        </div>
                      ))}
                    </AnimatePresence>
                    {columnTasks.length === 0 && (
                      <div className="h-20 flex flex-col items-center justify-center border border-dashed border-border/20 rounded-lg bg-white/10">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">No items</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/10">
                <TableRow className="border-b border-border/20">
                  <TableHead className="font-bold uppercase tracking-widest text-[9px] py-3 px-4">Task Details</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[9px]">Status</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[9px] hidden sm:table-cell">Priority</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[9px] hidden md:table-cell">Category</TableHead>
                  <TableHead className="font-bold uppercase tracking-widest text-[9px] text-right px-4">Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-primary/5 transition-colors border-b border-border/10">
                    <TableCell className="py-3 px-4 font-bold text-foreground text-[11px] max-w-[250px] truncate">{task.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold text-[9px] uppercase h-4 px-1.5">{task.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={cn("text-[9px] font-bold h-4 px-1.5", task.priority === "High" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700")}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-[10px] font-bold text-muted-foreground">{task.category}</TableCell>
                    <TableCell className="text-right px-4 text-[10px] font-bold text-muted-foreground whitespace-nowrap">{task.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
