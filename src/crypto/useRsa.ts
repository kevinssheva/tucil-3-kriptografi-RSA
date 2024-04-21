import RSA from "./rsa";

const bits = 16; // Adjust this value for higher security (e.g., 1024 or 2048 bits)
export const rsaInstance = new RSA(bits);
