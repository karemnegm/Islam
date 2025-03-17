export function cot(x) {
    return 1 / Math.tan(x);
}

export function arccot(x) {
    return Math.atan(1 / x);
}

export function sin(x) {
    return Math.sin(x);
}

export function cos(x) {
    return Math.cos(x);
}

export function tan(x) {
    return Math.tan(x);
}

export function acos(x) {
    return Math.acos(x);
}

export function floor(x) {
    return Math.floor(x);
}

export function abs(x) {
    return Math.abs(x);
}

export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

export function atan(x) {
    return Math.atan(x);
}

export function round(x) {
    return Math.round(x);
}
export function ceil(x) {
    return Math.ceil(x);
}
export function asin(x) {
    return Math.asin(x);
}

export function atan2(y, x) {
    return Math.atan2(y, x);
}

export function fixAngle(angle) {
    return (angle + 360) % 360;
}

export function sin1(degrees) {
    return Math.sin(degrees * Math.PI / 180);
}

export function cos1(degrees) {
    return Math.cos(degrees * Math.PI / 180);
}

export function arctan2(y, x) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

export function arcsin(x) {
    return Math.asin(x) * 180 / Math.PI;
}

export function fixHour(angle) {
    return (angle + 24) % 24;
}