import { render } from "@testing-library/react";
import refresh from '../../assets/refresh.png'
import '../../styles/search.css'

function SearchSection(){
    return(
        <div id="search-section">
            <p>Rechercher</p>
            <input type="text" name="" id="search" />
            <img src={refresh} alt="" id="refresh"/>
            <p className="user">{localStorage.getItem('user')??''}</p>
        </div>
    )
}

export default SearchSection