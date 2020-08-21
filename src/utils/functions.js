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

module.exports = {
  change_Vidget_Position,
  showBlock,
  logoutAndDeleteLocalStorage
}