import { PrayerTimesCalculator } from './lib/PrayerTimes.js';
import { DateInfo } from './lib/DateInfo.js';
import { NextPrayer } from './lib/NextPrayer.js';


export class Islam {
    constructor(latitude, longitude, date = new Date(),time = 12 , timezon = this.getUTCOffset() , methodIndex = 3 , mzhab = 1 , lan = "ar", prayerId = "next-prayer-name", timeId = "time-remaining") {
        this.date = date;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timezon = timezon;
        this.method = methodIndex;
        this.mzhab = mzhab;
        this.lan = lan;
        this.prayerId = prayerId; 
        this.timeId = timeId; 
        this.time = time;
    }
     getUTCOffset() {
        const offsetMinutes = new Date().getTimezoneOffset(); 
        const offsetHours = offsetMinutes == 0 ? 0 : -offsetMinutes / 60; 
        return offsetHours;
    }
    DateInfo(){
        return new DateInfo(this.date).getDateInfo();
    }


    NextPrayer(){
        const Prayer = new PrayerTimesCalculator(this.latitude, this.longitude, this.timezone, this.method, this.mzhab, "en", 24).calculatePrayerTimes(this.date)
        return new NextPrayer(Prayer , this.lan , this.prayerId , this.timeId);
    }


    PrayerTimesCalculator(){
        return new PrayerTimesCalculator(this.latitude, this.longitude, this.timezone, this.method, this.mzhab, this.lan,this.time).calculatePrayerTimes(this.date);
    }

}
