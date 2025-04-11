import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories.js";
import Sort from "../components/Sort.js";
import Skeleton from "../components/PizzaBlock/Skeleton.js";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import { useAppDispatch } from "../store";
import { filterSelector } from "../store/filter/selectors";
import { setCategoryId, setCurrentPageCount } from "../store/filter/slice";
import { pizzaSelector } from "../store/pizza/selectors";
import { fetchPizza } from "../store/pizza/asyncAction";

const Home: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const isMounted = useRef<boolean>(false);
  // const isSearch = useRef<boolean>(false);

  const {
    categoryId,
    sort,
    currentPage,
    searchValue
  } = useSelector(filterSelector);
  const sortType = sort?.sortProperty

  const {items, status} = useSelector(pizzaSelector);


  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [])

  const changePage = (page: number) => {
    dispatch(setCurrentPageCount(page));
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sortList = list.find((obj) => obj.sortProperty ===
  // params.sortBy);  dispatch(setFilters({ searchValue: params.search,
  // categoryId: Number(params.categoryId), currentPage:
  // Number(params.currentPage), sort: sortList || list[0], }))
  // isSearch.current = false; } }, []);


  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${ categoryId }` : "";
    const search = searchValue ? `&search=${ searchValue }` : "";

    dispatch(
      fetchPizza({
        sortBy,
        order,
        category,
        search,
        currentPage
      })
    )
  }

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);


  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //
  //     navigate(`?${ queryString }`);
  //   }
  //
  //   if (!window.location.search) {
  //     dispatch(fetchPizza({} as FetchData))
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);

  const pizzas = items.map((pizza: any) => <PizzaBlock
    key={ pizza.id } { ...pizza }/>)
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={ index }/>)

  return (
    <div className="container">
      <section className="content__top">
        <Categories onClickCategory={ onClickCategory } id={ categoryId }/>
        <Sort/>
      </section>

      <h2 className="content__title">Все пиццы</h2>

      {
        status === 'error' ? <div className="content__error-info">
            <h2>Произошла ошибка <span>😕</span></h2>
            <p>
              К сожалению нам не удалось получить пиццы. Попробуйте повторить попытку позже, мы уже занимаемся
              исправлением данной ошибки
            </p>
          </div> :
          <section className="content__items">
            { status === 'loading'
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