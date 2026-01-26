import "./App.css";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import PlusIcon from "./icons/PlusIcon";

function App() {
  return (
    <>
      <Button
        text="Add Content"
        size="md"
        startIcon={<PlusIcon size="md" />}
        variants="primary"
        onClick={() => {
          console.log("heeloe");
        }}
      />
      <Card title="Notion Page" subtitle="hello world" />
      <Card title="Notion Page" subtitle="hello world" />
      <Card title="Notion Page" subtitle="hello world" />
    </>
  );
}

export default App;
