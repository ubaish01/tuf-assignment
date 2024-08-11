import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative  bg-center h-screen"
      style={{ backgroundImage: "url(/path-to-your-hero-image.jpg)" }}
    >
      <div className="absolute inset-0  opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">
            Unlock Your Potential
          </h1>
          <p className="text-lg mb-6">
            Join our courses and become a better developer.
          </p>
          <a
            href="#courses"
            className="bg-blue-600 py-2 px-4 rounded text-white font-semibold hover:bg-blue-700"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
