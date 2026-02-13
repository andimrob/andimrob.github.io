import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import { useMousePosition } from "./xray/useMousePosition";
import { useXRay } from "./xray/useXRay";
import XRayOverlay from "./xray/XRayOverlay";

function App() {
  const getMousePosition = useMousePosition();
  const { xrayActive, sourceHTML } = useXRay();

  return (
    <>
      <CursorGlow xrayActive={xrayActive} getMousePosition={getMousePosition} />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Footer />
      {xrayActive && sourceHTML && (
        <XRayOverlay
          sourceHTML={sourceHTML}
          getMousePosition={getMousePosition}
        />
      )}
    </>
  );
}

export default App;
