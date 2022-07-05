import Filters from '../../components/Filters/Filters'
import Search from '../../components/Search/Search'

const SearchAndFilters = ({search, pageNumber, filterGender, filterStatus, setPageNumber, setSearch, filterCharacters, setFilterGender, setFilterStatus, clear}) => {
  return (
    <div>
        <Search search={search} filterStatus={filterStatus} filterGender={filterGender} pageNumber={pageNumber} setPageNumber={setPageNumber} setSearch={setSearch} filterCharacters={filterCharacters}/>
        <Filters search={search} setSearch={setSearch} filterStatus={filterStatus} filterGender={filterGender} setPageNumber={setPageNumber} filterCharacters={filterCharacters} setFilterGender={setFilterGender} setFilterStatus={setFilterStatus} clear={clear}/>
    </div>
  )
}

export default SearchAndFilters