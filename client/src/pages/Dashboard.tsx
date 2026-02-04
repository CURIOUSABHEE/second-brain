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
  const [filter, setFilter] = useState<"all" | "twitter" | "youtube">("all");
  const { contents, refresh } = useContent();

  const filteredContents = contents.filter(
    (content: { type: string }) => filter === "all" || content.type === filter,
  );

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  const deleteContent = async (contentId: string) => {
    try {
      await axios.delete(`${backend_url}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      refresh();
    } catch {
      alert("Failed to delete content");
    }
  };

  return (
    <>
      <Sidebar activeFilter={filter} onFilterChange={setFilter} />
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onContentAdded={refresh}
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
              try {
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
              } catch {
                alert("Failed to share brain");
              }
            }}
          >
            <ShareIcon size="md" />
            Share Brain
          </Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {filteredContents.map(
            ({
              _id,
              title,
              url,
              type,
            }: {
              _id: string;
              title: string;
              url: string;
              type: "twitter" | "youtube";
            }) => (
              <ContentCard
                key={_id}
                contentId={_id}
                title={title}
                link={url}
                type={type}
                onDelete={deleteContent}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
