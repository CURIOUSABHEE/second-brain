import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Logo from "../icons/Logo";
import myVideo from "../assets/videos/myVideo.mp4";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold text-gray-800">Second Brain</span>
        </div>
        <div className="space-x-4">
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative flex items-center justify-center">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={myVideo} type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Second Brain
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Organize your thoughts, ideas, and knowledge in one place. Capture
            content from anywhere and access it instantly.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Start Organizing</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-gray-500">
        <p>&copy; 2026 Second Brain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
