import { Link } from "react-router";

import CartEmptyImg from "../../public/img/empty-cart.png";
import { routes } from "../routes";

const CartEmpty = () => {
  return (
    <div>
      <div className="cart cart--empty">
        <h2>Корзина пустая <span>😕</span></h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.<br/>
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={ CartEmptyImg } alt="Empty cart"/>
        <Link to={ routes.home() } className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  )
}

export default CartEmpty