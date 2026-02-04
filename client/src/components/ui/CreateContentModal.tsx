import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { backend_url } from "../../config";
import axios from "axios";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = (typeof ContentType)[keyof typeof ContentType];

interface ContentProps {
  open: boolean;
  onClose: () => void;
  onContentAdded?: () => void;
}

const CreateContentModal: React.FC<ContentProps> = ({
  open,
  onClose,
  onContentAdded,
}) => {
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);

  const addContent = async (): Promise<void> => {
    const title = titleRef.current?.value;
    const url = linkRef.current?.value;

    if (!title || !url) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${backend_url}/api/v1/content`,
        {
          title,
          url,
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      if (onContentAdded) {
        onContentAdded();
      }
      onClose();
    } catch (error) {
      alert("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
        <CardHeader>
          <CardTitle className="text-xl">Add New Content</CardTitle>
          <CardDescription>
            Save a YouTube video or Twitter post to your second brain
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium leading-none">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter a title for this content"
              ref={titleRef}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium leading-none">
              Link
            </label>
            <Input id="link" placeholder="Paste the URL here" ref={linkRef} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Content Type
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={type === ContentType.Youtube ? "default" : "outline"}
                onClick={() => setType(ContentType.Youtube)}
                className="flex-1"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
                YouTube
              </Button>
              <Button
                type="button"
                size="sm"
                variant={type === ContentType.Twitter ? "default" : "outline"}
                onClick={() => setType(ContentType.Twitter)}
                className="flex-1"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={addContent} className="flex-1" disabled={loading}>
            {loading ? "Adding..." : "Add Content"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateContentModal;
