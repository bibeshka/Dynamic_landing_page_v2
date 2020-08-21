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
			item.classList.remove('select');
		});
		targ.classList.add('select');
		texts.forEach(text => {
			text.style.display = "none";
		});
		let id = targ.getAttribute('data-id');
		root.querySelector('div[id=' + id + ']').style.display = 'block';
	}
}

module.exports = Settings;