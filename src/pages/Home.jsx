import { useContext, useEffect, useRef, useState } from "react";
import qs from "qs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Categories from "../components/Categories.jsx";
import Sort, { list } from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import Pagination from "../components/Pagination/index.jsx";
import { SearchContext } from "../App.jsx";
import { setCategoryId, setCurrentPageCount, setFilters } from "../store/slices/filterSlice.js";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const {categoryId, sort, currentPage} = useSelector((state) => state.filterSlice);
  const sortType = sort?.sortProperty

  const {searchQuery} = useContext(SearchContext);

  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const changePage = (page) => {
    dispatch(setCurrentPageCount(page));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          sort: sortList,
          categoryId: Number(params.categoryId) || 0,
          currentPage: Number(params.currentPage) || 1,
        })
      );

      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${ categoryId }` : "";
    const search = searchQuery ? `&search=${ searchQuery }` : "";

    axios
      .get(
        `https://67e5487418194932a58561f5.mockapi.io/items?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }${ search }`
      )
      .then((response) => {
        setPizzaItems(response.data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchQuery, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${ queryString }`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <section className="content__top">
        <Categories onClickCategory={ onClickCategory } id={ categoryId }/>
        <Sort/>
      </section>

      <h2 className="content__title">Все пиццы</h2>

      <section className="content__items">
        { isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={ index }/>)
          : pizzaItems.map((pizza) => <PizzaBlock key={ pizza.id } { ...pizza } />) }
      </section>
      <Pagination value={ currentPage } onChangePage={ changePage }/>
    </div>
  );
};

export default Home;