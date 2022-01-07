const promptUrl = "http://localhost:3000/prompts"
const journalUrl = "http://localhost:3000/entryInfo"

//get current date
const today = new Date().toLocaleDateString()
    let date = document.querySelector('.date')
    date.innerText = `Today is ${today}`


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
    const form = document.getElementById('inputForm')
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
function dateSelection(){
    const selector = document.querySelector('.months')
    let entryList = document.querySelectorAll('.ulEntries')
    selector.addEventListener('click', e => {
        switch (e.target.value) {
            case 'all': 
                entryList = document.querySelectorAll('.ulEntries')
                entryList.forEach(item => {
                    item.style.display = "block"
                });
                    break;
            case 'january': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '1/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                });
                    break;
                case 'february': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '2/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'march': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '3/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'april': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '4/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'may': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '5/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'june': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '6/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'july': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '7/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'august': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '8/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'september': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '9/'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'october': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '10'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'november': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '11'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
                case 'december': 
                entryList.forEach(item => {
                     if (item.innerText.substring(0,2) === '12'){
                         item.style.display = "block"
                     }else{
                         item.style.display = "none"
                     }
                     
                });
                break;
        }

    })
    
}



//functions called inside main functions
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
        let container = document.querySelector('.holding')
        let outerUl = document.createElement('ul')
        let div = document.createElement('div')
        let innerUl = document.createElement('p')
        let button = document.createElement('button')
        button.innerText = "Delete"
        button.id = obj.id
        outerUl.classList.add('ulEntries')
        outerUl.id = obj.id
        div.id = obj.id
        innerUl.id = obj.id
        innerUl.innerText = obj.date
        outerUl.appendChild(div)
        div.appendChild(innerUl)
        outerUl.appendChild(button)
        container.appendChild(outerUl)
        console.log(outerUl)
        deleteButton(button)
        popupText(outerUl, button)
}
function postJournalDataFromDB(data){
    data.forEach(item => {
        let container = document.querySelector('.holding')
        let outerUl = document.createElement('ul')
        let div = document.createElement('div')
        let innerUl = document.createElement('p')
        let button = document.createElement('button')
        button.innerText = "Delete"
        button.id = item.id
        outerUl.classList.add('ulEntries')
        outerUl.id = item.id
        div.id = item.id
        innerUl.id = item.id
        innerUl.innerText = item.date
        outerUl.appendChild(div)
        outerUl.append(button)
        div.appendChild(innerUl)
        container.appendChild(outerUl)
        deleteButton(button)
        popupText(outerUl, button)
    });
}
function popupText(div, button){
    div.addEventListener('click', e =>{
        if(e.target == button) return;
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
                let popupHTML = `<h2 id = ${data.id}>${data.prompt}</h2><p>${data.journalText}</p>`
                popup.innerHTML =  popupHTML
        
                let popupData = {
                    date: data.date ,
                    journalText: data.journalText,
                    prompt: data.prompt
                }
                let id = data.id
                console.log(popupData, 'popup data')
                console.log(data, 'data')
                comment(popup, popupData, id, data)
        })
    })
    
}
function deleteButton(button){
    console.log('button',button)
    button.addEventListener('click', e => {
        let parent = button.parentNode
        parent.style.display = "none"
        fetch( `${journalUrl}/${button.id}`, {
        method: "DELETE",
        })
        .then((r) => r.json())
        .then(() => console.log("Deleted"));
            })
}
function comment(popup, popupData, id, data){
    let p = document.createElement('p')
    let commentForm = document.createElement('form')
    let input = document.createElement('input')
    let submitBttn = document.createElement('input')
    let closeBttn = document.createElement('button')
    let commentP = document.createElement('p')
    let commentTitle = document.createElement('p')
    commentForm.style.backgroundColor = 'white'
    commentTitle.textContent = "Your Comment:"
    commentP.textContent = data.comment
    input.type = "text"
    input.name = "comment"
    submitBttn.type = "submit"
    submitBttn.value = "Submit"
    p.innerText = "Submit New Comment"
    closeBttn.innerText = "Close"
    commentForm.append(input, submitBttn)
    popup.append(p)
    popup.append(commentForm)
    
    commentForm.addEventListener('submit', e => {
        e.preventDefault()
        let comment = 'comment'
        popupData[comment] =  e.target['comment'].value
        commentP.textContent = e.target["comment"].value
        fetch(`${journalUrl}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(popupData),
        })
        .then((r) => r.json())
        .then((obj) => console.log(obj));
        commentForm.reset()
        
    })

    closeBttn.addEventListener('click', e => {
        let blurOne = document.querySelector("#divContainer");
        blurOne.classList.remove("active");
        let blurTwo = document.querySelector("#divInput");
        blurTwo.classList.remove("active");
        let popup = document.getElementById("popup");
        popup.classList.remove("active");
    })
    commentTitle.appendChild(commentP)
    popup.append(commentTitle)
    
    popup.append(closeBttn)
}

//call main functions
dateSelection()
getJournalData()
getPromptData()
submitJournal()

