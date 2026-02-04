import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../config";
import { ContentCard } from "../components/ui/ContentCard";

interface SharedContent {
  _id: string;
  title: string;
  url: string;
  type: "twitter" | "youtube";
}

interface SharePageData {
  username: string;
  content: SharedContent[];
}

function Share() {
  const { hash } = useParams<{ hash: string }>();
  const [data, setData] = useState<SharePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${backend_url}/api/v1/brain/${hash}`);
        setData(response.data);
      } catch (err) {
        setError("Failed to load shared content");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedContent();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading shared content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No content found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{data.username}'s Brain</h1>
        <p className="text-gray-600 mb-8">
          {data.content.length} item{data.content.length !== 1 ? "s" : ""}
        </p>

        <div className="flex gap-4 flex-wrap">
          {data.content.map((item: SharedContent) => (
            <ContentCard
              key={item._id}
              contentId={item._id}
              title={item.title}
              link={item.url}
              type={item.type}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Share;
