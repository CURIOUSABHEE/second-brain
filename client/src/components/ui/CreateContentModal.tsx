import React, { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
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
}

const CreateContentModal: React.FC<ContentProps> = ({ open, onClose }) => {
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);

  const addContent = async (): Promise<void> => {
    const title = titleRef.current?.value;
    const url = linkRef.current?.value;

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
    onClose();
  };

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen opacity-80 bg-gray-400 relative top-0 left-0 flex justify-center"></div>
          <div className="w-screen h-screen top-0 left-0 fixed flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 rounded p-4 absolute">
                <div className="flex justify-end">
                  <div className="cursor-pointer" onClick={onClose}>
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input placeholder="Title" ref={titleRef} />
                  <Input placeholder="Link" ref={linkRef} />
                  <div className="flex justify-center gap-4 m-1">
                    <h1>Type: </h1>

                    <Button
                      size="sm"
                      variant={
                        type == ContentType.Youtube ? "default" : "secondary"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    >
                      Youtube
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        type == ContentType.Twitter ? "default" : "secondary"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    >
                      Twitter
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button size="default" variant="default" onClick={addContent}>
                    Submit
                  </Button>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
