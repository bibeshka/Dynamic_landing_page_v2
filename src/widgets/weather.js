class Weather {
	constructor(temperatureDescription, temperatureDegree, locationTimezone) {
		this.temperatureDescription = temperatureDescription;
		this.temperatureDegree = temperatureDegree;
		this.locationTimezone = locationTimezone;
	}

	displayWeather() {
		let long;
		let lat;

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition( async position => {
				long = position.coords.longitude;
				lat = position.coords.latitude;

				const proxy = "https://cors-anywhere.herokuapp.com/";
				const api = `${proxy}https://api.darksky.net/forecast/046b7effa91c6db2a1e0cb81a80bbb7a/${lat},${long}`;
				const result = await fetch(api);
				let data = await result.json();
				const {temperature, summary, icon} = data.currently;
				//Set DOM Elements from the API
				this.temperatureDegree.textContent = ((temperature - 32) / 1.8).toFixed(1);
				this.temperatureDescription.textContent = summary;
				this.locationTimezone.textContent = data.timezone;
				//Set Icon
				Weather.setIcon(icon, document.querySelector('.icon'));
			})
		} else {
			h2.textContent = "This is not working in your browser";
		}
	}

	static setIcon(icon, iconID) {
		const skycons = new Skycons({color:"white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
}

module.exports = Weather;