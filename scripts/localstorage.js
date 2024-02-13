const saveToLocalStorage = (name) => {
    //favorites will get the current values in local storage
    //AKA saves the array in favorites
    let favorites = getlocalStorage();

    if(name){
        //If the name is already included in the local storage we will not push into favorites
    if(!favorites.includes(name)) {
        favorites.push(name);
    }
    //JSON.stringify insures what ever we save into local storage is a string
    localStorage.setItem("NameList", JSON.stringify(favorites));
    }
    
}

const getlocalStorage = () => {
    //Getting our values from local storage
    let localStorageData = localStorage.getItem("NameList");

    //We check if that data is null if so we retun an empty array
    if(localStorageData == null){
        return [];
    }
    // We return an array of local storage.
    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (name) => {
    //We're saving local storage data into favorites variable
    let favorites = getlocalStorage();

    //We're finding the Index of our parameter (name)
    let namedIndex = favorites.indexOf(name);
    if(name){
        //remove the name from the array using the .splice method
    favorites.splice(namedIndex, 1);

    //We set our new mutated favotires array inside our local storage.
    localStorage.setItem("NameList", JSON.stringify(favorites))
    }
    
}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage};