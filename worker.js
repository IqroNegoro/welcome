let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
function getClock() {
    let date = new Date();
    let hari = date.getDay()
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second
    }
    postMessage({
        hari: days[hari],
        jam: hour,
        menit: minutes,
        detik: second
    })
}

setInterval(getClock, 1000)

getClock();