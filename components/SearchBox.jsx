export default function SearchBox(){
    return <form className="search-box-container">
    <input type="search" id="search-box" placeholder="search here..." />
    <label htmlFor="search-box" className="fas fa-search" />
  </form>
}