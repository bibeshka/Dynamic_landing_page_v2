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

module.exports = { currancyWidget };