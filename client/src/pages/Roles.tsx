import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";

const USERS = [
  { name: "Alice Manager", role: "Manager", avatarUrl: "https://i.pravatar.cc/150?u=alice" },
  { name: "Bob Developer", role: "Developer", avatarUrl: "https://i.pravatar.cc/150?u=bob" },
  { name: "Charlie Tester", role: "Tester", avatarUrl: "https://i.pravatar.cc/150?u=charlie" },
];

const PERMISSIONS = [
  "Read Projects",
  "Write Tasks",
  "Delete Tasks",
  "Manage Workflows",
  "User Management",
];

export default function Roles() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden transition-[margin] duration-300">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full overflow-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Roles & Permissions</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">Manage team access and authorization levels</p>
          </div>

          <div className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow className="border-b border-border/50">
                  <TableHead className="font-bold py-5 px-4 md:px-6 text-foreground text-xs">User</TableHead>
                  <TableHead className="font-bold text-foreground text-xs">Role</TableHead>
                  {PERMISSIONS.map(p => (
                    <TableHead key={p} className="font-bold text-center text-[9px] uppercase tracking-wider text-muted-foreground min-w-[80px]">{p}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((user) => (
                  <TableRow key={user.name} className="hover:bg-primary/5 transition-colors border-b border-border/30">
                    <TableCell className="py-5 px-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 border border-border/50 shadow-sm flex-shrink-0">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-foreground text-sm whitespace-nowrap">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold px-3 py-1 text-[10px] uppercase">
                        {user.role}
                      </Badge>
                    </TableCell>
                    {PERMISSIONS.map(p => (
                      <TableCell key={p} className="text-center">
                        <div className="flex justify-center">
                          <div className="w-5 h-5 rounded-lg border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-sm shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
