function getData(){
    fetch(url)
    .then((r) => r.json())
    .then(data => updatePrompt(data))
}
function updatePrompt(data){
    let num = Math.floor(Math.random() * 10)
    let propmt = document.querySelector('h3')
    propmt.innerText = data[num].propmt
}
