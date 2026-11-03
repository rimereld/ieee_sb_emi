import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ErrorBoundary } from "./components/ErrorBoundary"
import ScrollToTop from "./components/ScrollToTop"
import ShineCursor from "./components/ShineCursor"
import Index from "./pages/Index"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Join from "./pages/Join"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop />
      <ShineCursor />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/join" element={<Join />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
)

export default App
