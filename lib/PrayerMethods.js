const methods = [
/*0*/    { name: "Umm al-Qura, Makkah", method: "UQ", fajrAngle: 18.5, ishaAngle: 90},
/*1*/    { name: "Muslim World League", method: "MWL", fajrAngle: 18, ishaAngle: 17},
/*2*/    { name: "Islamic Society of North America (ISNA)", method: "ISNA", fajrAngle: 15, ishaAngle: 15},
/*3*/    { name: "Egyptian General Authority of Survey", method: "Egyptian", fajrAngle: 19.5, ishaAngle: 17.5},
/*4*/    { name: "University of Islamic Sciences, Karachi", method: "Karachi", fajrAngle: 18, ishaAngle: 18},
/*5*/   { name: "Institute of Geophysics, University of Tehran", method: "Tehran", fajrAngle: 17.7, ishaAngle: 14},
/*6*/   { name: "Shia Ithna-Ashari, Leva Research Institute, Qum", method: "SIA", fajrAngle: 16, ishaAngle: 14},
];

export function Method(index) {
    return methods[index];
}