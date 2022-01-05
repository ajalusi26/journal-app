//urls for json database
const promptUrl = "http://localhost:3000/prompts"
const journalUrl = "http://localhost:3000/entryInfo"

//gets and writes date
const today = new Date().toLocaleDateString()
    let date = document.querySelector('.date')
    date.innerText = `Today is ${today}`
    console.log(date)


//main functions
function getJournalData(){
    fetch(journalUrl)
    .then((r) => r.json())
    .then(data => postJournalDataFromDB(data))
}
function getPromptData(){
    fetch(promptUrl)
    .then((r) => r.json())
    .then(data => updatePrompt(data))
}
function submitJournal(){
    const form = document.getElementById('form')
    form.addEventListener('submit', e => {
        e.preventDefault()
        let journalText = e.target['input'].value
        let prompt = document.querySelector('h3').innerText
        let submitDate = today 
        let newJournalData = {
            journalText: journalText,
            prompt: prompt,
            date: submitDate
        }
        sendToDB(newJournalData)
        
        form.reset()
        
    })
}

//callbacks functions
function updatePrompt(data){
    let num = Math.floor(Math.random() * 10)
    let updatePrompt = document.querySelector('h3')
    updatePrompt.innerText = data[num].prompt
}
function sendToDB(newJournalData){
    fetch(journalUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newJournalData),
})
  .then((r) => r.json())
  .then((obj) => addOneEntry(obj));
}
function addOneEntry(obj){
    let container = document.querySelector('#divContainer')
        let outerUl = document.createElement('ul')
        let div = document.createElement('div')
        let innerUl = document.createElement('p')
        div.classList.add('divPractice')
        div.id = obj.id
        innerUl.innerText = obj.date
        outerUl.appendChild(div)
        div.appendChild(innerUl)
        container.appendChild(outerUl)
        popupText(div)
}
function postJournalDataFromDB(data){
    data.forEach(item => {
        let container = document.querySelector('#divContainer')
        let outerUl = document.createElement('ul')
        let div = document.createElement('div')
        let innerUl = document.createElement('p')
        div.classList.add('divPractice')
        div.id = item.id
        innerUl.innerText = item.date
        outerUl.appendChild(div)
        div.appendChild(innerUl)
        container.appendChild(outerUl)
        popupText(div)
    });
}
function popupText(div){
    div.addEventListener('click', e =>{
        let blurOne = document.querySelector("#divContainer");
        blurOne.classList.add("active");
        let blurTwo = document.querySelector("#divInput");
        blurTwo.classList.add("active");
        let popup = document.getElementById("popup");
        popup.classList.add("active");
        let text = document.getElementsByClassName('popup-text')
        fetch(`${journalUrl}/${e.target.id}`)
        .then((r) => r.json())
        .then(data => {
            text.innerText = data.journalText
            console.log(text)
            console.log(data.id)
            console.log(div.id)
            
        })
    })
    let close = document.querySelector('.close-popup')
    close.addEventListener('click', e => {
        e.preventDefault()
        let blurOne = document.querySelector("#divContainer");
        blurOne.classList.remove("active");
        let blurTwo = document.querySelector("#divInput");
        blurTwo.classList.remove("active");
        let popup = document.getElementById("popup");
        popup.classList.remove("active");
    })
}


getJournalData()
getPromptData()
submitJournal()
