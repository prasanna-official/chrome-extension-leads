let myLeads = []
let saveBtn = document.getElementById("input-btn")
let inputEl = document.getElementById("input-el")
let deleteBtn = document.getElementById("del-btn")
const ulEl = document.getElementById("ul-el")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let tabBtn = document.getElementById("sav-tab")


function render(leads) {
    ulEl.innerHTML = ""; // Clear the list before rendering
    for (let i = 0; i < leads.length; i++) {
        ulEl.innerHTML += `<a href='${leads[i]}' target='_blank'><li>${leads[i]}</li></a>` // this uses template strings
    }
}


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


saveBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})