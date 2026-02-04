import React, { useRef } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { backend_url } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios
      .post(`${backend_url}/api/v1/signup`, {
        username,
        password,
      })
      .then((data) => {
        console.log(data);
        alert("You have signed up.");
        navigate("/signin");
      })
      .catch((error) => alert(error));
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
        <div>
          <span>already have account? Signin</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
