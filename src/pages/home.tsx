import { Link } from "react-router-dom";
import LinkIcon from "../assets/icons/link";

export default function Home(){
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-900 text-white font-sans">

      {/* Header/Navigation (Simple) */}
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">LinkHub</h1> {/* Your service name */}
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="text-xs md:text-lg hover:text-blue-300 transition-colors duration-200">Features</a></li>
            <li><a href="#how-it-works" className="text-xs md:text-lg hover:text-blue-300 transition-colors duration-200">How It Works</a></li>
            <li><Link to="/signup" className="text-xs md:text-lg px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-md">Sign Up</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 md:px-8 min-h-[calc(100vh-80px)]"> {/* Adjust min-h to account for header */}
        <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Subtle background pattern */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            All Your Links, One Simple Bio Link.
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 animate-fade-in-up delay-200">
            Connect your audience to everything you create, share, and sell, all from a single, customizable URL.
          </p>
          <button className="px-8 py-4 bg-purple-500 text-xl font-bold rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            Get Your Free LinkHub
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-16">Why Choose LinkHub?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-gray-700">
            <LinkIcon width={60} />
            <h4 className="text-xl md:text-3xl font-bold mb-4">Centralize Your Content</h4>
            <p className="text-lg text-gray-300">
              Bring all your social media, websites, products, and more into one easy-to-manage page.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-gray-700">
            {/* <Sparkles size={60} className="text-purple-400 mb-6" /> */}
            <h4 className="text-xl md:text-3xl font-bold mb-4">Stunning Customization</h4>
            <p className="text-lg text-gray-300">
              Personalize your page with themes, colors, and backgrounds that match your brand.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-gray-800 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-gray-700">
            {/* <BarChart2 size={60} className="text-green-400 mb-6" /> */}
            <h4 className="text-xl md:text-3xl font-bold mb-4">Track Your Performance</h4>
            <p className="text-lg text-gray-300">
              Gain insights with built-in analytics to see which links are performing best.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 md:px-8 bg-blue-900 bg-opacity-70 backdrop-blur-sm">
        <h3 className="text-3xl md:text-5xl font-extrabold text-center mb-16">How It Works: Simple Steps to Get Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-blue-800 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-blue-700">
            <div className="text-4xl md:text-6xl font-extrabold text-blue-300 mb-4">1</div>
            <h4 className="text-xl md:text-3xl font-bold mb-4">Create Your Free Account</h4>
            <p className=" text-gray-300">
              Sign up in seconds with your email or social media. No credit card required to get started.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-blue-800 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-blue-700">
            <div className="text-4xl md:text-6xl font-extrabold text-blue-300 mb-4">2</div>
            <h4 className="text-xl md:text-3xl font-bold mb-4">Add Your Links</h4>
            <p className="text-gray-300">
              Easily add all your important URLs, customize their titles, and even add icons to make them stand out.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-blue-800 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-blue-700">
            <div className="text-4xl md:text-6xl font-extrabold text-blue-300 mb-4">3</div>
            <h4 className="text-xl md:text-3xl font-bold mb-4">Share Your LinkHub URL</h4>
            <p className="text-gray-300">
              Place your unique LinkHub URL in your social media bios, email signatures, or anywhere online.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 md:px-8 text-center bg-gradient-to-r from-purple-600 to-pink-600">
        <h3 className="text-3xl md:text-5xl font-extrabold mb-8">Ready to Simplify Your Online Presence?</h3>
        <p className="md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
          Join thousands of creators, businesses, and professionals who are already using LinkHub to connect with their audience.
        </p>
        <button className="px-10 py-5 bg-white text-purple-700 md:text-2xl font-bold rounded-full shadow-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
          Create Your LinkHub Now
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-8 bg-gray-950 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} LinkHub. All rights reserved.</p>
        <div className="mt-4 space-x-6">
          <Link to="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          <Link to="#" className="hover:text-white transition-colors duration-200">Contact</Link>
        </div>
      </footer>
    </div>
    )
}