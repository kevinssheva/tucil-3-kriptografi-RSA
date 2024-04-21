import random from "crypto-random-prime";

function gcd(a, b) {
  if (b === BigInt(0)) return a;
  return gcd(b, a % b);
}

export function extendedEuclid(a, b) {
  for (let i = 1; i < b; i++) {
    if ((BigInt(1) + BigInt(i) * b) % a === BigInt(0)) {
      return (BigInt(1) + BigInt(i) * b) / a;
    }
  }
  return BigInt(0);
}

export function generateKeys(bits) {
  const p = BigInt(random(bits));
  const q = BigInt(random(bits));
  const n = p * q;
  const phi = (p - BigInt(1)) * (q - BigInt(1));
  let e = BigInt(17);
  do {
    e += BigInt(1);
  } while (gcd(e, phi) !== BigInt(1));
  const d = extendedEuclid(e, phi);
  return {
    publicKey: [e, n],
    privateKey: d,
  };
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
