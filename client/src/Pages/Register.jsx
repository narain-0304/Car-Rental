import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../AppContext/Context';
import toast from 'react-hot-toast';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    const { axios, setUser, setShowUserLogin } = useAppContext();
  
  const handleRegister = async(e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post('/api/user/register', {name,email,password});
        if(data.success){
            navigate('/');
            setUser(data.user);
            setShowUserLogin(false);
            toast.success(data.message);
        }
        else{
            toast.error(data.message);
        }
      } catch (error) {
          toast.error(error.message);
      }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account 📝
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="fullname"
              type="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

        

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
          
          <div className="text-center mt-2">
            <Link to="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;