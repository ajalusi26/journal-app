const promptUrl = "http://localhost:3000/prompts"
const journalUrl = "http://localhost:3000/entryInfo"

//gets todays date
const today = new Date().toLocaleDateString()
let date = document.querySelector('.date')
date.innerText = `Today is ${today}`


//main functions
function getJournalData() {
    fetch(journalUrl)
        .then((r) => r.json())
        .then(data => postJournalDataFromDB(data))
}
function getPromptData() {
    fetch(promptUrl)
        .then((r) => r.json())
        .then(data => updatePrompt(data))
}
function submitJournal() {
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
function dateSelection() {
    const selector = document.querySelector('.months')
    let entryList = document.querySelectorAll('.divPractice')
    selector.addEventListener('click', e => {
        switch (e.target.value) {
            case 'all':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    item.style.display = "block"
                });
                break;
            case 'january':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(1, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }
                });
                break;
            case 'february':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(2, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'march':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(3, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'april':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(4, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'may':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(5, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'june':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(6, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'july':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(7, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'august':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(8, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'september':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(9, "/")) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'october':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(1, 0)) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'november':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(1, 1)) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
            case 'december':
                entryList = document.querySelectorAll('.divPractice')
                entryList.forEach(item => {
                    if (item.innerText.substring(0, 1).includes(1, 2)) {
                        item.style.display = "block"
                    } else {
                        item.style.display = "none"
                    }

                });
                break;
        }

    })

}

//callback functions

function updatePrompt(data) {
    let num = Math.floor(Math.random() * 10)
    let updatePrompt = document.querySelector('h3')
    updatePrompt.innerText = data[num].prompt
}
function sendToDB(newJournalData) {
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
function addOneEntry(obj) {
    let container = document.querySelector('#divContainer')
    let outerUl = document.createElement('ul')
    let div = document.createElement('div')
    let innerUl = document.createElement('p')
    let button = document.createElement('button')
    button.innerText = "Delete"
    div.classList.add('divPractice')
    div.id = obj.id
    innerUl.id = obj.id
    innerUl.innerText = obj.date
    outerUl.appendChild(div)
    div.appendChild(innerUl)
    innerUl.appendChild(button)
    container.appendChild(outerUl)
    console.log(outerUl)
    popupText(div)
}
function postJournalDataFromDB(data) {
    data.forEach(item => {
        let container = document.querySelector('#divContainer')
        let outerUl = document.createElement('ul')
        let div = document.createElement('div')
        let innerUl = document.createElement('p')
        let button = document.createElement('button')
        button.innerText = "Delete"
        div.classList.add('divPractice')
        div.id = item.id
        innerUl.id = item.id
        innerUl.innerText = item.date
        innerUl.appendChild(button)
        outerUl.appendChild(div)
        div.appendChild(innerUl)
        container.appendChild(outerUl)
        console.log(container)
        popupText(div)
    });
}
function popupText(div) {
    div.addEventListener('click', e => {
        let blurOne = document.querySelector("#divContainer");
        blurOne.classList.add("active");
        let blurTwo = document.querySelector("#divInput");
        blurTwo.classList.add("active");
        let popup = document.getElementById("popup");
        popup.classList.add("active");

        // let button = document.createElement('button')
        // button.classList.add('close-popup')
        // button.innerText = "Close"
        // popup.append(button)

        //let text = document.getElementsByClassName('popup-text')
        fetch(`${journalUrl}/${e.target.id}`)
            .then((r) => r.json())
            .then(data => {
                let popupHTML = `<h2>${data.prompt}</h2><p>${data.journalText}</p>`
                popup.innerHTML = popupHTML
                console.log(popup)
            })
        popup.addEventListener('click', e => {
            let blurOne = document.querySelector("#divContainer");
            blurOne.classList.remove("active");
            let blurTwo = document.querySelector("#divInput");
            blurTwo.classList.remove("active");
            let popup = document.getElementById("popup");
            popup.classList.remove("active");
        })
    })

}

dateSelection()
getJournalData()
getPromptData()
submitJournal()

