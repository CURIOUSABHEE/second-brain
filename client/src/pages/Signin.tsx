import React, { useRef } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { backend_url } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // const typeRef =
  const navigate = useNavigate();

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${backend_url}/api/v1/signin`, {
      username,
      password,
    });
    // .then((data) => {
    //   console.log(data);
    //   alert("You have signed in.");
    // })
    // .catch((error) => alert(error));
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="rounded-2xl bg-white shadow-md  min-w-48 p-8">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" ref={passwordRef} />

        <div className="flex justify-center">
          <Button
            text="Signin"
            size="sm"
            variants="primary"
            onClick={signin}
            fullWidth={true}
            loading={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
