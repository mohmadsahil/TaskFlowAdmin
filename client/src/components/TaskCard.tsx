import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import type { Task, User } from "@shared/schema";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  assignee?: User;
  onClick?: () => void;
}

export function TaskCard({ task, assignee, onClick }: TaskCardProps) {
  const priorityColor = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-orange-100 text-orange-700 border-orange-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  }[task.priority || "Medium"];

  return (
    <motion.div
      layoutId={`task-${task.id}`}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white p-4 rounded-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline" className={`${priorityColor} border`}>
          {task.priority}
        </Badge>
        <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{task.title}</h4>
      
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{task.dueDate ? format(new Date(task.dueDate), "MMM d") : "No date"}</span>
        </div>
        
        {assignee && (
          <Avatar className="w-6 h-6 border-2 border-white shadow-sm">
            <AvatarImage src={assignee.avatarUrl || undefined} />
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
              {assignee.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </motion.div>
  );
}
