import { useEffect, useState } from "react";
import CreateContentModal from "../components/ui/CreateContentModal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Sidebar from "../components/ui/Sidebar";
import useContent from "../hook/useContent";
import axios from "axios";
import { backend_url, frontend_url } from "../config";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);
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
            onClick={async () => {
              const response = await axios.post(
                `${backend_url}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                },
              );
              const shareUrl = `${frontend_url}/share/${response.data.hash}`;
              alert(shareUrl);
            }}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ key, title, url, type }) => (
            <Card key={key} title={title} link={url} type={type} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
