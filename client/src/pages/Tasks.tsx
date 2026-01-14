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
    <div className="p-4 md:p-8 flex flex-col h-full overflow-hidden">
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tasks</h1>
            <p className="text-sm md:text-base text-muted-foreground font-medium">Track and manage your individual tasks</p>
          </div>
          <CreateTaskModal 
            trigger={
              <Button className="w-full sm:w-auto rounded-xl gap-2 h-11 px-6 font-bold shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" /> Create Task
              </Button>
            }
            onSuccess={(newTask) => {
              setTasks(prev => [...prev, { ...newTask, id: prev.length + 1 }]);
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch bg-white p-3 rounded-2xl border border-border/50 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary/30 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 sm:flex-none rounded-xl gap-2 font-bold h-10 border-border/50">
                  <Filter className="w-4 h-4" /> {filter === "All" ? "All Priorities" : filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl">
                {["All", "High", "Medium", "Low"].map(p => (
                  <DropdownMenuItem key={p} onClick={() => setFilter(p)} className="rounded-lg">{p}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
          <div className="flex gap-4 md:gap-6 h-full min-w-max pb-4">
            {COLUMNS.map((step) => {
              const columnTasks = filteredTasks.filter(t => t.status === step);
              
              return (
                <div 
                  key={step} 
                  className="w-72 md:w-80 flex flex-col h-full bg-white/50 rounded-3xl border border-border/50 shadow-sm overflow-hidden"
                  onDrop={(e) => handleDrop(e, step)}
                  onDragOver={handleDragOver}
                >
                  <div className="p-4 md:p-5 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-border/30">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        step === 'Todo' ? 'bg-slate-400' : 
                        step === 'In Progress' ? 'bg-blue-400' : 
                        step === 'Review' ? 'bg-orange-400' : 'bg-green-400'
                      }`} />
                      <span className="font-bold text-xs md:text-sm uppercase tracking-wider">{step}</span>
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 px-2 py-0">
                        {columnTasks.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 custom-scrollbar">
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
                      <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-2xl bg-white/20">
                        <span className="text-xs text-muted-foreground font-medium">Empty</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl md:rounded-3xl border border-border/50 shadow-sm overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow className="border-b border-border/50">
                  <TableHead className="font-bold uppercase tracking-wider text-[10px] py-4 px-4 md:px-6">Task</TableHead>
                  <TableHead className="font-bold uppercase tracking-wider text-[10px]">Status</TableHead>
                  <TableHead className="font-bold uppercase tracking-wider text-[10px] hidden sm:table-cell">Priority</TableHead>
                  <TableHead className="font-bold uppercase tracking-wider text-[10px] text-right px-4 md:px-6">Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-primary/5 transition-colors border-b border-border/30">
                    <TableCell className="py-4 px-4 md:px-6 font-bold text-foreground max-w-[200px] truncate">{task.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold text-[10px] uppercase">{task.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={task.priority === "High" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-4 md:px-6 text-xs font-bold text-muted-foreground">{task.dueDate}</TableCell>
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
