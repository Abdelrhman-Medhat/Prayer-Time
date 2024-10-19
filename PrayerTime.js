const cities = [
    {
        arabicName: "القاهره",
        city: "Al Qāhirah"
    },
    {
        arabicName: "البحر الاحمر",
        city: "Al Baḩr al Aḩmar"
    },
    {
        arabicName: "الاسكندريه",
        city: "Al Iskandarīyah"
    },
    {
        arabicName: "الشرقيه",
        city: "Ash Sharqīyah"
    },
    {
        arabicName: "القليوبيه",
        city: "Al Qalyūbīyah"
    },
]

for(city of cities){
    document.getElementById('co').innerHTML += `
    <option>${city.arabicName}</option>
    `
}

document.getElementById('co').addEventListener('change', function() {
    document.getElementById("country-name").innerText = `مواقيت الصلاه حسب التوقيت المحلي لمدينه ${this.value}`;
    let cityName = ""
    for(city of cities){
        if(city.arabicName == this.value){
            cityName = city.city
        }
    }
    getPrayerTimeByCity(cityName)
  });

 

let api = "https://api.aladhan.com/v1/timingsByCity";

function getPrayerTimeByCity(city){
    let params = {
        city: city,
        country:"EG"
    }
    axios.get(api, {
        params: params
      })
      .then(function (response) {
        document.getElementById("date").innerHTML = `
        <h4>تاريخ اليوم: ${response.data.data.date.gregorian.date}</h4>
        <h5>الموافق: ${response.data.data.date.hijri.weekday.ar}</h5>
        `
        const timings = response.data.data.timings
        let fajr = timings.Fajr
        let sunrise = timings.Sunrise
        let dhuhr = timings.Dhuhr
        let asr = timings.Asr
        let maghrib = timings.Maghrib
        let isha = timings.Isha
            document.querySelector(".prayer").innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h4>الفجر</h4>
                </div>
                <div class="card-content">
                    <h2>${fajr}</h2>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h4>الشروق</h4>
                </div>
                <div class="card-content">
                    <h2>${sunrise}</h2>
                </div> 
            </div>
            <div class="card">
                <div class="card-header">
                    <h4>الظهر</h4>
                </div>
                <div class="card-content">
                    <h2>${dhuhr}</h2>
                </div> 
            </div>
            <div class="card">
                <div class="card-header">
                    <h4>العصر</h4>
                </div>
                <div class="card-content">
                    <h2>${asr}</h2>
                </div> 
            </div>
            <div class="card">
                <div class="card-header">
                    <h4>المغرب</h4>
                </div>
                <div class="card-content">
                    <h2>${maghrib}</h2>
                </div> 
            </div>
            <div class="card">
                <div class="card-header">
                    <h4>العشاء</h4>
                </div>
                <div class="card-content">
                    <h2>${isha}</h2>
                </div> 
            </div>
            `
            currentTime()
      })
      .catch(function (error) {
        console.log(error);
      })
}   


getPrayerTimeByCity("Al Qāhirah")

function padZero(number){
    return (number < 10 ? "0" : "") + number;
}

function currentTime(){
    setInterval(() => {
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if(hours > 12){
            hours -= 12
        }else{
            hours = hours
        }
        document.querySelector(".clock").innerHTML = `
            <div class="clock-card">
                ${padZero(seconds)}
            </div>
            <span>:</span>
            <div class="clock-card">
                ${padZero(minutes)}
            </div>
            <span>:</span>
            <div class="clock-card">
                ${padZero(hours)}
            </div>
        `
    }, 1000);
}
