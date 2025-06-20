import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [stopScroll, setStopScroll] = React.useState(false);
  const nav=useNavigate();
  const cardData = [
        {
            title: "Drive with confidence, take the wheel with our car rentals.",
            image: "https://w0.peakpx.com/wallpaper/581/477/HD-wallpaper-vertical-car-vertical-cars.jpg",
        },
        {
            title: "Travel in style, leave an impression",
            image: "https://e0.pxfuel.com/wallpapers/577/532/desktop-wallpaper-most-popular-cars-in-india-features-indian-cars.jpg",
        },
        {
            title: "We calm for your holiday.",
            image: "https://images.pexels.com/photos/12796621/pexels-photo-12796621.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        },
        {
            title: "Our partnership for transportation.",
            image: "https://th.bing.com/th/id/OIP.YJIUoF37xMsymLfCzTeWygHaNK?o=7rm=3&rs=1&pid=ImgDetMain&cb=idpwebp1&o=7&rm=3",
        },
        {
            title: "A way of freedom.",
            image: "https://images.pexels.com/photos/8706096/pexels-photo-8706096.jpeg?cs=srgb&dl=pexels-samyantak-mohanty-79378681-8706096.jpg&fm=jpg",
        }
    ];

  return (
    <div className="bg-gradient-to-tr from-gray-100 via-white to-gray-200 min-h-screen pt-24 px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-700">
            Find the Perfect Ride for Every Journey 🚗
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Discover, compare, and book from a wide range of cars at unbeatable prices. Whether it’s a weekend getaway, a business trip, or a family vacation, Rentro has you covered.
          </p>
          {/* Keywords and Explore Button in a Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-blue-50 rounded-full px-5 py-2 shadow text-blue-800 font-medium text-sm">24/7 Customer Support</span>
              <span className="bg-blue-50 rounded-full px-5 py-2 shadow text-blue-800 font-medium text-sm">No Hidden Charges</span>
              <span className="bg-blue-50 rounded-full px-5 py-2 shadow text-blue-800 font-medium text-sm">Easy Online Booking</span>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition whitespace-nowrap"
              onClick={() => nav("/cars")}
            >
              Explore Cars
            </button>
          </div>
        </div>
      </div>
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="overflow-hidden w-full relative max-w-6xl mx-auto" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F5F7FF] to-transparent" />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <div key={index} className="w-80 mx-4 h-[30rem] relative group hover:scale-90 transition-all duration-300">
                                <img src={card.image} alt="card" className="w-full h-full object-cover" />
                                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                                    <p className="text-white text-xl font-semibold text-center">{card.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#F5F7FF] to-transparent" />
            </div>
        
        
    </div>
  );
}

export default HomePage;