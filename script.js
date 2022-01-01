// initial variable
const nav = document.getElementsByClassName("nav")[0];
const info = document.getElementsByClassName("info")[0]
const search = document.getElementById("search");
const container = document.getElementsByClassName("container")[0]
let itemss = document.querySelectorAll(".item")

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
        <span>${data.hari}, ${data.tanggal}:${data.bulan}:${data.tahun}</span>
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

function removing(target) {
    let targeting = target
    const select = Array.from(document.getElementsByClassName("bx-x"));
    let index = select.indexOf(targeting);
    let data = JSON.parse(localStorage.getItem("nav"));
    data.splice(index, 1);
    localStorage.setItem("nav", JSON.stringify(data))
    targeting.parentElement.parentElement.style.display = "none"
    
}

container.addEventListener("click", e => {
    if (e.target === tambah) {
        tambah.style.display = "none";
    }

    if (e.target.classList.contains("bx-x")) {
        removing(e.target)
    }

})

// create new bookmark
const save = document.getElementsByClassName("save")[0];
const nama = document.getElementById("nama")
const url = document.getElementById("url")
const image = document.getElementById("image")

let callback = entries => {
    entries.forEach(val => {
        val.target.classList.toggle("active", val.isIntersecting)
    })
}

let options = {
    threshold: 1,
    rootMargin: "150px",
    root: nav
}

let observer = new IntersectionObserver(callback, options)

function refresh() {
    itemss = document.querySelectorAll(".item")
    itemss.forEach(item => {
        observer.observe(item)
    });
}

if (!localStorage.getItem("nav")) {
    localStorage.clear();
    localStorage.setItem("nav", "[]")
} else {
    let data = JSON.parse(localStorage.getItem("nav"))
    data.forEach(val => {
        nav.insertAdjacentHTML("beforeend", 
        `
        <div class="item">
        <div class="remove">
        <i class="bx bx-x"></i>
        </div>
        <a href="https://${val.url}" target="_blank">
        <div class="logo">
        <img src="${val.img}">
        </div>
        <div class="text">
        <span>${val.nama}</span>
        </div>
        </a>
        </div>`
        )
    })
    refresh()
}



function addItem(obj) {
    let data = JSON.parse(localStorage.getItem("nav"));
    data.push(obj)
    nav.insertAdjacentHTML("beforeend",
    
    `<div class="item">
    <div class="remove">
    <i class="bx bx-x"></i>
    </div>
    <a href="https://${obj.url}" target="_blank">
    <div class="logo">
    <img src="${obj.img}">
    </div>
    <div class="text">
    <span>${obj.nama}</span>
    </div>
    </a>
    </div>`
    )
    localStorage.setItem("nav", JSON.stringify(data))
}

function createNew(nama, url, img) {
    this.nama = nama;
    this.url = url;
    this.img = img;
}
save.addEventListener("click", () => {
    let namaWeb = nama.value;
    let urlWeb = url.value;
    let imgWeb = image.value;
    let create = new createNew(namaWeb, urlWeb, imgWeb)
    addItem(create)
    tambah.style.display = "none";
    nama.value = "";
    url.value = "";
    image.value = "";
    refresh()
})



