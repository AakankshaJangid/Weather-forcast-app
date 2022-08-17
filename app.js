const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infotxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");

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
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=34194d93f8d7bf1b6440538925ae9a37`;
    fetchData();

}

function onError(error){
    infotxt.innerText = error.message;
    infotxt.classList.add("error");

}

function requestApi(city){       
     api = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit&appid=34194d93f8d7bf1b6440538925ae9a37`;
    fetchData();
    
}
function fetchData(){
    infotxt.innerText = "Getting weather details..."
    infotxt.classList.add("pending");
    //getting api response and returning it with parsing into js obj and in another 
    //then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}
function weatherDetails(info){
   /* infotxt.classList.replace("pending","error");
    if(info.cod == "404"){
        infotxt.innerText = `${inputField.value} isn't a valid city name.`
    }else{
        infotxt.classList.remove("pending","error");
        console.log(info)
    }*/
    console.log(info)

}


