// 1. Make a request to the API to get a fact about my favorite number

let favNum = 8;
let BASEURL = `http://numbersapi.com`;

axios.get(`${BASEURL}/${favNum}?json`)
.then(response =>{
    // add favorite num to the page
    document.body.innerHTML += `<p>${response.data.text}</p>`
})
.catch(err => console.log(err));

// 2. Get data on multiple #'s in a single request. 
//    Make request -> when you get data back, put all # facts on the page

let numbers = [2,4,8];

axios.get(`${BASEURL}/${nums}?json`)
    .then(response => {
        for (let facts in response.data) {
            document.body.innerHTML += `<p>${response.data[facts]}</p>`;
        }
    })
    .catch(err =>  console.log(err));
    
// Use API to get 4 facts on mu favorite num. Display on page

let promisesArr = [];

for(let i = 0; i < 4; i++){
    promisesArr.push(
        axios.get(`${BASEURL}/${favNum}?json`)
    );
};

Promise.all(promisesArr)
.then(responses => {
    responses.forEach(response => {
        let fact = response.data.text
        let eachFact = document.createElement('p');
        eachFact.textContent = fact;
        document.body.appendChild(eachFact);
    })
})
.catch(err => console.error(err));

