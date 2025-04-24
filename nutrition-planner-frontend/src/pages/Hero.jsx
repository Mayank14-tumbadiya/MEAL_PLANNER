import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5);
    };

    window.addEventListener("scroll", handleScroll);

    // Trigger entrance animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-200 opacity-30 animate-pulse"
          style={{
            transform: `translate(${offset * 0.2}px, ${offset * 0.1}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
        <div
          className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-yellow-200 opacity-30 animate-pulse"
          style={{
            animationDelay: "1s",
            transform: `translate(${offset * -0.1}px, ${offset * 0.2}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-blue-200 opacity-30 animate-pulse"
          style={{
            animationDelay: "2s",
            transform: `translate(${offset * 0.15}px, ${offset * -0.15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
            style={{ transition: "all 0.8s ease-out" }}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              Plan Your Meals{" "}
              <span className="text-green-600">Effortlessly</span>
            </h1>
            <p
              className="text-lg text-gray-600"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
              }}
            >
              Simplify your life with our intuitive meal planning tools. Save
              time, reduce waste, and enjoy delicious, healthy meals every day.
            </p>
            <div
              className="flex justify-start"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s",
              }}
            >
              <Link to="/meal-planner" className="start-planning-button">
                Start Planning
                <ChevronRight className="chevron-icon" />
              </Link>
            </div>
          </div>

          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transition:
                "opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s",
            }}
          >
            <img
              src="./public/home.jpg"
              alt="Healthy meal preparation"
              className="custom-image rounded-3xl shadow-xl transform hover:scale-105  transition-transform duration-500 ease-in-out"
            />
            <div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s",
              }}
            >
              <p className="text-sm font-medium text-gray-800">
                Over 10,000+ recipes
              </p>
              <p className="text-xs text-gray-500">
                Customizable to your preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global animation styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
