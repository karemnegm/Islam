// تقوم هذه الوحدة بحساب الصلاة التالية والوقت المتبقي لها
// وذلك بناءً على أوقات الصلاة المحسوبة مسبقًا
// والوقت الحالي الذي يتم الحصول عليه من النظام

export class NextPrayer {
    constructor(prayerTimes, lang = "ar", prayerId = "next-prayer-name", timeId = "time-remaining") {
        this.prayerTimes = prayerTimes;
        this.lang = lang; 
        this.prayerId = prayerId; 
        this.timeId = timeId; 
        this.startUpdating();
      
    }
    convertToArabicNumbers(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return hours * 3600 + minutes * 60 + seconds;
    }

    getNextPrayer() {
        const times = [
            { name: 'Fajr', name_ar: 'الفجر', time: this.convertToSeconds(this.prayerTimes.fajr) },
            { name: 'Sunrise', name_ar: 'الشروق', time: this.convertToSeconds(this.prayerTimes.sunrise) },
            { name: 'Dhuhr', name_ar: 'الظهر', time: this.convertToSeconds(this.prayerTimes.dhuhr) },
            { name: 'Asr', name_ar: 'العصر', time: this.convertToSeconds(this.prayerTimes.asr) },
            { name: 'Maghrib', name_ar: 'المغرب', time: this.convertToSeconds(this.prayerTimes.maghrib) },
            { name: 'Isha', name_ar: 'العشاء', time: this.convertToSeconds(this.prayerTimes.isha) },
        ];

        const currentTime = this.getCurrentTime();

        // البحث عن الصلاة التالية
        for (let i = 0; i < times.length; i++) {
            if (times[i].time > currentTime) {

                return {
                    ar : {
                        nextPrayer : times[i].name_ar,
                        timeRemaining: this.formatTimeAR(times[i].time - currentTime)
                    },
                    en : {
                    nextPrayer: times[i].name,
                    timeRemaining: this.formatTime(times[i].time - currentTime)
                    }
                };
                
            }
        }

        // إذا لم تكن هناك صلاة متبقية لليوم الحالي، فالصلاة التالية هي الفجر غدًا
        return {
            ar : {
                nextPrayer : 'الفجر',
                timeRemaining: this.formatTimeAR(86400 - currentTime + times[0].time) 
            },
            en:{
                nextPrayer: 'Fajr',
                timeRemaining: this.formatTime(86400 - currentTime + times[0].time) 
            }

           
            
            
        };
        
    }
   
    convertToSeconds(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60;
    }

    formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m}:${s} `;
    }

    formatTimeAR(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return this.convertToArabicNumbers(h) + ':' + this.convertToArabicNumbers(m) + ':' + this.convertToArabicNumbers(s);
    }



    startUpdating() {
        this.updateTime(); // تشغيل التحديث مباشرة
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    updateTime(name, time) {
        const nextPrayer = this.getNextPrayer();
        document.getElementById(this.prayerId).textContent = nextPrayer[this.lang].nextPrayer;
        document.getElementById(this.timeId).textContent = nextPrayer[this.lang].timeRemaining;     // هنا يمكنك تحديث واجهة المستخدم إذا كنت تستخدم React أو DOM API
    }
    
}
