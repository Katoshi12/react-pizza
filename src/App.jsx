import "./assets/scss/app.scss"

import { useEffect, useState } from "react";
import Header from "./components/Header"
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton.jsx";


function App() {
  const [pizzaItems, setPizzaItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const url = 'https://67e5487418194932a58561f5.mockapi.io/items'

  useEffect(() => {

    fetch(url).then((response) => response.json())
      .then(json => {
        setPizzaItems(json)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header/>
      <main className="content">
        <div className="container">

          <section className="content__top">
            <Categories/>
            <Sort/>
          </section>

          <h2 className="content__title">Все пиццы</h2>

          <section className="content__items">
            {
              isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                  : pizzaItems.map(pizza => (
                      <PizzaBlock key={pizza.id} pizza={pizza} />
                  ))
            }
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
