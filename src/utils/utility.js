function replaceCharAt(str, index, char) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + char + str.substr(index + 1);
}

function storeToHistory (result) {
    let history = localStorage.getItem("history"); // get history from local storage
    if (history) {  // if history exists
        history = JSON.parse(history); // parse history
    } else { // if history does not exist
        history = []; // set history to empty array
    }
    history.push(result) // push history to array
    localStorage.setItem("history", JSON.stringify(history)) // set history to local storage
}

export { replaceCharAt, storeToHistory };
