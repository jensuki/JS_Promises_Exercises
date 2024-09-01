let BASEURL = 'https://deckofcardsapi.com/api/deck';

// 1. Make request to API for a single card from newly shuffled deck
//    Once i have the card, console.log the 'value' and 'suit'

// request a new shuffled deck
axios.get(`${BASEURL}/new/shuffle/?deck_count=1`)
.then(response => {
    let deckId = response.data.deck_id;
    // draw a single card from the deck
    return axios.get(`${BASEURL}/${deckId}/draw/?count=1`);
})
.then(response => {
    let card = response.data.cards[0]
    let cardValue = card.value;
    let cardSuit = card.suit;
    //log the card value and suit
    console.log(`${cardValue.toLowerCase()} of ${cardSuit.toLowerCase()}`)
})
.catch(err => console.log(err))

// 2. Make request to API for a single card from a newly shuffled deck.
//    Once i receive card, make another request to get one more card from same deck.

axios.get(`${BASEURL}/new/shuffle/?deck_count=1`)
.then(response => {
    let deckId = response.data.deck_id;
    // draw first card from the deck
    return axios.get(`${BASEURL}/${deckId}/draw/?count=1`)
})
.then(response => {
    let card1 = response.data.cards[0];
    console.log(`First card: ${card1.value.toLowerCase()} of ${card1.suit.toLowerCase()}`)
    // draw second card from the same deck
    let deckId = response.data.deck_id;
    return axios.get(`${BASEURL}/${deckId}/draw/?count=1`)
})
.then(response => {
    let card2 = response.data.cards[0]
    console.log(`Second card: ${card2.value.toLowerCase()} of ${card2.suit.toLowerCase()}`)
})
.catch(err => console.log(err))

// 3. Build an HTML page that lets you draw cards from a deck.
//    When page loads, request from API to create a new deck
//    and show a button on the page to allow drawing a card
//    Display new card whenever the button is clicked until no more cards left

// create a new shuffled deck on page load 
const button = document.querySelector('#card-drawer');
const container = document.querySelector('#card-container');
let deckId = '';

axios.get(`${BASEURL}/new/shuffle/?deck_count=1`)
.then(response => {
    deckId = response.data.deck_id;
})

// draw card when button is clicked
button.addEventListener('click', () =>{
    axios.get(`${BASEURL}/${deckId}/draw/?count=1`)
    .then(response => {
        let card = response.data.cards[0];
        let eachCard = document.createElement('img');
        eachCard.src = card.image;

        // simulate real card drawing with random positioning
        let angle = Math.random() * 30 - 15;
        let x = Math.random() * 30 - 5;
        let y = Math.random() * 30 - 5;
        eachCard.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`

        container.appendChild(eachCard);
    })
})