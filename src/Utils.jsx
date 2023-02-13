export const capFirstLetters = (str) => {
    if (str.split(" ").length === 1 && /A-Z/.test(str)) {
        return str;
    } else {
        const arr = str.toLowerCase().split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const styledStr = arr.join(" ");
        return styledStr;
    }
}

