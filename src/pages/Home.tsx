import { FC, useCallback } from "react";
import { useSelector } from "react-redux";

import {
  Categories,
  Pagination,
  PizzaBlock,
  Skeleton,
  Sort
} from "../components";

import { useGetPizzasQuery } from "../store/api/baseApi";
import { useAppDispatch } from "../store";
import { filterSelector } from "../store/filter/selectors";
import { setCategoryId, setCurrentPageCount } from "../store/filter/slice";
import { PizzaItem } from "../store/pizza/types";

const Home: FC = () => {
  const dispatch = useAppDispatch();

  const {
    categoryId,
    sort,
    currentPage,
    searchValue
  } = useSelector(filterSelector);

  const sortType = sort?.sortProperty;

  const {data = [], isLoading, isError} = useGetPizzasQuery({
    currentPage,
    category: categoryId,
    sortBy: sortType.replace("-", ""),
    order: sortType.includes("-") ? "asc" : "desc",
    search: searchValue ? `&search=${ searchValue }` : "",
  });

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [dispatch]);

  const changePage = (page: number) => {
    dispatch(setCurrentPageCount(page));
  };

  const pizzas = data.map((pizza: PizzaItem) => (
    <PizzaBlock key={ pizza.id } { ...pizza } />
  ));

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={ index }/>
  ));
  return (
    <div className="container">
      <section className="content__top">
        <Categories onClickCategory={ onClickCategory } id={ categoryId }/>
        <Sort/>
      </section>

      <h2 className="content__title">Все пиццы</h2>

      {
        isError ? <div className="content__error-info">
            <h2>Произошла ошибка <span>😕</span></h2>
            <p>
              К сожалению нам не удалось получить пиццы. Попробуйте повторить попытку позже, мы уже занимаемся
              исправлением данной ошибки
            </p>
          </div> :
          <section className="content__items">
            { isLoading
              ? skeleton
              : pizzas
            }
          </section>
      }


      <Pagination currentPage={ currentPage } onChangePage={ changePage }/>
    </div>
  );
};

export default Home;