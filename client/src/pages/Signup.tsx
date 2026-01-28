import React, { useRef } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { backend_url } from "../config";
import axios from "axios";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>("");
  const passwordRef = useRef<HTMLInputElement>("");

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${backend_url}/api/v1/signup`, {
      data: {
        username,
        password,
      },
    });
    alert("You have signed up.");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="rounded-2xl bg-white shadow-md  min-w-48 p-8">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />
        <div className="flex justify-center">
          <Button
            text="SignUp"
            size="sm"
            variants="primary"
            onClick={signup}
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
