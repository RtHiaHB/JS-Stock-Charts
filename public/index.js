//let counter = 0;

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    //console.log(Chart);
    //I have to use mockData.js
    
    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    //stocks.forEach(stock => stock.values.reverse());
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map( value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    //console.log(stocks.map(function(stock) { return getHighestPrice(stock); }))
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: getSymbols(),
            datasets: [{
                label: "Highest price",
                data: stocks.map(function(stock) {
                    return getHighestPrice(stock);
                }),
                backgroundColor: getColors(),
                borderColor: getColors(),
            }],
        },
    });
    
    
}

main()

function getColor(stock) {
    if(stock === 'GME') {
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === 'MSFT') {
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === 'DIS') {
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === 'BNTX') {
        return 'rgba(166, 43, 158, 0.7)'
    }
}

function getHighestPrice(stock) {
    let highest = 0;
    // console.log(stock);
    stock.values.forEach(value => {
        // console.log(value.high)
        if(value.high > highest) {
            highest = value.high;
        }
    })
    // counter++;
    //console.log(stock.meta.symbol, highest, counter);
    return highest;
}

function getHighestPrices() {
    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    let highestPrices = [];
    stocks.forEach( stock => {
        let highestPrice = getHighestPrice(stock);
        highestPrices.push(highestPrice);
    })
    //counter++;
    return highestPrices
}

function getColors() {
    const { GME, MSFT, DIS, BNTX} = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    let colors = [];
    stocks.forEach( stock => {
        let color = getColor(stock.meta.symbol);
        colors.push(color);
    })
    return colors;
}

function getSymbols() {
    const { GME, MSFT, DIS, BNTX} = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    let symbols = [];
    stocks.forEach( stock => {
        let symbol = stock.meta.symbol;
        symbols.push(symbol);
    })
    return symbols;
}