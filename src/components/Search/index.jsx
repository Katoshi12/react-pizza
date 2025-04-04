import styles from "./search.module.scss"
import { useContext } from "react";
import { SearchContext } from "../../App.jsx";

const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)

  return (
    <div className={ styles.root }>
      <svg
        className={ styles.icon }
        height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
      </svg>
      <input
        value={ searchQuery }
        onChange={ event => setSearchQuery(event.target.value) }
        className={ styles.input }
        placeholder="Поиск пиццы..."
      />
      { searchQuery && (
        <svg onClick={ () => setSearchQuery('') } className={ styles.clearIcon } viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
        </svg>
      ) }
    </div>
  )
}

export default Search