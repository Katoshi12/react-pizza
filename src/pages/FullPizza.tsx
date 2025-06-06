import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { routes } from "../routes";

const FullPizza: FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [pizza, setData] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPizza = async () => {
      try {
        const {data} = await axios.get(`https://67e5487418194932a58561f5.mockapi.io/items?id=${ id }`);
        if (data.length > 0) {
          setData(data[0]);
        }
      } catch (e) {
        alert("Ошибка при получении пиццы");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    getPizza();
  }, [id, navigate]);

  if (loading || !pizza) {
    return <Loading/>;
  }

  return (
    <div className="container">
      <section className="pizza-block-wrapper">
        <div className="pizza-block" style={ {maxWidth: 500, marginBottom: 0} }>
          <img className="pizza-block__image" src={ pizza.imageUrl } alt={ pizza.title }/>
          <h4 className="pizza-block__title">{ pizza.title }</h4>

          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от { pizza.price } ₽</div>
            <Link to={ routes.home() }
                  className="button button--outline button--add">
              <span>Назад</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullPizza;
