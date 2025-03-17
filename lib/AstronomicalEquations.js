import  * as  MathUtils from './MathUtils.js';

export function calculateJD(year, month, day) {
    if (month <= 2) {
        month += 12;
        year--;
    }
    let A = MathUtils.floor(year / 100);
    let B = 2 - A + MathUtils.floor(A / 4);
    let JD = MathUtils.floor(365.25 * (year + 4716)) + MathUtils.floor(30.6001 * (month + 1)) + day + B - 1524.5;
    return JD;
}

export function sunPosition(julianDate) {
    const D = julianDate - 2451545.0;
    const g = MathUtils.fixAngle(357.529 + 0.98560028 * D);
    const q = MathUtils.fixAngle(280.459 + 0.98564736 * D);
    const L = MathUtils.fixAngle(q + 1.915 * MathUtils.sin1(g) + 0.020 * MathUtils.sin1(2 * g));

    const R = 1.00014 - 0.01671 * MathUtils.cos1(g) - 0.00014 * MathUtils.cos1(2 * g);
    const e = 23.439 - 0.00000036 * D;

    const RA = MathUtils.arctan2(MathUtils.cos1(e) * MathUtils.sin1(L), MathUtils.cos1(L)) / 15;
    const eqt = q / 15 - MathUtils.fixHour(RA);
    const decl = MathUtils.arcsin(MathUtils.sin1(e) * MathUtils.sin1(L));

    return {
        D: decl,
        Eqt: eqt
    };
}