import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useConfettiOnBottom } from "./hooks/useConfettiOnBottom";

function App() {
  useConfettiOnBottom();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
