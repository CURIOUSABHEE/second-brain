import { useState } from "react";
import CreateContentModal from "../components/ui/CreateContentModal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/ui/Sidebar";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Sidebar />
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className="ml-80">
        <div className="flex justify-end p-4 gap-4">
          <Button
            text="Add Content"
            size="md"
            startIcon={<PlusIcon size="md" />}
            variants="primary"
            onClick={() => {
              setModalOpen(true);
            }}
          />
          <Button
            text="Share Brain"
            size="md"
            startIcon={<ShareIcon size="md" />}
            variants="secondary"
            onClick={() => {
              console.log("heeloe");
            }}
          />
        </div>
        <div className="flex gap-4">
          <Card
            title="Republic Day special"
            link="https://www.youtube.com/watch?v=XaNrzv09j1I"
            type="youtube"
          />
          <Card
            title="Republic Day special"
            link="https://x.com/EmmanuelMacron/status/2015654612162802053"
            type="X"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
