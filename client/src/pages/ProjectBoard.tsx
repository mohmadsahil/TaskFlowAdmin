import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, LayoutGrid, List } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

// Static Data
const STATIC_PROJECT = {
  id: 1,
  name: "SaaS Platform Redesign",
  workflowId: 1
};

const STATIC_TASKS = [
  { id: 1, title: "Design System Updates", status: "Manager", priority: "High", dueDate: "2026-01-20" },
  { id: 2, title: "Backend API Integration", status: "Developer", priority: "Medium", dueDate: "2026-01-22" },
  { id: 3, title: "Unit Testing", status: "Tester", priority: "Low", dueDate: "2026-01-25" },
  { id: 4, title: "User Authentication", status: "Developer", priority: "High", dueDate: "2026-01-21" },
];

const STATIC_WORKFLOW = {
  id: 1,
  name: "Software Dev",
  steps: ["Manager", "Developer", "Tester", "Deployed"]
};

export default function ProjectBoard() {
  const [view, setView] = useState<"board" | "list">("board");
  const [tasks, setTasks] = useState(STATIC_TASKS);

  const steps = STATIC_WORKFLOW.steps;

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
    <div className="min-h-screen bg-background flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <header className="px-8 py-6 border-b border-border/50 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{STATIC_PROJECT.name}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Workflow: {STATIC_WORKFLOW.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-secondary/50 p-1 rounded-xl border border-border/50">
              <Button 
                variant={view === "board" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-lg gap-2 px-3"
                onClick={() => setView("board")}
              >
                <LayoutGrid className="w-4 h-4" />
                Board
              </Button>
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-lg gap-2 px-3"
                onClick={() => setView("list")}
              >
                <List className="w-4 h-4" />
                List
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
              <Plus className="w-4 h-4" /> New Task
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-secondary/10">
          {view === "board" ? (
            <div className="flex gap-6 h-full min-w-max">
              {steps.map((step) => {
                const columnTasks = tasks.filter(t => t.status === step);
                
                return (
                  <div 
                    key={step} 
                    className="w-80 flex flex-col h-full bg-white/50 rounded-2xl border border-border/50 shadow-sm"
                    onDrop={(e) => handleDrop(e, step)}
                    onDragOver={handleDragOver}
                  >
                    <div className="p-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-sm rounded-t-2xl z-10 border-b border-border/30">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm uppercase tracking-wider">{step}</span>
                        <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                          {columnTasks.length}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
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
                        <div className="h-24 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-white/30">
                          <span className="text-xs text-muted-foreground">Drop tasks here</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/20">
                  <TableRow>
                    <TableHead className="font-semibold uppercase tracking-wider text-[10px] py-4">Task Name</TableHead>
                    <TableHead className="font-semibold uppercase tracking-wider text-[10px]">Status</TableHead>
                    <TableHead className="font-semibold uppercase tracking-wider text-[10px]">Priority</TableHead>
                    <TableHead className="font-semibold uppercase tracking-wider text-[10px]">Assignee</TableHead>
                    <TableHead className="font-semibold uppercase tracking-wider text-[10px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell className="font-medium py-4">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary text-foreground border-border/50">
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border ${
                          task.priority === "High" ? "bg-red-50 text-red-700 border-red-200" :
                          task.priority === "Medium" ? "bg-orange-50 text-orange-700 border-orange-200" :
                          "bg-green-50 text-green-700 border-green-200"
                        }`}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6 border border-border/50">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">AM</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground font-medium">Alice M.</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 rounded-lg">
                          <Plus className="w-4 h-4 rotate-45" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
