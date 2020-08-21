class PassGenerator {
	constructor() {
		this.numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
		this.lowerCaseArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
		this.upperCaseArray = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
		this.specialCharactersArray = ['!', '@', '#', '$', '%', '^', '&', '*'];
	}

	generatePass() {
  		document.getElementById('param-1').oninput = (e) => {
    		document.getElementById("password-length").innerHTML = e.value;
  		}

		let result = [];

		if(document.querySelector('#param-2').checked) {
			result = result.concat(this.numbersArray);
		}

		if(document.querySelector('#param-3').checked) {
			result = result.concat(this.lowerCaseArray);
		}

		if(document.querySelector('#param-4').checked) {
			result = result.concat(this.upperCaseArray);
		}

		if(document.querySelector('#param-5').checked) {
			result = result.concat(this.specialCharactersArray);
		}

		if(result.length === 0) {
			return document.querySelector('#out').innerHTML = `<p>Choose settings</p>`
		}

		result.sort(PassGenerator.compareRandom);
		console.log(result);
		let pass = '';
		//value of array length
		let passLength = parseInt(document.querySelector('#param-1').value);

		for(let i = 0; i < passLength; i++) {
      		pass += result[PassGenerator.randomInteger(0, result.length - 1)];
    	}

		console.log(pass);
		document.querySelector('#out').innerHTML = `<p>${pass}</p>`;
	}

	static compareRandom() {
		return Math.random() - 0.5;
	}

	static randomInteger(min, max) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand);
		return rand;
	}
}

module.exports = PassGenerator;