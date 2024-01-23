import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Category.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import data from '../HomePage/utils/data';
import subcat from '../HomePage/utils/subcat';
import { getRequest } from "../../services/ApiService";

const CategoryPage = () => {
    const [showCategory, setShowCategory] = useState(true);
    const [showSubCategory, setShowSubCategory] = useState(true);

    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);

    const handleCategoryCheckboxChange = () => {
        setShowCategory(!showCategory);
    };

    const handleSubCategoryCheckboxChange = () => {
        setShowSubCategory(!showSubCategory);
    };

    useEffect(() => {
        const getAllCategories = async () => {
            const response = await getRequest("/categories");
            setCategories(response.data);
        }
        getAllCategories();
    }, []);

    useEffect(() => {
        const getAllSubCategories = async () => {
            const response = await getRequest("/subcategories");
            setSubCategories(response.data);
        }
        getAllSubCategories();
    }, []);


    return (
        <div className='category-page'>
            {/* nav header */}
            <section className='top-nav-sec'>
                <h3>All Categories</h3>
                <div className='path'>
                    <Link to="/">
                        Home
                    </Link>
                    <span> {">"} </span>
                    <div>All Categories</div>
                </div>
            </section>

            {/* category set */}
            <section className='browse-categories section'>
                <h2>Browse All Categories and Sub Categories </h2>

                <div className='all-categories-with-filter-wrapper'>
                    <div className='filter-wrapper'>
                        <h5>Filter By: </h5>
                        <div>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={showCategory} onChange={handleCategoryCheckboxChange} />}
                                    label="Category"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={showSubCategory} onChange={handleSubCategoryCheckboxChange} />}
                                    label="Sub Category"
                                />
                            </FormGroup>
                        </div>
                    </div>

                    <div className='all-categories-wrapper'>
                        {showCategory && (
                            <>
                                <h5>Categories</h5>
                                <div className='categories-wrapper'>
                                    {categories?.map(({ name }, idx) => {
                                        const urlName = name.replace(/\s+/g, '-').toLowerCase();
                                        return (
                                            <Link to={`/books/${urlName}`} className='category' key={idx}>
                                                <div class="image">
                                                    <div className="img"></div>
                                                </div>
                                                <div className="category-name">{name}</div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {showSubCategory && (
                            <>
                                <h5>Sub Categories</h5>
                                {/* <p>Select your category:</p>

                                <ul className='category-sub-filter'>
                                    {categories?.map((item, idx) => {
                                        return (
                                            <li className="category-name" key={idx}>{item.name}</li>
                                        )
                                    })}

                                </ul> */}
                                <div className='sub-categories-wrapper'>
                                    {subCategories?.map((item, idx) => {
                                        const urlCatName = item.category.name.replace(/\s+/g, '-').toLowerCase();;
                                        // const urlCatSubName = item.name.replace(/\s+/g, '-');
                                        return (
                                            <Link to={`/books/${urlCatName}`} className='subcategory' key={idx}>
                                                <div class="image">
                                                    <div className="img"></div>
                                                </div>
                                                <div className="subcategory-name">{item.name}</div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </section>
        </div>
    );
};

export default CategoryPage;
