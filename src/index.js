import Time from './time.js';
// import Skycons from './skycons.js';

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


				// fetch(api).then(respinse => {
				// 	return respinse.json()
				// }).then(data => {
				// 	const {temperature, summary, icon} = data.currently;
				// 	//Set DOM Elements from the API
				// 	this.temperatureDegree.textContent = ((temperature - 32) / 1.8).toFixed(1);
				// 	this.temperatureDescription.textContent = summary;
				// 	this.locationTimezone.textContent = data.timezone;
				// 	//Set Icon
				// 	Weather.setIcon(icon, document.querySelector('.icon'));
				// })
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

class Todo {
	constructor(todoInput, todoAddButton , todoUl) {
		this.todoInput = todoInput;
		this.todoAddButton = todoAddButton;
		this.todoUl = todoUl;
	}

	createTodo() {
		const li = document.createElement("li");
		const textSpan = document.createElement("span");
		textSpan.classList.add('todo-text');
		const newTodo = this.todoInput.value;
		textSpan.append(newTodo);
		li.append(textSpan)
		this.todoUl.append(li);

		const deleteBtn = document.createElement("span");
		deleteBtn.classList.add("todo-trash");
		const icon = document.createElement("i");
		icon.classList.add("fas", "fa-trash-alt");
		deleteBtn.appendChild(icon);

		this.todoUl.appendChild(li).append(textSpan, deleteBtn);
		this.todoInput.value = "";
		Todo.deleteTodo(deleteBtn);

		localStorage.setItem("todos", this.todoUl.innerHTML);
	}

	static deleteTodo(element) {
		element.addEventListener("click", (event) => {
			element.parentElement.remove();
			event.stopPropagation();
		})
	}

	onClickTodo(event, ul) {
		if(event.target.tagName === "LI") {
			event.target.classList.toggle("checked");
			localStorage.setItem("todos", ul.innerHTML);
		}
	}

	loadTodo() {
		const data = localStorage.getItem("todos");
		if(data) {
			this.todoUl.innerHTML = data;
		}
		const deleteButtons = document.querySelectorAll("span.todo-trash");
		for(const button of deleteButtons) {
			Todo.deleteTodo(button);
		}		
	}

}

class Settings {
	constructor(tabs) {
		this.tabs = tabs;
	}

	createTabs() {
		let items = this.tabs.querySelectorAll('.li_settings');
		let texts = this.tabs.querySelectorAll('.settings-tabs');
		this.tabs.addEventListener('click',(e) => Settings.runSetting(e, items, texts, this.tabs));
	}

	static runSetting(event, items, texts, root) {
		let targ = event.target;
		if (targ.tagName !== 'LI') return;
		let select = 'li_settings-select';
		items.forEach(item => {
			item.classList.remove('select')
		})
		// for (let i = 0; i < items.length; i++) {
		// 	items[i].classList.remove('select');
		// }
		targ.classList.add('select');
		texts.forEach(text => {
			text.style.display = "none";
		})
		// for (let i = 0; i < texts.length; i++) {
		// 	texts[i].style.display = 'none'
		// } 
		let id = targ.getAttribute('data-id');
		root.querySelector('div[id=' + id + ']').style.display = 'block';
	}
}

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

// function currancyWidget(currency_block) {
// 	const proxy = "https://cors-anywhere.herokuapp.com/";
//     const api = `${proxy}https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3`;
//     fetch(api).then(responsive => {
//         return responsive.json();
//     }).then(data => {
//         data.forEach(element => {
//             const currency_container = document.createElement('div');
//             currency_container.setAttribute('class', 'currency-container');

//             const currency_code = document.createElement('h4');
//             currency_code.setAttribute('class', 'currency-code');
//             currency_code.textContent = `${element.ccy} : `;
            
//             const buy_rate = document.createElement('p');
//             buy_rate.setAttribute('class', 'buy-rate');
//             buy_rate.textContent = `Buy : ${parseFloat(element.buy).toFixed(2)}`;
            
