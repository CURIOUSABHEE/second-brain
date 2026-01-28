import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Signin = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="rounded-2xl bg-white shadow-md  min-w-48 p-8">
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <div className="flex justify-center">
          <Button
            text="Signin"
            size="sm"
            variants="primary"
            onClick={() => console.log("jdv")}
            fullWidth={true}
            loading={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
