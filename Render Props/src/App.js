import "./App.css";
import { useEffect, useState } from "react";

// A reusable component to track mouse position
const MousePosition = ({ render }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMousePositionChange);

    return () => {
      window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);

  // Call the render function with the current mouse position
  return render(mousePosition);
};

// This component should not receive any props
const PanelMouseLogger = ({ mousePosition }) => {
  return (
    <div className="BasicTracker">
      <p>Mouse position:</p>
      <div className="Row">
        <span>x: {mousePosition.x}</span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
};

// This component should not receive any props
const PointMouseLogger = ({ mousePosition }) => {
  return (
    <p>
      ({mousePosition.x}, {mousePosition.y})
    </p>
  );
};

function App() {
  return (
    <div className="App">
      <header className="Header">Render Props example</header>
      {/* Use the MousePosition component with the render props pattern */}
      <MousePosition
        render={(mousePosition) => (
          <>
            <PanelMouseLogger mousePosition={mousePosition} />
            <PointMouseLogger mousePosition={mousePosition} />
          </>
        )}
      />
    </div>
  );
}

export default App;
