import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, SortPropertyEnums } from "../store/slices/filterSlice.js";

type SortItemType = {
  name: string
  sortProperty: SortPropertyEnums
}

export const list: SortItemType[] = [
  {
    sortProperty: SortPropertyEnums.Rating_DESC,
    name: 'популярности (DESC)',
  },
  {
    sortProperty: SortPropertyEnums.Rating_ASC,
    name: 'популярности (ASC)',
  },
  {
    sortProperty: SortPropertyEnums.PRICE_DESC,
    name: 'цене(DESC)',
  },
  {
    sortProperty: SortPropertyEnums.PRICE_ASC,
    name: 'цене(ASC)',
  },
  {
    sortProperty: SortPropertyEnums.TITLE_DESC,
    name: 'алфавиту',
  },
  {
    sortProperty: SortPropertyEnums.TITLE_ASC,
    name: 'алфавиту(ASC)',
  },
]

const Sort: FC = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const sort = useSelector(state => state.filterSlice.sort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false)

  const openItems = (obj: SortItemType): void => {
    dispatch(setSortType(obj))
    setVisible(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setVisible(false)
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [])
  return (
    <section ref={ sortRef } className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={ () => setVisible(!visible) }>{ sort.name }</span>
      </div>
      {
        visible && (
          <div className="sort__popup">
            <ul>
              {
                list.map((item, index) => (
                  <li
                    key={ index }
                    onClick={ () => openItems(item) }
                    className={ sort.sortProperty === item.sortProperty ? 'active' : '' }>
                    { item.name }
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </section>
  )
}

export default Sort