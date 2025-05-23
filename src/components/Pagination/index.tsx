import ReactPaginate from 'react-paginate';
import {FC} from "react";

import styles from './pagination.module.scss'

type PaginationProps = {
  currentPage: number
  onChangePage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({currentPage, onChangePage}) => {
  return (
    <div>
      <ReactPaginate
        className={ styles.root }
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={ 4 }
        pageCount={ 3 }
        forcePage={currentPage - 1}
        renderOnZeroPageCount={ null }
      />
    </div>
  )
}

export default Pagination;