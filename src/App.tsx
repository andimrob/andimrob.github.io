import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
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
      <MobileHeader />
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left sticky sidebar (desktop) */}
        <div className="hidden lg:block lg:w-1/2">
          <Sidebar />
        </div>

        {/* Right scrollable content */}
        <main className="flex-1 px-6 pt-24 pb-12 lg:w-1/2 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-2xl space-y-32">
            <About />
            <Experience />
            <Projects />
          </div>
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
