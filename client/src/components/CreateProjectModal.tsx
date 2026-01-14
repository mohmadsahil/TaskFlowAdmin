import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  dueDate: z.string(),
});

interface CreateProjectModalProps {
  trigger: React.ReactNode;
  onSuccess?: (data: any) => void;
}

export function CreateProjectModal({ trigger, onSuccess }: CreateProjectModalProps) {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "Design",
      dueDate: new Date().toISOString().split('T')[0],
    },
  });

  function onSubmit(values: z.infer<typeof projectSchema>) {
    console.log("Static Project Submit:", values);
    onSuccess?.(values);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name..." {...field} className="rounded-xl border-border/50 h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Design, Dev, Marketing" {...field} className="rounded-xl border-border/50 h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Deadline Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="rounded-xl border-border/50 h-11" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Project Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What is this project about?" 
                      className="rounded-xl border-border/50 min-h-[120px] resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 rounded-xl font-bold text-lg mt-4 shadow-lg shadow-primary/20">
              Launch Project
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
