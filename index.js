const url = "http://localhost:3000/prompts"
function getData(){
    fetch(url)
    .then((r) => r.json())
    .then(data => updatePrompt(data))
}
function updatePrompt(data){
    let num = Math.floor(Math.random() * 10)
    let updatePrompt = document.querySelector('h3')
    updatePrompt.innerText = `Hello this is your prompt. ${data[num].prompt}`
}
getData()
