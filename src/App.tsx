import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProjectsGallery from "./pages/ProjectsGallery.tsx";
import NeoCursor from "./components/NeoCursor.tsx";

const App = () => (
  <HelmetProvider>
    <TooltipProvider>
      <BrowserRouter>
        <NeoCursor />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsGallery />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
