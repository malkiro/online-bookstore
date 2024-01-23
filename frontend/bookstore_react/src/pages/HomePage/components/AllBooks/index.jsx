import React from 'react'
import DoubleArrow from '../../images/doubleArrow.svg'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import './index.css'
import MultiActionAreaCard from '../MultiActionAreaCard';

const AllBooks = ({ subTitle, title, exploreLink, dataMap, bgColor }) => {
    return (
        <div className={`all-books-wrapper section ${bgColor} `}>
            <div className='border-wrapper'>
                <div className='heading-area'>
                    <div className='left'>

                    </div>
                    <div className='middle'>
                        <h5> {subTitle} </h5>
                        <h2> {title} </h2>
                    </div>
                    <Link to={exploreLink} className='right'>
                        <div className='explore-btn'>
                            <span>VIEW ALL BOOKS</span>
                            <img src={DoubleArrow} alt='icon' />
                        </div>
                    </Link>
                </div>

                <div className={"carousel_wrapper"}>
                    <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={10}
                        loop={true}
                        autoplay={{ delay: 700 }}
                        modules={[Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            },
                            540: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                            1200: {
                                slidesPerView: 8,
                            },
                            1440: {
                                slidesPerView: 10,
                            },
                        }}
                    >

                        <div className='book-area'>
                            {dataMap?.map((item, index) => {
                                const urlCategory = item?.subCategory?.category?.name?.replace(/\s+/g, '-');
                                const urlSubCategory = item?.subCategory?.name?.replace(/\s+/g, '-');
                                const urlpath = `/books/${urlCategory}/${urlSubCategory}/${item.id}`

                                return (
                                    <SwiperSlide
                                        className=""
                                        key={index}
                                    >
                                        <Link to={urlpath}>
                                            <MultiActionAreaCard
                                                image={item.file_path}
                                                title={item.title}
                                                link={item.link}
                                            />
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </div>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default AllBooks
