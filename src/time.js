class Time {

	constructor (time) {
		this.time = time;
	}

 	showTime() {
		setInterval(this.displayTime, 1000);
		this.setBgGreet();
	}

	displayTime(time) {	
		let today = new Date(),
        	hour = today.getHours(),
        	min = today.getMinutes(),
        	sec = today.getSeconds();
        //Set AM or PM
	    // const amPm = hour >= 12 ? 'PM' : 'AM';

	    // 12hr Format
	    hour = hour % 24 || 12;
	    if(hour >= 24) { hour = 0; }
	    //Output time
	    this.time.innerHTML = `${Time.addZero(hour)}<span>:</span>${Time.addZero(min)}<span>:</span>${Time.addZero(sec)} `;

	}

	//Add Zeroes
	static addZero(n) {
		return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}
    
    // Set Background and Greeting
	setBgGreet() {
	    let today = new Date(),
	        hour = today.getHours();

	    if(hour < 12 && hour > 6) {
	        //Morning
	        document.body.style.backgroundImage = "url(../public/img/lake-morning-fog-1.jpg)";
	        greeting.textContent = 'Good Morning';
	        document.body.style.color = 'white';
	    } else if(hour < 18 && hour >= 12) {
	        //Afternoon
	        document.body.style.backgroundImage = "url(../public/img/mXdUbbn.jpg)";
	        greeting.textContent = 'Good Afternoon';
	        //If image dark on this, if not off
	        document.body.style.color = 'white';
	    } else {
	        //Evening
	        document.body.style.backgroundImage = "url(../public/img/night.jpeg)";
	        greeting.textContent = 'Good Evening';
	        document.body.style.color = 'white';
	    }
	}
}

module.exports = Time; 