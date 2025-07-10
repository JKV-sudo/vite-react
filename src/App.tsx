import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import "./App.css";

function App() {
  return (
    <PerformanceOptimizer>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </PerformanceOptimizer>
  );
}

export default App;
