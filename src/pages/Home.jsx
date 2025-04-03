import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import PizzaBlock from "../components/PizzaBlock/index.jsx";
import {useEffect, useState} from "react";

const Home = () => {
    const [pizzaItems, setPizzaItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const url = 'https://67e5487418194932a58561f5.mockapi.io/items'

    useEffect(() => {
        fetch(url).then((response) => response.json())
            .then(json => {
                setPizzaItems(json)
                setIsLoading(false)
            })
      window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container">
            <section className="content__top">
                <Categories/>
                <Sort/>
            </section>

            <h2 className="content__title">Все пиццы</h2>

            <section className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : pizzaItems.map(pizza => (
                            <PizzaBlock key={pizza.id} {...pizza} />
                        ))
                }
            </section>
        </div>
    )
}

export default Home;