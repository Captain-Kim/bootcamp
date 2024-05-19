import { movieListAPI, handleSearch } from "./movie.js"
import { handleMenuSelect, handleScrollSave, handleScrollTop, handleScrollTo } from "./event.js"

const $pageUp = document.getElementById('pageUp');
const $mainMenus = document.getElementById("main_menus");
const $search = document.getElementById('search');
const $searchInput = document.getElementById('search_input');


addEventListener('scroll', handleScrollSave);
$search.addEventListener('submit', handleSearch);
if($pageUp){
    $pageUp.addEventListener('click', handleScrollTop);
}
if($mainMenus){
    $mainMenus.addEventListener('click', handleMenuSelect);
}

(async function init() {
    if($mainMenus){
        await movieListAPI();
    }    
    handleScrollTo();

    
    if(localStorage.getItem('search') !== null){
        $searchInput.value = localStorage.getItem('search');
        localStorage.removeItem('search');
        $search.dispatchEvent(new Event('submit'));
    }
})()

