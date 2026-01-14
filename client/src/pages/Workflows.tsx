import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";

const STATIC_WORKFLOWS = [
  { id: 1, name: "Software Development", steps: ["Backlog", "In Progress", "Review", "Done"] },
  { id: 2, name: "Marketing Content", steps: ["Idea", "Drafting", "Design", "Published"] },
];

export default function Workflows() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden transition-[margin] duration-300">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full overflow-auto">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Workflow Builder</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">Design custom processes for your teams.</p>
            </div>
            <Button className="w-full sm:w-auto rounded-xl font-bold h-11 px-6 shadow-lg shadow-primary/20">New Workflow</Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6">
              {STATIC_WORKFLOWS.map((workflow) => (
                <Card key={workflow.id} className="p-6 border-border/50 shadow-sm hover:shadow-md transition-all rounded-2xl bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">{workflow.name}</h3>
                    <span className="text-[10px] font-bold bg-primary/5 text-primary px-2 py-1 rounded-lg uppercase tracking-wider">
                      {workflow.steps.length} Steps
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {workflow.steps.map((step, i) => (
                      <div key={i} className="flex items-center">
                        <span className="px-3 py-1 bg-secondary text-foreground rounded-full text-xs font-bold border border-border/50">
                          {step}
                        </span>
                        {i < workflow.steps.length - 1 && (
                          <div className="w-3 md:w-4 h-px bg-border/50 mx-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 md:p-8 border-border/50 shadow-sm rounded-3xl bg-white/80 backdrop-blur">
              <h3 className="text-xl font-bold mb-6">Create New Workflow</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Workflow Name</label>
                  <Input placeholder="e.g. Design Lifecycle" className="rounded-xl border-border/50 h-11" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold">Steps (In Order)</label>
                  <div className="space-y-2">
                    {["To Do", "In Progress", "Done"].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <Input value={step} readOnly className="rounded-xl border-border/50 h-11" />
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-dashed rounded-xl mt-4 font-bold h-11">
                    <Plus className="w-4 h-4 mr-2" /> Add Step
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border/30">
                  <Button variant="ghost" className="rounded-xl font-bold h-11">Cancel</Button>
                  <Button className="rounded-xl px-8 font-bold h-11">Save Workflow</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
