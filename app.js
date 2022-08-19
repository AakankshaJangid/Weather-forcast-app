const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infotxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");


inputField.addEventListener("keyup",e =>{   
    //if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)    
    }

});
let api;
locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){//if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }else{
        alert("Your browser not support geolocation api");
    }
})

function onSuccess(position){
    const {latitude,longitude} = position.coords;
    //getting lat and lan of users device from coords obj
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=34194d93f8d7bf1b6440538925ae9a37`;
    fetchData();

}

function onError(error){
    infotxt.innerText = error.message;
    infotxt.classList.add("error");

}

function requestApi(city){       

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=34194d93f8d7bf1b6440538925ae9a37`;
    fetchData1();
    
}
function fetchData1(){
    infotxt.innerText = "Getting weather details..."
    infotxt.classList.add("pending");
    //getting api response and returning it with parsing into js obj and in another 
    //then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails1(result));
}
 

function fetchData(){
    infotxt.innerText = "Getting weather details..."
    infotxt.classList.add("pending");
    //getting api response and returning it with parsing into js obj and in another 
    //then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
    infotxt.classList.replace("pending","error");
    if(info == ""){
        infotxt.innerText = `${inputField.value} isn't a valid city name.`
    }else{
        //lets get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;
        //using ustom icons according to the id which api return us 
        if(id == 800){
            wIcon.src = "icons/clear.svg"
        }else if(id >= 200 && id<=232){
            wIcon.src = "icons/strom.svg"
        }else if(id >= 600 && id<=622){
            wIcon.src = "icons/snow.svg"
        }else if(id >= 701 && id<=781){
            wIcon.src = "icons/haze.svg"
        }else if(id >= 801 && id<=804){
            wIcon.src = "icons/clouds.svg"
        }else if((id >= 300 && id<=321) || (id >= 500 && id<=531)){
            wIcon.src = "icons/rain.svg"
        }

        //let pass these value to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        infotxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
    console.log(info)

}

function weatherDetails1(info){
    infotxt.classList.replace("pending","error");
    if(info == ""){
        infotxt.innerText = `${inputField.value} isn't a valid city name.`
    }else{
        //lets get required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;
        //using ustom icons according to the id which api return us 
        if(id == 800){
            wIcon.src = "icons/clear.svg"
        }else if(id >= 200 && id<=232){
            wIcon.src = "icons/strom.svg"
        }else if(id >= 600 && id<=622){
            wIcon.src = "icons/snow.svg"
        }else if(id >= 701 && id<=781){
            wIcon.src = "icons/haze.svg"
        }else if(id >= 801 && id<=804){
            wIcon.src = "icons/clouds.svg"
        }else if((id >= 300 && id<=321) || (id >= 500 && id<=531)){
            wIcon.src = "icons/rain.svg"
        }


        //let pass these value to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        infotxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
    console.log(info)

}


arrowBack.addEventListener("click",() =>{
    wrapper.classList.remove("active");
});