import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
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
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-16">
          <div className="lg:flex lg:w-[48%]">
            <Sidebar />
          </div>
          <main className="pt-24 lg:w-[52%] lg:py-24">
            <About />
            <Experience />
            <Projects />
            <Blog />
            <Footer />
          </main>
        </div>
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
