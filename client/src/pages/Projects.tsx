import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Folder, MoreVertical, Calendar } from "lucide-react";

// Static Data
const PROJECTS = [
  { id: 1, name: "SaaS Platform Redesign", description: "Complete overhaul of the user interface and experience.", tasks: 12, status: "Active", dueDate: "2026-03-15" },
  { id: 2, name: "Mobile App Development", description: "Building a React Native companion app for the dashboard.", tasks: 8, status: "Pending", dueDate: "2026-04-20" },
  { id: 3, name: "Marketing Campaign", description: "Q1 product launch and lead generation strategy.", tasks: 5, status: "Completed", dueDate: "2026-02-10" },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-secondary/10 overflow-auto">
        <Header />
        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-1 font-medium">Manage and track your team's workspace</p>
            </div>
            <Button className="rounded-xl">Create Project</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}/board`}>
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-2xl cursor-pointer group bg-white overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-primary/5 rounded-xl text-primary">
                        <Folder className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
                        project.status === 'Active' ? 'bg-green-50 text-green-700' : 
                        project.status === 'Pending' ? 'bg-orange-50 text-orange-700' : 
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{project.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{project.dueDate}</span>
                      </div>
                      <Badge variant="secondary" className="bg-secondary text-foreground">{project.tasks} Tasks</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
