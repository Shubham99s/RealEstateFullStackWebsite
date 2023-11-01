import React from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import './Hero.css'
import SearchBar from '../SearchBar/SearchBar'

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Left Side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <motion.div
              className="orange-circle"
              initial={{ y: '-6rem', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3, type: 'spring' }}
            />
            <motion.h1
              initial={{ x: '-4rem', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2.5, type: 'spring' }}
            >
              Discover <br />
              Most Suitable <br />
              Property
            </motion.h1>
          </div>

          <div className="flexColStart hero-desc">
            <span className="secondaryText">
              Find a variety of properties that suit you very easily
            </span>
            <span className="secondaryText">
              Forget all difficulties in finding a residence for you
            </span>
          </div>

          <SearchBar />

          <div className="flexCenter stats">
            <div className="flexColStart stat">
              <span>
                <CountUp start={1884} end={1994} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Premium Product</span>
            </div>

            <div className="flexColStart stat">
              <span>
                <CountUp start={4852} end={5084} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            <div className="flexColStart stat">
              <span>
                <CountUp end={30} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flexCenter hero-right">
          <motion.div
            className="image-container"
            initial={{ x: '7rem', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2.5, type: 'spring' }}
          >
            <img src="./hero-image.png" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
