import React, { type ReactNode } from "react";
import CrossIcon from "../../icons/CrossIcon";
import Button from "./Button";

const CreateContentModal = ({ open, onClose }) => {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen opacity-30 bg-black fixed top-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 rounded p-4">
              <div className="flex justify-end">
                <div className="cursor-pointer" onClick={onClose}>
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder="Title" />
                <Input placeholder="Link" />
              </div>
              <div className="flex justify-center">
                <Button
                  text="Submit"
                  size="sm"
                  variants="primary"
                  onClick={() => console.log("jdv")}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
