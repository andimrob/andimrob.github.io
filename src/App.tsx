import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
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
      <div className="mx-auto max-w-screen-xl lg:flex">
        <Sidebar />
        <main className="pt-24 lg:w-1/2 lg:pt-20">
          <About />
          <Experience />
          <Projects />
          <Footer />
        </main>
      </div>
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