//             const sale_rate = document.createElement('p');
//             sale_rate.setAttribute('class', 'sale-rate');
//             sale_rate.textContent = `Sale : ${parseFloat(element.sale).toFixed(2)}`;
            
//             currency_block.appendChild(currency_container);
//             currency_container.appendChild(currency_code);
//             currency_container.appendChild(buy_rate);
//             currency_container.appendChild(sale_rate);
//         });

//     });
// }

async function currancyWidget(currency_block) {
	const proxy = "https://cors-anywhere.herokuapp.com/";
	const api = `${proxy}https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3`;
	const result = await fetch(api);
	let data = await result.json();
	
	data.forEach(element => {
        const currency_container = document.createElement('div');
        currency_container.setAttribute('class', 'currency-container');

        const currency_code = document.createElement('h4');
        currency_code.setAttribute('class', 'currency-code');
        currency_code.textContent = `${element.ccy} : `;
            
        const buy_rate = document.createElement('p');
        buy_rate.setAttribute('class', 'buy-rate');
        buy_rate.textContent = `Buy : ${parseFloat(element.buy).toFixed(2)}`;
            
        const sale_rate = document.createElement('p');
        sale_rate.setAttribute('class', 'sale-rate');
        sale_rate.textContent = `Sale : ${parseFloat(element.sale).toFixed(2)}`;
            
        currency_block.appendChild(currency_container);
        currency_container.appendChild(currency_code);
        currency_container.appendChild(buy_rate);
        currency_container.appendChild(sale_rate);
    });
}

function change_Vidget_Position(e ,block, name) {
	block.style.position = 'absolute';
	moveAt(e);
	document.body.appendChild(block);

	block.style.zIndex = 1000;

	function moveAt(e) {
		block.style.left = e.pageX - block.offsetWidth / 2 + 'px';
		block.style.top = e.pageY - block.offsetHeight / 2 + 'px';

		//save to localStorageTest
		localStorage.setItem(`position_${name}_top`, block.style.top);
		localStorage.setItem(`position_${name}_left`, block.style.left);
	}

	document.onmousemove = function(e) {
		moveAt(e);
	}

	block.onmouseup = function() {
		document.onmousemove = null;
		block.onmouseup = null;
	}
}

//Show block by click
function showBlock(block, name) {
	if(block.style.display === "none") {
		block.style.display = "block";
		if(name) {
			localStorage.setItem(`${name}_check`, 'on');
		}
	} else {
		block.style.display = "none";
		if(name) {
			if(localStorage.getItem(`${name}_check`)) {
				localStorage.removeItem(`${name}_check`);
				localStorage.removeItem(`position_${name}_top`);
				localStorage.removeItem(`position_${name}_left`);

			}
		}
	}
}

function logoutAndDeleteLocalStorage() {
	localStorage.removeItem('passGenerator_block_check');
	localStorage.removeItem('position_passGenerator_block_left');
	localStorage.removeItem('position_passGenerator_block_top');
	localStorage.removeItem('currency_block_check');
	localStorage.removeItem('position_currency_block_top');
	localStorage.removeItem('position_currency_block_left');
	localStorage.removeItem('name');
	localStorage.removeItem('focus');
	localStorage.removeItem('todos');
}


