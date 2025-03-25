import "./scss/app.scss"
import Header from "./components/Header"
import Categories from "./components/Categories"
import Sort from "./components/Sort"
import PizzaBlock from "./components/PizzaBlock.jsx";

function App() {
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
            <PizzaBlock title="Арабская" price="700"/>
            <PizzaBlock title="Немецкая" price="600"/>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
