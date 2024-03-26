const baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('.btn');
const fromCurr = document.querySelector('#from');
const toCurr = document.querySelector('#to');
const exchangeText = document.querySelector('.exchange-text');

for (let dropdown of dropdowns) {
    for (currCode in countryList) {
        const newOption = document.createElement('option');
        newOption.value = currCode;
        newOption.append(currCode);

        if (dropdown.name === 'from' && currCode === 'USD') {
            newOption.selected = 'selected';
        }
        if (dropdown.name === 'to' && currCode === 'INR') {
            newOption.selected = 'selected';
        }
        dropdown.append(newOption);
    }

    dropdown.addEventListener('change', (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    const flag = element.previousElementSibling;
    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

const updateExchangeRate = async () => {
    const amount = document.querySelector('#amount');
    let amountValue = amount.value;
    if (amountValue == '' || amountValue < 0) {
        amountValue = 1;
        amount.value = '1';
    }
    
    const finalURL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const res = await axios.get(finalURL);
    const exchangeRate = res.data[toCurr.value.toLowerCase()];
    const text = `${amountValue} ${fromCurr.value} = ${amountValue * exchangeRate} ${toCurr.value}`;
    exchangeText.innerText = text;
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    updateExchangeRate();    
})

window.addEventListener('load', () => {
    updateExchangeRate();
})

