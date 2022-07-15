const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBTN = document.getElementById("twitter");
const newQuoteBTN = document.getElementById("new-quote");
const loader = document.getElementById("basic");

let apiQuotes = [];


// show loading
function loading() {
    loader.style.visibility = '';
    quoteContainer.hidden = true;
}

// Hide Loading 
function complete() {
    quoteContainer.hidden = false;
    loader.style.visibility = 'hidden';
}


//newQuote Function
function newQuote() {
    loading();
    setTimeout(function(){
        // Pick a random quote from api quote array
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; 
        // Check if author field is blank and replace it with Unknown
        if (!quote.author) {
            authorText.textContent = "Unknown";
        }
        else {
            authorText.textContent = quote.author;
        }

        // Check quote length to determine the styling
        if (quote.text.length > 120) {
            quoteText.classList.add("long-quote");
        }
        else {
            quoteText.classList.remove("long-quote");
        }
        // Set quote, hide loader
        complete();
        quoteText.textContent = quote.text;
    }, 1000); 
}



// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error
    }
}

// Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // `` allows you to pass in variables as strings
    window.open(twitterUrl, '_blank'); //allow twitter button to open a new tab with the '_blank' keyword
}

//Event Listeners

newQuoteBTN.addEventListener('click', newQuote);
twitterBTN.addEventListener('click', tweetQuote);


getQuotes();

