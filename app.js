window.addEventListener('load', ()=>{
 let long;
 let lat;
 let tempDegree = document.querySelector('.temperature-degree');
 let locationTz = document.querySelector('.location-timezone');
 let tempDesc = document.querySelector('.temperature-decreption');
 let tempSec = document.querySelector('.temperature');
 const tempSpan = document.querySelector('.temperature span');
 if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.darksky.net/forecast/58f5c7f39a0d44eeb79946dc05a733cb/${lat},${long}`;
        fetch(api)
         .then(response =>{ return response.json();
         })
         .then( response => {
             const{temperature, summary, icon } = response.currently;
            tempDegree.textContent = temperature;
            tempDesc.textContent = summary;
            locationTz.textContent = response.timezone;
            let celsius = (temperature - 32) *(5/9);
            setIcons(icon, document.querySelector('.icon'));
            tempSec.addEventListener('click', () =>{
                    if(tempSpan.textContent==="F"){
                        tempSpan.textContent = "C";
                        tempDegree.textContent = Math.floor(celsius);
                    }else{
                        tempSpan.textContent = "F";
                        tempDegree.textContent = temperature;
                    }
            });

         });
    });
 }

 function setIcons(icon, iconID){
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g,"_").toUpperCase();
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
 }
});