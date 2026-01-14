import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MoreHorizontal, User } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  category?: string;
  description?: string;
}

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityStyle = {
    High: "bg-red-50 text-red-700 border-red-100",
    Medium: "bg-orange-50 text-orange-700 border-orange-100",
    Low: "bg-green-50 text-green-700 border-green-100",
  }[task.priority || "Medium"];

  return (
    <motion.div
      whileHover={{ y: -1 }}
      onClick={onClick}
      className="bg-white p-3 rounded-lg border border-border/40 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-1.5 flex-wrap">
          <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-tighter px-1.5 py-0 h-4 border", priorityStyle)}>
            {task.priority}
          </Badge>
          {task.category && (
            <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-tighter px-1.5 py-0 h-4 bg-secondary/50 text-muted-foreground border-none">
              {task.category}
            </Badge>
          )}
        </div>
        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      <h4 className="text-xs font-bold text-foreground mb-1.5 line-clamp-2 leading-tight">{task.title}</h4>
      
      {task.description && (
        <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2 leading-normal">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/20">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
          <Calendar className="w-3 h-3" />
          <span>{task.dueDate}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
             <Avatar className="w-5 h-5 border border-white">
                <AvatarFallback className="text-[8px] bg-primary/10 text-primary font-bold">U1</AvatarFallback>
             </Avatar>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
