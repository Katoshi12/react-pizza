import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination/index.jsx";

const Home = ({searchQuery}) => {
  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1 )
  const [sortType, setSortType] = useState(
    {
      name: "популярности",
      sortProperty: "rating"
    }
  )

  const sortBy = sortType.sortProperty.replace("-", '')
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc"
  const category = categoryId > 0 ? `category=${ categoryId }` : ""
  const search = searchQuery > 0 ? `&search=${ searchQuery }` : ""

  const url = `https://67e5487418194932a58561f5.mockapi.io/items?page=${currentPage}&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }${ search }`
  useEffect(() => {
    setIsLoading(true)
    fetch(url).then((response) => response.json())
      .then(json => {
        setPizzaItems(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, url, sortType, searchQuery, currentPage])

  return (
    <div className="container">
      <section className="content__top">
        <Categories onClickCategory={ (id) => setCategoryId(id) } id={ categoryId }/>
        <Sort onClickSort={ (value) => setSortType(value) } value={ sortType }/>
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