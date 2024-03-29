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

export const getServerUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://pets-server.onrender.com'
    } 
    return "http://localhost:8080";
  }

  export const convertPetStatus = (num) => {
    let status = "";
    switch (num) {
      case "1":
        status = "Available";
        break;
      case "2":
        status = "Fostered";
        break;
      case "3":
        status = "Adopted";
        break;
    }
    return status;
  }
