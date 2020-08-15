const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

<!-- zeig das laden an -->
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

<!-- versteck das laden -->
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

<!-- hole ein zitat von der API -->
async function getQuote() {
    loading();
    const proxyUrl = "https://hidden-mesa-92279.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // falls es keinen Autor gibt, füge unbekannt ein
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unbekannt';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        // mach die schrift kleiner für lange zitate
        if (data.quoteText.length > 100) {
            quoteText.classList.add("long-quote");
        }
        else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;

        complete();
    }

    <!-- halte den loader an und zeige das zitat -->



    catch(error) {
        getQuote();
        console.log("upps, kein zitat", error);
    }
}
//twittere das zitat

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

//event listener

newQuoteBtn.addEventListener("click",getQuote);
twitterBtn.addEventListener("click",tweetQuote);


//OnLoad

getQuote();
