let data = [
    {
        price: 20,
        quantity: 25,
        option: "yes",
    },
    {
        price: 12,
        quantity: 25,
        option: "yes",
    },
    {
        price: 20,
        quantity: 25,
        option: "no",
    },
    {
        price: 15,
        quantity: 25,
        option: "yes",
    },
    {
        price: 15,
        quantity: 5,
        option: "no",
    },
];

const combinedData = [];
const priceQuantityMap = new Map();

data.forEach(item => {
    const { price, quantity } = item;
    if (priceQuantityMap.has(price)) {
        priceQuantityMap.set(price, priceQuantityMap.get(price) + quantity);
    } else {
        priceQuantityMap.set(price, quantity);
    }
});

priceQuantityMap.forEach((quantity, price) => {
    combinedData.push({
        price: parseInt(price),
        quantity,
        option: 'yes'
    });
});

console.log(combinedData);
