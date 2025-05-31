
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Finance from "./pages/Finance";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white font-poppins">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <FloatingButtons />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
