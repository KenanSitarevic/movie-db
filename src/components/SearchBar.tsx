import {useCallback} from 'react';
import debounce from 'lodash.debounce';

const SearchBar = (props: {search : (input:string)=>void}) => {

  const handleDebounceFn = (inputValue:string) => {
     props.search(inputValue)
  }

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    debounceFn(e.target.value);
  }

  return (
    <input type="text" onChange={handleSearch} className='full-width font-subtitle padding-half margin-0 outline-active border-0' placeholder='Search...' />
  )
}

export default SearchBar