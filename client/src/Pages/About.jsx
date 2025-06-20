import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen px-6 py-20 md:px-20 lg:px-32 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600">About Us</h1>
        <p className="text-lg mb-8 leading-relaxed text-gray-600">
          Welcome to <span className="font-semibold text-black">Rentro</span>, your trusted platform for car rentals made simple, fast, and secure. 
          We believe in providing seamless experiences for our users — whether you're traveling for work, vacation, or just need a ride for the day.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mt-10 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to revolutionize the rental experience by offering an intuitive and AI-powered car booking system.
            We’re committed to offering affordable, reliable, and eco-friendly options that suit all customer needs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-6">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Easy-to-use platform</li>
            <li>Wide range of vehicles</li>
            <li>Trusted customer service</li>
            <li>Secure online booking</li>
          </ul>
        </div>

        <div>
          <img
            src="https://www.enterprise.com/en/about/_jcr_content/root/container/container/container_1339673228/container_copy_1874901524/teaser_copy.coreimg.jpeg/1691129790462/about-enterprise-service.jpeg"
            alt="About us"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;