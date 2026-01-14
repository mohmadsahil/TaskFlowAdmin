import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings, User, LogOut, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border/50 bg-white/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="w-6 h-6" />
        </Button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            className="w-full bg-secondary/50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 rounded-xl">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 rounded-2xl shadow-xl border-border/50 overflow-hidden" align="end">
            <div className="p-4 border-b border-border/50 bg-secondary/20">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-4 hover:bg-secondary/30 cursor-pointer border-b border-border/30 transition-colors">
                <p className="text-sm font-medium">Alice Manager assigned you a task</p>
                <p className="text-xs text-muted-foreground mt-1">Design System Updates • 2m ago</p>
              </div>
            </div>
            <div className="p-3 bg-secondary/10 text-center">
              <Button variant="ghost" size="sm" className="text-primary font-bold h-8">View all notifications</Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-8 w-px bg-border/50 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-1 pr-1 md:pr-2 py-1 h-10 rounded-xl hover:bg-primary/5 gap-2 group transition-all">
              <Avatar className="w-8 h-8 border border-primary/20">
                <AvatarImage src="https://i.pravatar.cc/150?u=alice" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">AM</AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold leading-none">Alice Manager</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-2xl shadow-xl border-border/50 p-2" align="end">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">My Account</DropdownMenuLabel>
            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer">
              <User className="w-4 h-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer">
              <Settings className="w-4 h-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1 opacity-50" />
            <DropdownMenuItem className="rounded-xl gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <LogOut className="w-4 h-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
