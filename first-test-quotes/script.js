
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteContainer = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

let apiQuotes = [];

// get quotes from api
async function getQuoteFromAPI() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        apiQuotes = data;
        newQuote();
    } catch (error) {
        alert('Oops! Something went wrong. Please try again later.');
        console.log('whoops, no quote', error);
    }
}

// show new quote
function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote.text;
    removeLoadingSpinner();
}

// tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteContainer.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromAPI();

