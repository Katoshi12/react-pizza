import "./assets/scss/app.scss"
import Header from "./components/Header"
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import PizzaBlock from "./components/PizzaBlock.jsx";
import pizzaItem from "./assets/pizzas.json"

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <main className="content">
        <div className="container">
          
          <section className="content__top">
            {/*<Categories/>*/ }
            <Sort/>
          </section>
          
          <h2 className="content__title">Все пиццы</h2>
          
          <section className="content__items">
            {
              pizzaItem.map((pizza) =>
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
