import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from 'framer-motion';

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';

const Banner = () => {
    return (
        <div className="relative">
            <Carousel
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                showThumbs={false}
                renderArrowPrev={(clickHandler, hasPrev) => 
                    hasPrev && (
                        <motion.div
                            className="absolute top-1/2 left-4 z-10 cursor-pointer"
                            onClick={clickHandler}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FaChevronLeft size={40} color="white" />
                        </motion.div>
                    )
                }
                renderArrowNext={(clickHandler, hasNext) => 
                    hasNext && (
                        <motion.div
                            className="absolute top-1/2 right-4 z-10 cursor-pointer"
                            onClick={clickHandler}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FaChevronRight size={40} color="white" />
                        </motion.div>
                    )
                }
            >
                <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src={img1} alt="Slide 1" />
                </motion.div>
                <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src={img2} alt="Slide 2" />
                </motion.div>
                <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src={img3} alt="Slide 3" />
                </motion.div>
                <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src={img4} alt="Slide 4" />
                </motion.div>
                <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src={img5} alt="Slide 5" />
                </motion.div>
                <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img src={img6} alt="Slide 6" />
                </motion.div>
            </Carousel>
        </div>
    );
};

export default Banner;
