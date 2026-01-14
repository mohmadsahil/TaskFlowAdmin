import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useWorkflows, useCreateWorkflow } from "@/hooks/use-workflows";
import { Plus, Trash2, GripVertical, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Workflows() {
  const { data: workflows, isLoading } = useWorkflows();
  const createWorkflow = useCreateWorkflow();
  const { toast } = useToast();
  
  const [isCreating, setIsCreating] = useState(false);
  const [newSteps, setNewSteps] = useState<string[]>(["Backlog", "In Progress", "Review", "Done"]);
  const [workflowName, setWorkflowName] = useState("");

  const handleAddStep = () => {
    setNewSteps([...newSteps, "New Step"]);
  };

  const handleStepChange = (index: number, value: string) => {
    const updated = [...newSteps];
    updated[index] = value;
    setNewSteps(updated);
  };

  const handleRemoveStep = (index: number) => {
    setNewSteps(newSteps.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!workflowName) return;
    try {
      await createWorkflow.mutateAsync({
        name: workflowName,
        description: "Custom workflow",
        steps: newSteps
      });
      setIsCreating(false);
      setWorkflowName("");
      setNewSteps(["Backlog", "In Progress", "Done"]);
      toast({ title: "Workflow created!" });
    } catch (e) {
      toast({ title: "Error creating workflow", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Workflow Builder</h1>
            <p className="text-muted-foreground mt-1">Design custom processes for your teams.</p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {workflows?.map((workflow) => (
              <Card key={workflow.id} className="p-6 border-none shadow-md hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">{workflow.name}</h3>
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {(workflow.steps as string[]).length} Steps
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {(workflow.steps as string[]).map((step, i) => (
                    <div key={i} className="flex items-center">
                      <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium border border-border">
                        {step}
                      </span>
                      {i < (workflow.steps as string[]).length - 1 && (
                        <div className="w-4 h-px bg-border mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <AnimatePresence>
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-2xl border border-border/50 shadow-xl sticky top-8"
              >
                <h3 className="text-xl font-bold mb-6">Create New Workflow</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Workflow Name</label>
                    <Input 
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                      placeholder="e.g. Software Development Cycle" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Steps (In Order)</label>
                    <div className="space-y-2">
                      {newSteps.map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                          <Input 
                            value={step}
                            onChange={(e) => handleStepChange(i, e.target.value)}
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveStep(i)}
                            className="text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={handleAddStep} className="w-full mt-2 border-dashed">
                      <Plus className="w-3 h-3 mr-2" /> Add Step
                    </Button>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                    <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={createWorkflow.isPending}>
                      {createWorkflow.isPending ? "Saving..." : "Save Workflow"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
