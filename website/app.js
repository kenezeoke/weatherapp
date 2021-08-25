/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=7a0de9fba479c06b217bba9d669b22a0';


document.getElementById('generate').addEventListener('click', performAction);



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();


function performAction() {
  let zipCode =  document.getElementById('zip').value;
  const uservalue = document.getElementById('feelings').value;
  getOpenWeatherMap (baseURL, zipCode, apiKey)
  .then(function(data){
    console.log(data)
    let newData = { temp: data.main.temp, date: newDate, userresponse:uservalue};
    postData('/', newData)
  .then (
    updateUI()
  )
  })
};

//Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.


const getOpenWeatherMap = async (baseURL, zipCode, apiKey)=>{
  const res = await fetch(baseURL+zipCode+apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
    // 1. We can do something with our returned data here-- like chain promises!

    // 2.
    // postData('/addAnimal', data)
  }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
  }
}

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

    try {
      const newData = await response.json();
      return newData;
    }
    catch(error) {
    console.log("error", error);
    }
};

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.userresponse;

  }catch(error){
    console.log("error", error);

  }
}
