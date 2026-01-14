import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Briefcase, 
  GitMerge, 
  Settings, 
  LogOut,
  Layers,
  ShieldCheck,
  Bell,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: Briefcase },
  { label: "Workflows", href: "/workflows", icon: GitMerge },
  { label: "Tasks", href: "/tasks", icon: Layers },
  { label: "Roles", href: "/roles", icon: ShieldCheck },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-screen w-72 z-50 flex flex-col bg-white border-r border-border/50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center shadow-lg shadow-primary/25">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">TaskFlow</h1>
              <p className="text-xs text-muted-foreground font-medium">Premium SaaS</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-2 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</span>
          </div>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  location.startsWith(item.href)
                    ? "bg-primary/10 text-primary font-bold shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground font-medium"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  location.startsWith(item.href) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-bold">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
