let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
function getTime() {
    let date = new Date();
    let hari = date.getDay()
    let tanggal = date.getDate();
    let bulan = date.getMonth();
    let tahun = date.getFullYear();
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
        tanggal: tanggal,
        bulan: bulan + 1,
        tahun: tahun,
        jam: hour,
        menit: minutes,
        detik: second
    })
}

setInterval(getTime, 1000)

getClock();