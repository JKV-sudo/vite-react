import Header from "./components/Header";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import { Suspense, lazy } from "react";
import "./App.css";

const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Portfolio = lazy(() => import("./components/Portfolio"));

function App() {
  return (
    <PerformanceOptimizer>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<div>Loading...</div>}>
            <Services />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Portfolio />
          </Suspense>
          <Contact />
        </main>
        <Footer />
      </div>
    </PerformanceOptimizer>
  );
}

export default App;
