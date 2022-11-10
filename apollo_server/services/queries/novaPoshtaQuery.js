const novaPoshtaQuery = async (calledMethod, body) => {

    const fetch = require('cross-fetch');

    return await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'post',
        body: JSON.stringify({
            apiKey: process.env.NP_API_KEY,
            modelName: "Address",
            calledMethod: calledMethod,
            methodProperties: body
        })
    })
        .then(response => response.json())
        .then(response => calledMethod === 'getWarehouses' ? response.data : response.data[0].Addresses)
        .catch(() => []);
}

module.exports = novaPoshtaQuery;