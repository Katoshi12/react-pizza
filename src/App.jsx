import "./assets/scss/app.scss"

import Header from "./components/Header"
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import PizzaBlock from "./components/PizzaBlock.jsx";
import { useEffect, useState } from "react";


function App() {
  const [pizzaItems, setPizzaItems] = useState([])
  const url = 'https://67e5487418194932a58561f5.mockapi.io/items'
  
  useEffect(() => {
    fetch(url).then((response) => response.json())
      .then(json => {
        setPizzaItems(json)
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
              pizzaItems.map((pizza) =>
                <PizzaBlock key={ pizza.id } { ...pizza }/>
              )
            }
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
