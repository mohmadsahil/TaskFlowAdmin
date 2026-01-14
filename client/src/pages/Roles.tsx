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
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen bg-secondary/10 overflow-auto">
        <Header />
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
            <p className="text-muted-foreground mt-1 font-medium">Manage team access and authorization levels</p>
          </div>

          <div className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/20">
                <TableRow>
                  <TableHead className="font-bold py-5 w-64 text-foreground">User</TableHead>
                  <TableHead className="font-bold text-foreground">Role</TableHead>
                  {PERMISSIONS.map(p => (
                    <TableHead key={p} className="font-bold text-center text-[10px] uppercase tracking-wider text-muted-foreground">{p}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((user) => (
                  <TableRow key={user.name} className="hover:bg-primary/5 transition-colors border-b border-border/30">
                    <TableCell className="py-5">
                      <div className="flex items-center gap-3 pl-2">
                        <Avatar className="w-9 h-9 border border-border/50 shadow-sm">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-foreground">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold px-3 py-1">
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
