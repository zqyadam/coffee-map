// export const center = [123.464185, 41.801626]; // 中街
export const center = [123.429096, 41.796767]; // 沈阳中心
// export const center = [123.432993, 41.792154];
export const webServiceKey = "d3f5ec8963493f40e86aaf99abfdba9d";
export const jskey = "80a97b71b6782e9f4a0bb3180beb6d4d";

// export const client_id = "5MOSYENJPL1L5FRJ4U5SRSNPX513UUCZA3QMBGJ5AO1UBDAQ";
// export const client_secret = "RZLRKW1ABBR4FHZP3T3HTPTWEWV5QZ3JXZH0OEPHJHWZOOCY";
let d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const day = d.getDate();
export const fs_v = year + addZero(month) + addZero(day);

function addZero(num) {
 return num < 10 ? "0" + num : num;
}