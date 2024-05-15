import {useCallback} from 'react';
import debounce from 'lodash.debounce';
import { useGlobalContext } from '../contexts/GlobalContext'

const SearchBar = (props: {search : (input:string)=>void}) => {
  const { searchInput, setSearchInput} = useGlobalContext()

  const handleDebounceFn = (inputValue:string) => {
    if (inputValue.length > 2)
    props.search(inputValue)

  }

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchInput(e.target.value)
    debounceFn(e.target.value);
  }

  return (
    <input value={searchInput} type="text" onChange={handleSearch} className='full-width font-subtitle padding-half margin-0 outline-active border-0' placeholder='Search...' />
  )
}

export default SearchBar