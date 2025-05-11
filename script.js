        const searchButton = document.getElementById('search');
        const searchInput = document.querySelector('.input-container input');
        const temperatureElem = document.querySelector('.temprature');
        const locationElem= document.querySelector('.location');
        const emojiElem = document.querySelector('.emoji');
        searchButton.addEventListener('click', async function() {
            const location = searchInput.value;
            if (location) {
                const data = await fetchWeatherData(location);
                    // fetchWeatherData(location).then((data) => {
                    //     updateDOM(data);
                    // })
                if(data){
                   updateDOM(data);
                }
                else{
                    //updateDOM(data);
                    alert('Unable to fetch weather data.');
                }
                searchInput.value = ''; // Clear the input field after search
            }
        });

        async function fetchWeatherData(location){
            const url =`http://api.weatherapi.com/v1/current.json?key=baba38db925b49c9895105718250405&q=${location}&aqi=no`;
            const response = await fetch(url);
            if (response.status==404) {
                alert('Location not found');
            } else if(response.status==200){
                const json = await response.json();
                return json;
            }
        }

        function updateDOM(data){
            console.log("I will update the UI with this data",data);
            const temp=data.current.temp_c;
            const location = data.location.name;
            const timeData = data.location.localtime;
            const [date,time] = timeData.split(' ');
            const icon = data.current.condition.icon;
            const condition = data.current.condition.text;
            console.log(temp,location,date,time,icon,condition);
            temperatureElem.textContent = temp;
            locationElem.textContent = location;
            emojiElem.src = icon;
        }

