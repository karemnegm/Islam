import  * as  MathUtils from './MathUtils.js';
import  * as  AstronomicalEquations from './AstronomicalEquations.js';
import  { Method } from './PrayerMethods.js';



export class PrayerTimesCalculator {
    constructor(latitude, longitude, timezon = this.getUTCOffset() , methodIndex = 3 , mzhab = 1 , lan = "ar", time = 12) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.timezon = timezon;
        this.method = Method(methodIndex);
        this.mzhab = mzhab;
        this.lan = lan;
        this.time1 = time;
    }
    
    ToTime(date){
        date.toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit', second: undefined , hour12:  true });
     }
     getUTCOffset() {
        const offsetMinutes = new Date().getTimezoneOffset(); 
        const offsetHours = offsetMinutes == 0 ? 0 : -offsetMinutes / 60; 
        return offsetHours;
    }

    T(Ah) {
        return MathUtils.toDegrees(MathUtils.acos((-MathUtils.sin(MathUtils.toRadians(Ah)) - MathUtils.sin(MathUtils.toRadians(this.D)) * MathUtils.sin(MathUtils.toRadians(this.latitude))) / (MathUtils.cos(MathUtils.toRadians(this.D)) * MathUtils.cos(MathUtils.toRadians(this.latitude))))) / 15;
    }
    convertToArabicNumbers(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }

    angleToTime_fajr(angle) {
        const hours = MathUtils.floor(angle);
        const minutes1 = (angle - hours) * 60;
        const flor = MathUtils.round((minutes1 - MathUtils.floor(minutes1)) * 10);
        const minutes = flor > 6 ? MathUtils.floor(minutes1) + 1 : MathUtils.floor(minutes1);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const time = new Date(year,month,day,formattedHours , formattedMinutes);

        return time.toLocaleTimeString(this.lan == "ar" ? "ar-EG" : "en-US", { hour: '2-digit', minute: '2-digit', second: undefined , hour12:  this.time1 == 12 ? true : false });
        
    }

    angleToTime(angle) {
        const hours = MathUtils.floor(angle);
        const minutes = MathUtils.ceil((angle - hours) * 60);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const time = new Date(year,month,day,formattedHours , formattedMinutes);

        return time.toLocaleTimeString(this.lan == "ar" ? "ar-EG" : "en-US", { hour: '2-digit', minute: '2-digit', second: undefined , hour12:  this.time1 == 12 ? true : false });

    }



    calculatePrayerTimes(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const jd = AstronomicalEquations.calculateJD(year, month, day);
        const sunPos = AstronomicalEquations.sunPosition(jd);
        this.D = sunPos.D; 
        const EqT = sunPos.Eqt;

        const T_fajr = this.method.fajrAngle;
        const T_isha = this.method.ishaAngle;

        const seg = MathUtils.toRadians(this.latitude - this.D);
        const TD = ((this.timezon * 15) - this.longitude) / 15;
        const HourAngel = MathUtils.atan(1 / (this.mzhab + MathUtils.tan(seg)));
        const AsrAngel = MathUtils.toDegrees(MathUtils.acos((MathUtils.sin(HourAngel) - MathUtils.sin(MathUtils.toRadians(this.D)) * MathUtils.sin(MathUtils.toRadians(this.latitude))) / (MathUtils.cos(MathUtils.toRadians(this.D)) * MathUtils.cos(MathUtils.toRadians(this.latitude))))) / 15;

        const dhuhr = 12 + TD - EqT;
        const asr = dhuhr + AsrAngel;
        const fajr = dhuhr - this.T(T_fajr);
        const sunrise = dhuhr - this.T(0.833);
        const maghrib = dhuhr + this.T(0.833);
        const midnight = (1 / 2 * (fajr + maghrib)) + 12;
        const imsak = fajr + (1 / 6);
        const isha = this.method.method == "UQ" ? maghrib + (3/2) : dhuhr + this.T(T_isha);


        

        return {
        
        imsak: this.angleToTime_fajr(imsak),
        fajr: this.angleToTime_fajr(fajr),
        sunrise: this.angleToTime_fajr(sunrise),
        dhuhr: this.angleToTime_fajr(dhuhr),
        asr: this.angleToTime(asr),
        maghrib: this.angleToTime(maghrib),
        isha: this.angleToTime(isha),
        midnight: this.angleToTime(midnight),
        setting:{
            latitude: this.latitude,
            longitude: this.longitude,
            method: {
                name: this.method.name,
                fajr: this.method.fajrAngle,
                isha: this.method.ishaAngle
            },
            mzhab: this.lan == "ar" ? this.mzhab == 1 ? "شافعي/حنبلي/مالكي " : "حنفي" : this.mzhab == 1 ? "Shafi/Hanbal/Maliki " : "Hanafi",
            timezon: this.timezon,

    }
}
}

}
