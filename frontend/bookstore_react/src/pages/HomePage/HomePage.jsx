import React, { useEffect, useState } from "react";
import './HomePage.css'
import data from './utils/data';
import { Link } from 'react-router-dom';
import childrenData from './utils/child';
import BestBooks from './components/BestBooks'
import AllBooks from './components/AllBooks';
import { getRequest } from "../../services/ApiService";
import DoubleArrow from './images/doubleArrow.svg'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heroImage from './images/home.jpg'

const HomePage = () => {
  const [categories, setCategories] = useState(null);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await getRequest("/categories");
      setCategories(response.data);
    }
    getAllCategories();
  }, []);

  useEffect(() => {
    const getAllBooks = async () => {
      const response = await getRequest("/books");
      setBooks(response.data);
    }
    getAllBooks();
  }, []);



  return (
    <div className='homepage'>
      {/* category set */}
      <ToastContainer />
      <section className="section">
        <Link to="/all-categories" className='top-link'>
          <div className='explore-btn'>
            <span>VIEW ALL CATEGORIES</span>
            <img src={DoubleArrow} alt='icon' />
          </div>
        </Link>

        <div className='category-wrapper'>
          {categories?.map(({ name }, idx) => {
            const urlName = name.replace(/\s+/g, '-').toLowerCase();
            return (
              <Link to={`/books/${urlName}`} className='category' key={idx}>
                <div class="image">
                  <div className="img"></div>
                </div>
                <div className="name">{name}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="hero-image">
          <img src={heroImage} alt="image" />
        </section>

      {/* all books */}
      <AllBooks
        subTitle="BOOKS FROM ALL CATEGORIES"
        title="OUR BOOK COLLECTION"
        exploreLink="/books"
        dataMap={books}
        bgColor="bgColor1"
      />

      {/* best book set */}
      <BestBooks
        subTitle="BEST FICTION BOOKS"
        title="FICTION"
        exploreLink="/books/fiction"
        bgColor="bgColor1"
        categoryId="1"
      />

      <BestBooks
        subTitle="BEST NOVEL BOOKS"
        title="NOVEL "
        exploreLink="/books/novel"
        bgColor="bgColor2"
        categoryId="2"
      />

      <BestBooks
        subTitle="BEST SHORT STORY BOOKS"
        title="SHORT STORY "
        exploreLink="/books/short-story"
        bgColor="bgColor1"
        categoryId="3"
      />

      <BestBooks
        subTitle="BEST CHILDREN BOOKS"
        title="CHILDREN"
        exploreLink="/books/children"
        bgColor="bgColor2"
        categoryId="4"
      />

      <BestBooks
        subTitle="BEST EDUCATION BOOKS"
        title="EDUCATION "
        exploreLink="/books/education"
        bgColor="bgColor1"
        categoryId="5"
      />

      <BestBooks
        subTitle="BEST TRANSLATION BOOKS"
        title="TRANSLATION "
        exploreLink="/books/translation"
        bgColor="bgColor2"
        categoryId="6"
      />

    </div>
  )
}

export default HomePage
