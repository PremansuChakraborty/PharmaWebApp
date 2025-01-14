
import { useState, useEffect } from "react";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, text: "https://www.astellas.com/system/files/styles/header_image_desktop/private/header_image/2024-12/Our%20Stories%20article%20page_PC_mobile.jpg?itok=wyjK7b9F" },
    { id: 2, text: "https://www.maynepharma.com/wp-content/webp-express/webp-images/uploads/2022/04/Maryne-Pharma_154-scaled-aspect-ratio-1710-816.jpg.webp" },
    { id: 3, text: "https://i.ibb.co/31NTRDp/city-thumbnail1712754793.jpg" },
    { id: 4, text: "https://www.gnova.co.in/wp-content/uploads/2021/10/Top-Pharma-Medicines-Distributors-in-India.jpg" },
    { id: 5, text: "https://i.ibb.co/92sR6ML/bg-2.jpg" },
    // Add more slides if needed
  ];

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // 3000ms = 3 seconds

    // Clear interval when the component is unmounted
    return () => clearInterval(slideInterval);
  }, []); // Empty dependency array to run effect once on mount

  return (
    <div
      className="w-full h-80 overflow-hidden relative border-4 border-transparent"
      style={{
        borderImage: "linear-gradient(45deg, #ff5733, #4caf50, #1e90ff, #ff9800) 1", // Gradient for the border
        animation: "rotateBorder 5s linear infinite", // Apply animation for clockwise color change
      }}
    >
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className="h-80 w-full bg-blue-300 flex items-center justify-center text-2xl">
              <img src={slide.text} alt="Dynamic" className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow (Previous Slide) */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        ‹
      </button>

      {/* Right Arrow (Next Slide) */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      >
        ›
      </button>
    </div>
  );
}

export { Carousel };

