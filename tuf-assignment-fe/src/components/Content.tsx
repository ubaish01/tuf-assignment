import React from "react";

const ContentSection: React.FC = () => {
  return (
    <section id="courses" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Popular Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Course 1</h3>
            <p className="text-gray-600">
              Description of course 1. Learn the fundamentals and advance your
              skills.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Course 2</h3>
            <p className="text-gray-600">
              Description of course 2. Enhance your knowledge with practical
              examples.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Course 3</h3>
            <p className="text-gray-600">
              Description of course 3. Get hands-on experience with real-world
              projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
