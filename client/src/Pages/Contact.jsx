import { Link } from 'react-router-dom';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for sending data to server or email service
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white p-8 pt-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
            Contact Us 📩
          </h2>


          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>


            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              ></textarea>
            </div>


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>


            <div className="text-center -mt-1">
              <Link to="/" className="text-blue-500 hover:underline">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Contact;
