import { useEffect, useState } from "react";
import CreateContentModal from "../components/ui/CreateContentModal";
import { Button } from "../components/ui/Button";
import { ContentCard } from "../components/ui/ContentCard";
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
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <PlusIcon size="md" />
            Add Content
          </Button>
          <Button
            variant="secondary"
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
          >
            <ShareIcon size="md" />
            Share Brain
          </Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ key, title, url, type }) => (
            <ContentCard key={key} title={title} link={url} type={type} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
