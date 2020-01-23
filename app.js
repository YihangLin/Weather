window.addEventListener('load', () =>{
    let long;
    let lat;
    let description = document.querySelector('.description');
    let tempNumber = document.querySelector('.number');
    let localTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/187556225c223be4aa0b2a2a5bfe78a4/${lat},${long}`;

            fetch(api)
                .then(response => {
                   return response.json(); 
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary} = data.currently;
                    tempNumber.textContent = ((temperature - 32) / 1.8).toPrecision(2);
                    description.textContent = summary;
                    localTimezone.textContent = data.timezone;
                });

        });
    }
   
});