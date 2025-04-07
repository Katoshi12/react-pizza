import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import { useContext, useEffect, useState } from "react";
import Pagination from "../components/Pagination/index.jsx";
import { SearchContext } from "../App.jsx";
import { setCategoryId } from "../store/slices/filterSlice.js";

const Home = () => {
  const dispatch = useDispatch();

  const {categoryId, sort} = useSelector((state) => state.filterSlice);
  const sortType = sort.sortProperty

  const {searchQuery} = useContext(SearchContext)

  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setIsLoading(true)

    const sortBy = sortType.replace("-", '')
    const order = sortType.includes("-") ? "asc" : "desc"
    const category = categoryId > 0 ? `category=${ categoryId }` : ""
    const search = searchQuery ? `&search=${ searchQuery }` : ""

    axios.get(`https://67e5487418194932a58561f5.mockapi.io/items?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }${ search }`)
      .then(response => {
        setPizzaItems(response.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchQuery, currentPage])

  return (
    <div className="container">
      <section className="content__top">
        <Categories onClickCategory={ onClickCategory } id={ categoryId }/>
        <Sort/>
      </section>

      <h2 className="content__title">Все пиццы</h2>

      <section className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={ index }/>)
            : pizzaItems.map(pizza => (
              <PizzaBlock key={ pizza.id } { ...pizza } />
            ))
        }
      </section>
      <Pagination onChangePage={ (number) => setCurrentPage(number) }/>
    </div>
  )
}

export default Home;