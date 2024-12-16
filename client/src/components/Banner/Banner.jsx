import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the required styles
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import icons
import bgImg1 from "../../assets/slider-3.jpg";
import bgImg2 from "../../assets/slider-2.jpg";
import bgImg3 from "../../assets/slider-1.jpg";
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  const slides = [
    {
      id: 1,
      heading: "Seamless Travel Planning",
      paragraph:
        "Simplify your travel journey with NomadPass. Discover visa requirements, apply online, and track your applications—all in one place.",
      img: bgImg1,
      button: "Explore Visas",
    },
    {
      id: 2,
      heading: "Global Connections Made Easy",
      paragraph:
        "Break barriers and travel hassle-free. With NomadPass, you can navigate visa complexities effortlessly and focus on your next adventure.",
      img: bgImg2,
      button: "Get Started",
    },
    {
      id: 3,
      heading: "Your Gateway to the World",
      paragraph:
        "Unlock the world with NomadPass. Stay informed and stay ahead with a user-friendly platform for all your visa needs.",
      img: bgImg3,
      button: "Learn More",
    },
  ];


  const navigate = useNavigate();

  // Custom navigation buttons using react-icons
  const customPrevArrow = (onClickHandler, hasPrev) => {
    return (
      hasPrev && (
        <button
          onClick={onClickHandler}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full z-10"
          aria-label="Previous Slide"
        >
          <FiChevronLeft size={24} />
        </button>
      )
    );
  };

  const customNextArrow = (onClickHandler, hasNext) =>
    hasNext && (
      <button
        onClick={onClickHandler}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full"
        aria-label="Next Slide"
      >
        <FiChevronRight size={24} />
      </button>
    );

  return (
    <div className="w-full flex justify-center items-center mx-auto bg-cover bg-center bg-no-repeat h-[70vh] md:h-[80vh]">

      
      {/* React Responsive Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        renderArrowPrev={customPrevArrow}
        renderArrowNext={customNextArrow}
        className="w-full h-[70vh] md:h-[80vh]"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full relative">
            {/* Background Image */}
            <div
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-[70vh] md:h-[80vh]"
            ></div>
            {/* Gradient Overlay & Content */}
            <div className="
            absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6 py-10">
              <div className="bg-black/50 p-4 sm:p-8 md:p-12 lg:p-16 rounded">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {slide.heading}
                </h2>
                <p className="text-lg text-white mt-4 max-w-2xl">{slide.paragraph}</p>
                <button
                  onClick={() => navigate("/all-visas")}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4 "
                >
                  <div className="flex gap-2 items-center">
                    <p className="">{slide.button}</p>
                    <FaArrowRight />
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
