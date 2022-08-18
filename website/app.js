/* Global Variables */
const example =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key for OpenWeatherMap API
const APIkey = "&appid=9fc434883a0a3879cf74a5704f9d48dc&units=imperial";

// javascript selectors
const generate = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const temp = document.getElementById("temp");
const date = document.getElementById("date");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", (event) => {
  event.preventDefault();
  const URL = `${baseURL}${zip.value}${APIkey}`;
  //   console.log(URL);
  getDate(URL)
    .then((data) => {
      wantedData(data).then((info) => {
        postData("/addData", info).then((data) => {
          retrieveData("/allData").then((data) => {
            updateHTML(data);
          });
        });
      });
    })
    .catch((err) => {});
});

const getDate = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    if (data.cod == 200) {
      return data;
    } else {
      console.log(data.massage);
    }
  } catch (error) {
    console.error(error);
  }
};

const wantedData = async (data) => {
  try {
    if (data.massage) {
      const msg = data.massage;
      // console.log(info);
      return msg;
    } else {
      const info = { newDate, feelings: feelings.value, temp: data.main.temp };
      //   console.log(info);
      return info;
    }
  } catch (error) {
    console.error(error);
  }
};
//post data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const retrieveData = async (url) => {
  const response = await fetch(url);
  try {
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const updateHTML = async (data) => {
  const response = await data;
  //   console.log(response);
  date.innerHTML = newDate;
  temp.innerHTML = response.temp;
  feelings.innerHTML = response.feelings;
};
