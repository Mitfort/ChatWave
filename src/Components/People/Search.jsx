import SearchIcon from '@mui/icons-material/Search';

const Search = ({setSearchedFriend}) => {

  const handleSearching = (e) => {
    setSearchedFriend(e.target.value);
  };

  return (
    <div className="search">
      <SearchIcon/>
      <input type="text" name="" id="searchInput" placeholder='Enter for search' onInput={(e) => handleSearching(e)}/>
    </div>
  )
}
export default Search