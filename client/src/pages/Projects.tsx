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
  { id: 4, name: "Security Infrastructure", description: "Audit and hardening of all cloud servers and databases.", tasks: 15, status: "Active", dueDate: "2026-05-01", category: "Dev" },
  { id: 5, name: "Customer Retention", description: "Analyzing churn patterns and implementing loyalty features.", tasks: 9, status: "Active", dueDate: "2026-03-30", category: "Product" },
  { id: 6, name: "API Documentation", description: "Interactive Swagger docs for external developers.", tasks: 4, status: "Pending", dueDate: "2026-02-15", category: "Dev" },
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
    <div className="p-3 md:p-5 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Projects</h1>
          <p className="text-[11px] md:text-xs text-muted-foreground font-medium">Coordinate and track departmental workspace.</p>
        </div>
        <CreateProjectModal 
          trigger={<Button className="w-full sm:w-auto rounded-lg h-9 px-4 text-xs font-bold shadow-sm">New Project</Button>}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-2 justify-between items-stretch bg-white p-2 rounded-xl border border-border/40 shadow-sm mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search workspace..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary/20 border-none rounded-lg py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none rounded-lg gap-1.5 font-bold h-8 text-[11px] border-border/40 px-3">
            <Filter className="w-3.5 h-3.5" /> Filter
          </Button>

          <div className="flex bg-secondary/30 p-0.5 rounded-lg border border-border/30">
            <Button 
              variant={view === "card" ? "default" : "ghost"} 
              size="sm" 
              className="rounded-md gap-1.5 px-2.5 h-7 text-[10px] font-bold"
              onClick={() => setView("card")}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Grid
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

      {view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}/board`}>
              <Card className="border-border/40 shadow-sm hover:shadow-md transition-all rounded-xl cursor-pointer group bg-white overflow-hidden border hover:border-primary/30">
                <CardContent className="p-4 md:p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-primary/5 rounded-lg text-primary">
                      <Folder className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="font-bold text-[9px] uppercase px-1.5 h-4">{project.status}</Badge>
                  </div>
                  <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors leading-tight">{project.name}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-4 font-medium leading-relaxed">{project.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.dueDate}</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/5 text-primary font-bold text-[9px] h-4 px-1.5 border-none">{project.tasks} Tasks</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/10">
              <TableRow className="border-b border-border/20">
                <TableHead className="font-bold py-3 px-6 text-foreground uppercase tracking-widest text-[9px]">Name</TableHead>
                <TableHead className="font-bold text-foreground uppercase tracking-widest text-[9px]">Status</TableHead>
                <TableHead className="font-bold text-foreground uppercase tracking-widest text-[9px] hidden sm:table-cell">Tasks</TableHead>
                <TableHead className="font-bold text-foreground uppercase tracking-widest text-[9px] hidden md:table-cell">Due</TableHead>
                <TableHead className="font-bold text-right px-6 text-foreground uppercase tracking-widest text-[9px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-primary/5 transition-colors border-b border-border/10">
                  <TableCell className="py-3 px-6">
                    <Link href={`/projects/${project.id}/board`} className="font-bold text-[13px] text-foreground hover:text-primary transition-colors">
                      {project.name}
                    </Link>
                    <p className="text-[10px] text-muted-foreground font-medium">{project.category}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-bold px-1.5 text-[9px] uppercase h-4">{project.status}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-foreground text-xs hidden sm:table-cell">{project.tasks}</TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground hidden md:table-cell">{project.dueDate}</TableCell>
                  <TableCell className="text-right px-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreVertical className="w-3.5 h-3.5" />
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
