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

interface UserWithRole {
  name: string;
  role: string;
  avatarUrl?: string;
}

const USERS: UserWithRole[] = [
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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
        <p className="text-muted-foreground mt-1 font-medium">Manage team access and authorization levels</p>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead className="font-semibold py-4 w-64">User</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              {PERMISSIONS.map(p => (
                <TableHead key={p} className="font-semibold text-center text-[10px] uppercase tracking-wider">{p}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.name} className="hover:bg-primary/5 transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 border border-border/50">
                      <AvatarImage src={user.avatarUrl} />
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {user.role}
                  </Badge>
                </TableCell>
                {PERMISSIONS.map(p => (
                  <TableCell key={p} className="text-center">
                    <div className="flex justify-center">
                      <div className="w-4 h-4 rounded border-2 border-primary/30 bg-primary/5 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-sm opacity-60" />
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
  );
}
