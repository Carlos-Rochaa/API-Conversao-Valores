const apiKey = "fca_live_6mj723QnxKFxu1ASIieOIgNTlTbOEGgsRn8wx3xl";
const apiUrl = "https://api.freecurrencyapi.com/v1/latest";

document.getElementById("convert-btn").addEventListener("click", async () => {
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const amount = document.getElementById("amount").value;
    const resultElement = document.getElementById("result");

    if (!amount || amount <= 0) {
        resultElement.innerText = "Digite um valor válido.";
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?apikey=${apiKey}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
        const data = await response.json();

        if (data.data && data.data[toCurrency]) {
            const rate = data.data[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            resultElement.innerText = "Erro ao obter a taxa de câmbio.";
        }
    } catch (error) {
        console.error("Erro na conversão: ", error);
        resultElement.innerText = "Erro ao conectar à API.";
    }
});
