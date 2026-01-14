import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { Link } from "wouter";
import { 
  Folder, 
  MoreVertical, 
  Calendar, 
  Search, 
  Filter, 
  LayoutGrid, 
  List 
} from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Static Data
const PROJECTS = [
  { id: 1, name: "SaaS Platform Redesign", description: "Complete overhaul of the user interface and experience.", tasks: 12, status: "Active", dueDate: "2026-03-15", category: "Design" },
  { id: 2, name: "Mobile App Development", description: "Building a React Native companion app for the dashboard.", tasks: 8, status: "Pending", dueDate: "2026-04-20", category: "Dev" },
  { id: 3, name: "Marketing Campaign", description: "Q1 product launch and lead generation strategy.", tasks: 5, status: "Completed", dueDate: "2026-02-10", category: "Marketing" },
];

export default function Projects() {
  const [view, setView] = useState<"card" | "list">("card");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-sm md:text-base text-muted-foreground font-medium">Manage and track your team's workspace</p>
        </div>
        <CreateProjectModal 
          trigger={<Button className="w-full sm:w-auto rounded-xl h-11 px-6 font-bold shadow-lg shadow-primary/20">Create Project</Button>}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch bg-white p-3 rounded-2xl border border-border/50 shadow-sm mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary/30 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-xl gap-2 font-bold h-10 border-border/50">
            <Filter className="w-4 h-4" /> Filter
          </Button>

          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50">
            <Button 
              variant={view === "card" ? "default" : "ghost"} 
              size="sm" 
              className="rounded-lg gap-2 px-3 h-8 font-bold"
              onClick={() => setView("card")}
            >
              <LayoutGrid className="w-4 h-4" /> Card
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

      {view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}/board`}>
              <Card className="border-border/50 shadow-sm hover:shadow-xl transition-all rounded-3xl cursor-pointer group bg-white overflow-hidden border-2 hover:border-primary/20">
                <CardContent className="p-5 md:p-7">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-primary/5 rounded-2xl text-primary shadow-inner">
                      <Folder className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="font-bold text-[10px] uppercase px-3 py-1">{project.status}</Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{project.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-medium leading-relaxed">{project.description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border/30">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <Calendar className="w-4 h-4" />
                      <span>{project.dueDate}</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">{project.tasks} Tasks</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl md:rounded-3xl border border-border/50 shadow-sm overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/20">
              <TableRow className="border-b border-border/50">
                <TableHead className="font-bold py-4 px-6 text-foreground uppercase tracking-widest text-[10px]">Name</TableHead>
                <TableHead className="font-bold text-foreground uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="font-bold text-foreground uppercase tracking-widest text-[10px] hidden sm:table-cell">Tasks</TableHead>
                <TableHead className="font-bold text-right px-6 text-foreground uppercase tracking-widest text-[10px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-primary/5 transition-colors border-b border-border/30">
                  <TableCell className="py-4 px-6">
                    <Link href={`/projects/${project.id}/board`} className="font-bold text-base text-foreground hover:text-primary transition-colors">
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold px-2 py-1 text-[10px] uppercase">{project.status}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-foreground hidden sm:table-cell">{project.tasks}</TableCell>
                  <TableCell className="text-right px-6">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
