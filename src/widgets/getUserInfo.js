class UserInfo {
	constructor(name, focus) {
		this.name = name
		this.focus = focus;
	}

	//Set Name
	setName(e) {
		if(e.type === 'keypress') {
		    // Male sure enter is pressed
		    if(e.which == 13 || e.keyCode == 13) {
		        localStorage.setItem('name', e.target.innerText);
		        // name.blur(); 
		    }
		} else {
		    localStorage.setItem('name', e.target.innerText);
		}
	}

	//Get Name 
	getName(name) {
	    if(localStorage.getItem('name') === null) {
	        this.name.textContent = '[Enter Name]';
	    } else {
	        this.name.textContent = localStorage.getItem('name');
	    }
	}

	setFocus(e) {
	    if(e.type === 'keypress') {
	        // Make sure enter is pressed
	        if(e.which == 13 || e.keyCode == 13) {
	            localStorage.setItem('focus', e.target.innerText);
	            // focus.blur(); 
	        }
	    } else {
	        localStorage.setItem('focus', e.target.innerText);
	    }
	}

	// Get Focus
	getFocus(focus) {
	    if(localStorage.getItem('focus') === null) {
	        this.focus.textContent = '[Enter Focus]';
	    } else {
	        this.focus.textContent = localStorage.getItem('focus');
	    }
	}
}

module.exports = UserInfo;