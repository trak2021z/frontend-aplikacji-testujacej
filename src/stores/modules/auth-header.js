export default function authHeader() {
    let token = "CvjbjbqnCbyvohqnFrxfzhmlxnCbyvgrpuavxn";

    if (token) {
        return { FRONT: token };
    } else {
        return {};
    }
}