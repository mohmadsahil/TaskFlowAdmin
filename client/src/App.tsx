import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Dashboard from "@/pages/Dashboard";
import Projects from "@/pages/Projects";
import ProjectBoard from "@/pages/ProjectBoard";
import Workflows from "@/pages/Workflows";
import Settings from "@/pages/Settings";
import Roles from "@/pages/Roles";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/not-found";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

function Router() {
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-secondary/5">
          <Switch>
            <Route path="/" component={() => <Redirect to="/dashboard" />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:id/board" component={ProjectBoard} />
            <Route path="/workflows" component={Workflows} />
            <Route path="/roles" component={Roles} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/tasks" component={() => <Redirect to="/projects" />} />
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
