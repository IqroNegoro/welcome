// initial variable
const nav = document.getElementsByClassName("nav")[0];
const info = document.getElementsByClassName("info")[0]
const search = document.getElementById("search");

nav.style.height = window.innerHeight + "px"
window.addEventListener("resize", () => {
    nav.style.height = window.innerHeight + "px"
})

let worker;

if (typeof (w) == "undefined") {
    worker = new Worker("worker.js")
}

worker.addEventListener("message", resp => {
    let data = resp.data;
    info.innerHTML = `
    <div class="jam">
        <span>${data.jam}:${data.menit}:${data.detik}</span>
    </div>
    <div class="hari">
        <span>${data.hari}</span>
    </div>
    `
})

//searching
search.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        let str = search.value;
        let replacing = str.replace(/\s+/g, "")
        window.open(`https://google.com/search?q=${replacing}`, "_blank")
    }
})

// sidenav
const open = document.getElementById("plus");
const tambah = document.getElementsByClassName("tambah")[0]

// open listener box
open.addEventListener("click", () => {
    tambah.style.display = "block"
})

window.addEventListener("click", e => {
    if (e.target === tambah) {
        tambah.style.display = "none";
    }
})

// create new bookmark
const save = document.getElementsByClassName("save")[0];
const nama = document.getElementById("nama")
const url = document.getElementById("url")
const image = document.getElementById("image")

if (!localStorage.getItem("nav")) {
    localStorage.clear();
    localStorage.setItem("nav", "[]")
} else {
    let data = JSON.parse(localStorage.getItem("nav"))
    data.forEach(val => {
        nav.innerHTML += `
        <div class="item">
        <div class="remove">
        <i class="bx bx-x"></i>
        </div>
        <a href="https://${val.alamat}" target="_blank">
        <div class="logo">
        <img src="${val.image}">
        </div>
        <div class="text">
        <span>${val.text}</span>
        </div>
        </a>
        </div>`
    })
}


function addItem(obj) {
    let data = JSON.parse(localStorage.getItem("nav"));
    data.push(obj)
    localStorage.setItem("nav", JSON.stringify(data))
    let create = document.createElement("div");
    create.setAttribute("class", "item");
    create.innerHTML = `
    <div class="remove">
        <i class="bx bx-x"></i>
    </div>
    <a href="https://${obj.alamat}" target="_blank">
    <div class="logo">
        <img src="${obj.image}">
    </div>
    <div class="text">
        <span>${obj.text}</span>
    </div>
    </a>`
    nav.appendChild(create)
}

function createNew(alamat, text, imageWeb) {
  this.alamat = alamat;
  this.text = text;
  this.image = imageWeb;  
}
save.addEventListener("click", () => {
    let namaWeb = nama.value;
    let urlWeb = url.value;
    let imgWeb = image.value;
    let create = new createNew(namaWeb, urlWeb, imgWeb)
    addItem(create)
})