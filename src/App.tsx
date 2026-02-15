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
      <a
        href="#content"
        className="absolute top-0 left-0 z-[100] -translate-y-full rounded bg-primary px-4 py-2 text-sm font-bold text-white focus-visible:translate-y-0"
      >
        Skip to Content
      </a>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar />

          <main id="content" className="pt-16 lg:w-[52%] lg:py-24">
            <About />
            <Experience />
            <Projects />
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
