import { FC, memo } from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
  id: number
  onClickCategory: (id: number) => void
}

const Categories: FC<CategoriesProps> = memo(({id, onClickCategory}) => {
  useWhyDidYouUpdate('Categories', {id, onClickCategory})

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ]

  return (
    <section className="categories">
      <ul>
        {
          categories.map((category, index) => (
            <li
              key={ index }
              onClick={ () => onClickCategory(index) }
              className={ id === index ? "active" : "" }
            >
              { category }
            </li>
          ))
        }
      </ul>
    </section>
  )
})

export default Categories