//Main functions
function eventListeners () {
	//*** USER INFO ***
	const $name = document.querySelector('#name');
	const $focus = document.querySelector('#focus');

	const user_info = new UserInfo($name, $focus);

	user_info.getName();
	user_info.getFocus();

	$name.addEventListener('keypress', user_info.setName);
	$name.addEventListener('blur', user_info.setName)
	$focus.addEventListener('keypress', user_info.setFocus);
	$focus.addEventListener('blur', user_info.setFocus);
	
	// *** TIME ***
	const $time = document.querySelector('#time');

	const time_show = new Time($time);
	time_show.showTime();

	// *** WEATHER ***
	const $todo_show = document.querySelector("#btnToDo");
	const $todo_block = document.querySelector('.todo-app');
	$todo_show.addEventListener('click', () => showBlock($todo_block));

	const $temperatureDescription = document.querySelector(".temperature-description");
	const $temperatureDegree = document.querySelector(".temperature-degree");
	const $locationTimezone = document.querySelector(".location-timezone");

	const weather = new Weather($temperatureDescription, $temperatureDegree, $locationTimezone);
	weather.displayWeather();

	// *** TODO ***
	const $todoInput = document.querySelector('#myInput');
	const $todoAddButton = document.querySelector('.addBtn');
	const $todoUl = document.querySelector('#myUL');

	// const todo_addTodoBtn = document.querySelector('.addBtn');

	//adding todo
	const todo = new Todo($todoInput, $todoAddButton, $todoUl);
	$todoInput.addEventListener('keypress', (keyPress) => {
		const keyEnter = 13;
		if(keyPress.which === keyEnter) {
			todo.createTodo();
		}
	})
	// todo_addTodoBtn.addEventListener('click', todo.createTodo());

	//check todo
	$todoUl.addEventListener("click",(e) => {
		todo.onClickTodo(e, $todoUl);
	});

	//loading todo
	todo.loadTodo();

	// *** SETTINGS ***
	const $settings_show = document.querySelector(".setting_img");
	const $settings_block = document.querySelector('#tabs')

	$settings_show.addEventListener('click', () => showBlock($settings_block));

	const settings = new Settings($settings_block);
	settings.createTabs();

	// *** WIDGET ***

	//CURRENCY

	let $currency_show = document.querySelector('.switch_1');
	const $currency_block = document.querySelector('.exchange-rates');

	$currency_show.addEventListener('click', () => showBlock($currency_block, 'currency_block'));

	//check if block in localStorage
	if(localStorage.getItem('currency_block_check') === 'on' ) {
		$currency_block.style.display = 'block';
		$currency_show.checked = !0;
	}

	//get block position from localStorage
	if(localStorage.getItem('position_currency_block_top')) {
		$currency_block.style.top = localStorage.getItem('position_currency_block_top');
		console.log($currency_block.style.top);
	}

	if(localStorage.getItem('position_currency_block_left')) {
		$currency_block.style.left = localStorage.getItem('position_currency_block_left');
		console.log($currency_block.style.left);
	}

	//change block position
	$currency_block.addEventListener('mousedown', (e) => 
		change_Vidget_Position(e, $currency_block, 'currency_block')
	);

	currancyWidget($currency_block);

	//PASS GENERATOR

	const $passGenerator_show = document.querySelector('#pass-generator-show');
	const $passGenerator_block = document.querySelector('.pass-generator');

	$passGenerator_show.addEventListener('click', () => 
		showBlock($passGenerator_block, 'passGenerator_block')
	);

	//check if block in localStorage
	if(localStorage.getItem('passGenerator_block_check') === 'on' ) {
		$passGenerator_block.style.display = 'block';
		$passGenerator_show.checked = !0;
	}

	//get block position from localStorage
	if(localStorage.getItem('position_passGenerator_block_top')) {
		$passGenerator_block.style.top = localStorage.getItem('position_passGenerator_block_top');
	}

	if(localStorage.getItem('position_passGenerator_block_left')) {
		$passGenerator_block.style.left = localStorage.getItem('position_passGenerator_block_left');
	}

	//change block position
	$passGenerator_block.addEventListener('mousedown', (e) => 
		change_Vidget_Position(e, $passGenerator_block, 'passGenerator_block')
	);

	const passGenerator = new PassGenerator();
	const $passGenerator_generateBtb = document.querySelector("#generator");

	$passGenerator_generateBtb.addEventListener('click', () => {
		passGenerator.generatePass();
	});


	//LOGOUT
	const $logout_btn = document.querySelector('.delete_local_storage');
	$logout_btn.addEventListener('click', logoutAndDeleteLocalStorage)
}


//STARTING Main function
document.addEventListener('DOMContentLoaded', () => {
	eventListeners();
});

