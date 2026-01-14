import { Switch, Route, Redirect } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectBoard from "@/pages/ProjectBoard";
import Tasks from "@/pages/Tasks";
import Workflows from "@/pages/Workflows";
import Settings from "@/pages/Settings";
import Roles from "@/pages/Roles";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/not-found";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

function Router() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background relative overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-72 transition-[margin] duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-secondary/5">
          <Switch>
            <Route path="/" component={() => <Redirect to="/dashboard" />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:id/board" component={ProjectBoard} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/roles" component={Roles} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
