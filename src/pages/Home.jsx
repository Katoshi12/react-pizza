import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import { useEffect, useState } from "react";

const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState(
    {
      name: "популярности",
      sortProperty: "rating"
    }
  )

  const sortBy = sortType.sortProperty.replace("-", '')
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc"
  const category = categoryId > 0 ? `category_${ categoryId }` : ""

  const url = `https://67e5487418194932a58561f5.mockapi.io/items?${ category }&sortBy=${ sortBy }&order=${order}`
  useEffect(() => {
    setIsLoading(true)
    fetch(url).then((response) => response.json())
      .then(json => {
        setPizzaItems(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, url, sortType])

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
    </div>
  )
}

export default Home;