import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  LayoutGrid, 
  List, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Static Data
const STATIC_TASKS = [
  { id: 1, title: "Design System Updates", status: "In Progress", priority: "High", dueDate: "2026-01-20", category: "Design" },
  { id: 2, title: "Backend API Integration", status: "Todo", priority: "Medium", dueDate: "2026-01-22", category: "Dev" },
  { id: 3, title: "Unit Testing", status: "Review", priority: "Low", dueDate: "2026-01-25", category: "QA" },
  { id: 4, title: "User Authentication", status: "Done", priority: "High", dueDate: "2026-01-21", category: "Dev" },
  { id: 5, title: "Mobile UI Mockups", status: "In Progress", priority: "Medium", dueDate: "2026-01-28", category: "Design" },
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
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-secondary/10 flex flex-col">
        <Header />
        
        <div className="p-8 flex-1 flex flex-col">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                <p className="text-muted-foreground mt-1 font-medium">Track and manage your individual tasks</p>
              </div>
              <Button className="rounded-xl gap-2 h-11 px-6 font-bold shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" /> Create Task
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-3 rounded-2xl border border-border/50 shadow-sm">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-secondary/30 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-xl gap-2 font-bold h-10 border-border/50">
                      <Filter className="w-4 h-4" /> Priority: {filter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl">
                    {["All", "High", "Medium", "Low"].map(p => (
                      <DropdownMenuItem key={p} onClick={() => setFilter(p)} className="rounded-lg">{p}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-8 w-px bg-border/50 mx-1 hidden md:block" />

                <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50">
                  <Button 
                    variant={view === "board" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-lg gap-2 px-3 h-8 font-bold"
                    onClick={() => setView("board")}
                  >
                    <LayoutGrid className="w-4 h-4" /> Board
                  </Button>
                  <Button 
                    variant={view === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className="rounded-lg gap-2 px-3 h-8 font-bold"
                    onClick={() => setView("list")}
                  >
                    <List className="w-4 h-4" /> List
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto min-h-0">
            {view === "board" ? (
              <div className="flex gap-6 h-full min-w-max pb-4">
                {COLUMNS.map((step) => {
                  const columnTasks = filteredTasks.filter(t => t.status === step);
                  
                  return (
                    <div 
                      key={step} 
                      className="w-80 flex flex-col h-full bg-white/50 rounded-3xl border border-border/50 shadow-sm overflow-hidden"
                      onDrop={(e) => handleDrop(e, step)}
                      onDragOver={handleDragOver}
                    >
                      <div className="p-5 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-border/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            step === 'Todo' ? 'bg-slate-400' : 
                            step === 'In Progress' ? 'bg-blue-400' : 
                            step === 'Review' ? 'bg-orange-400' : 'bg-green-400'
                          }`} />
                          <span className="font-bold text-sm uppercase tracking-wider">{step}</span>
                          <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 px-2 py-0">
                            {columnTasks.length}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 rounded-lg">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
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
                          <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-2xl bg-white/20">
                            <Clock className="w-8 h-8 text-muted-foreground/30 mb-2" />
                            <span className="text-xs text-muted-foreground font-medium">No tasks here</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-secondary/20">
                    <TableRow className="border-b border-border/50">
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] py-5 px-6">Task Details</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px]">Status</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px]">Priority</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px]">Category</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px]">Due Date</TableHead>
                      <TableHead className="font-bold uppercase tracking-wider text-[10px] text-right px-6">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow key={task.id} className="hover:bg-primary/5 transition-colors border-b border-border/30">
                        <TableCell className="py-5 px-6 font-bold text-foreground">{task.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`font-bold px-3 py-1 rounded-lg ${
                            task.status === 'Done' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-secondary text-foreground border-border/50'
                          }`}>
                            {task.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`border font-bold px-3 py-1 rounded-lg ${
                            task.priority === "High" ? "bg-red-50 text-red-700 border-red-200" :
                            task.priority === "Medium" ? "bg-orange-50 text-orange-700 border-orange-200" :
                            "bg-green-50 text-green-700 border-green-200"
                          }`}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-muted-foreground">{task.category}</TableCell>
                        <TableCell className="text-sm font-medium text-muted-foreground">{task.dueDate}</TableCell>
                        <TableCell className="text-right px-6">
                          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-primary/5 rounded-xl">
                            <Plus className="w-5 h-5 rotate-45" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
