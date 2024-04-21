import random from "crypto-random-prime";

class RSA {
  constructor(bits) {
    this.bits = bits;
    const keys = this.generateKeys();
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
  }

  // Find the greatest common divisor of two numbers
  gcd(a, b) {
    if (b === BigInt(0)) return a;
    return this.gcd(b, a % b);
  }

  // Extended Euclidean Algorithm
  extendedEuclid(a, b) {
    for (let i = 1; i < b; i++) {
      if ((BigInt(1) + BigInt(i) * b) % a === BigInt(0)) {
        console.log(i);
        return (BigInt(1) + BigInt(i) * b) / a;
      }
    }
    return BigInt(0);
  }

  // Generate public and private keys
  generateKeys() {
    const p = BigInt(random(this.bits));
    const q = BigInt(random(this.bits));
    console.log(p, q);
    const n = p * q;
    const phi = (p - BigInt(1)) * (q - BigInt(1));
    let e = BigInt(17);
    do {
      e += BigInt(1);
    } while (this.gcd(e, phi) !== BigInt(1));
    const d = this.extendedEuclid(e, phi);
    console.log(d);
    return {
      publicKey: [e, n],
      privateKey: d,
    };
  }

  // Encrypt message using public key
  encrypt(message) {
    const [e, n] = this.publicKey;
    return BigInt(message) ** e % n;
  }

  // Decrypt message using private key
  decrypt(encryptedMessage) {
    const [d, n] = [this.privateKey, this.publicKey[1]];
    let result = BigInt(1);
    let base = encryptedMessage;
    let exp = d;

    while (exp > BigInt(0)) {
      if (exp % BigInt(2) === BigInt(1)) {
        result = (result * base) % n;
      }
      base = (base * base) % n;
      exp = exp / BigInt(2);
    }

    return result;
  }

  // Get the public key
  getPublicKey() {
    return this.publicKey;
  }

  // Get the private key
  getPrivateKey() {
    return this.privateKey;
  }
}

export default RSA;
