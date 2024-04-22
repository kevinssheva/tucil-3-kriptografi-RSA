import random from "crypto-random-prime";

function gcd(a, b) {
  if (b === BigInt(0)) return a;
  return gcd(b, a % b);
}

export function generateKeys(bits) {
  const p = BigInt(random(bits));
  const q = BigInt(random(bits));
  const n = p * q;
  const phi = (p - BigInt(1)) * (q - BigInt(1));
  const commonExponents = [BigInt(3), BigInt(5), BigInt(17), BigInt(257)]; // Commonly used small prime exponents
  let e = BigInt(
    commonExponents[Math.floor(Math.random() * commonExponents.length)]
  );

  while (gcd(e, phi) !== BigInt(1)) {
    e = BigInt(
      commonExponents[Math.floor(Math.random() * commonExponents.length)]
    );
  }

  const d = modInverse(e, phi);
  return {
    publicKey: [e, n],
    privateKey: d,
  };
}

function modInverse(a, m) {
  let [x, y, gcd] = extendedEuclid(a, m);
  if (gcd !== BigInt(1)) {
    throw new Error("The modular inverse does not exist");
  }
  return ((x % m) + m) % m;
}

function extendedEuclid(a, b) {
  if (b === BigInt(0)) {
    return [BigInt(1), BigInt(0), a];
  }
  const [x, y, gcd] = extendedEuclid(b, a % b);
  return [y, x - y * (a / b), gcd];
}

export function crypt(data, key, n) {
  let result = BigInt(1);
  let base = BigInt(data);
  let exp = key;

  while (exp > BigInt(0)) {
    if (exp % BigInt(2) === BigInt(1)) {
      result = (result * base) % n;
    }
    base = (base * base) % n;
    exp = exp / BigInt(2);
  }

  return result;
}