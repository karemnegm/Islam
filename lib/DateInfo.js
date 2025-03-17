export class DateInfo {
    constructor(date) {
        this.date = date;
        this.daysAR = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        this.monthsAR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        this.daysEN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];  
}

    convertToArabicNumbers(number) {
        return number.toString().split('').map(digit => this.arabicNumbers[parseInt(digit)]).join('');
    }

    getDateInfo() {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const day = this.date.getDate();
        const dayOfWeek = this.date.getDay();

        const englishDate = `${this.daysEN[dayOfWeek]} - ${this.monthsEN[month - 1]} ${day} - ${year}`;
        const arabicDate = `${this.daysAR[dayOfWeek]} - ${this.convertToArabicNumbers(day)} ${this.monthsAR[month - 1]} - ${this.convertToArabicNumbers(year)}`;

        const englishDatenum = `${day}-${month}-${year}`;
        const arabicDatenum = `${this.convertToArabicNumbers(day)}-${this.convertToArabicNumbers(month)}-${this.convertToArabicNumbers(year)}`;
        return {
            AR: {
                day: this.daysAR[dayOfWeek],
                month: this.monthsAR[month - 1],
                date: arabicDate,
                date_num: arabicDatenum,
                day_num: this.convertToArabicNumbers(day),
                month_num: this.convertToArabicNumbers(month),
                year_num: this.convertToArabicNumbers(year),
            },
            EN: {
                day: this.daysEN[dayOfWeek],
                month: this.monthsEN[month - 1],
                date: englishDate,
                date_num: englishDatenum,
                day_num: day,
                month_num: month,
                year_num: year,
            }
        };
    }
}

