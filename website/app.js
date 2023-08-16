/* Global Variables */
const apiKey = '2aabe57eb5e5845f7d24cb9add6b42ce&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();




document.querySelector("#generate").addEventListener("click", (e) => {
    console.log("click");
    //    getWeather();
    sendData();
    //retrieveData();
})

const getWeather = async() => {

    const zipcode = document.querySelector('#zip').value;

    console.log("i got zip code", zipcode);

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${zipcode}&appid=${apiKey}`);
    const data = await response.json();
    const { lat, lon } = data[0];
    console.log(lat, lon);
    //fetch(url);

    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data2 = await response2.json();
    console.log("check", data2);

    //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    //fetch(url);
    return data2.main.temp;
}



const retrieveData = async() => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
            // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.user_response;
        document.getElementById("date").innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const sendData = async() => {
    const temp = await getWeather();
    const feelings = document.querySelector("#feelings").value;
    const date = new Date();

    //console.log(temp, feelings, date)

    const response = await fetch('/data', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            temp: temp,
            user_response: feelings,
            date: date
        }), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    retrieveData();
}