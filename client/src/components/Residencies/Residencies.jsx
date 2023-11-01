import React from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import './Residencies.css'
import { PuffLoader } from 'react-spinners'
import PropertyCard from '../PropertyCard/PropertyCard'
import useProperties from '../../hooks/useProperties'

const Residencies = () => {
  const { data, isError, isLoading } = useProperties()

  const sliderSettings = {
    slidesPerView: 1,
    spaceBetween: 50,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      730: {
        slidesPerView: 2,
      },
      990: {
        slidesPerView: 3,
      },
      1300: {
        slidesPerView: 4,
      },
    },
  }

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error While Fetching Data</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  return (
    <section className="r-wrapper">
      <div className="innerWidth paddings r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Residencies

const SliderButtons = () => {
  const swiper = useSwiper()

  return (
    <div className="flexCenter r-buttons">
      <button
        type="button"
        onClick={() => {
          swiper.slidePrev()
        }}
      >
        &lt;
      </button>
      <button
        type="button"
        onClick={() => {
          swiper.slideNext()
        }}
      >
        &gt;
      </button>
    </div>
  )
}
