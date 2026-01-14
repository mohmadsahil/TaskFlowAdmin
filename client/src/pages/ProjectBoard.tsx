import { Sidebar } from "@/components/Sidebar";
import { useProject } from "@/hooks/use-projects";
import { useTasks, useUpdateTask } from "@/hooks/use-tasks";
import { useWorkflows } from "@/hooks/use-workflows";
import { useRoute } from "wouter";
import { TaskCard } from "@/components/TaskCard";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectBoard() {
  const [, params] = useRoute("/projects/:id/board");
  const projectId = Number(params?.id);
  
  const { data: project } = useProject(projectId);
  const { data: tasks } = useTasks(projectId);
  const { data: workflows } = useWorkflows();
  const updateTask = useUpdateTask();

  const workflow = workflows?.find(w => w.id === project?.workflowId) || { steps: ["To Do", "In Progress", "Done"] };
  const steps = workflow.steps as string[];

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDrop = async (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId"));
    if (taskId) {
      await updateTask.mutateAsync({ id: taskId, status });
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen">
        <header className="px-8 py-6 border-b border-border/50 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Workflow: {workflow.name || "Default"}</p>
            <CreateTaskDialog projectId={projectId} />
          </div>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
          <div className="flex gap-6 h-full min-w-max">
            {steps.map((step) => {
              const columnTasks = tasks?.filter(t => t.status === step) || [];
              
              return (
                <div 
                  key={step} 
                  className="w-80 flex flex-col h-full bg-secondary/30 rounded-2xl border border-border/50"
                  onDrop={(e) => handleDrop(e, step)}
                  onDragOver={handleDragOver}
                >
                  <div className="p-4 flex justify-between items-center sticky top-0 bg-secondary/30 backdrop-blur-sm rounded-t-2xl z-10">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm uppercase tracking-wider">{step}</span>
                      <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-medium text-muted-foreground">
                        {columnTasks.length}
                      </span>
                    </div>
                    <CreateTaskDialog 
                      projectId={projectId} 
                      defaultStatus={step}
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/50">
                          <Plus className="w-4 h-4" />
                        </Button>
                      }
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                    <AnimatePresence>
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                        >
                          <TaskCard task={task} />
                        </div>
                      ))}
                    </AnimatePresence>
                    {columnTasks.length === 0 && (
                      <div className="h-24 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl">
                        <span className="text-xs text-muted-foreground">Drop tasks here</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
