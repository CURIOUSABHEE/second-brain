import "./App.css";
import Button from "./components/ui/Button";

function App() {
  return (
    <>
      <Button
        text="Add Content"
        size="md"
        startIcon="+"
        variants="primary"
        onClick={() => {
          console.log("heeloe");
        }}
      />
    </>
  );
}

export default App;
