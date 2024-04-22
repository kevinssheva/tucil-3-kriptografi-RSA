# Implementasi Algoritma RSA pada Aplikasi Percakapan

## Tugas Kecil 3 - II4031 Kriptografi dan Koding

## Instalasi

1. Clone repository

```bash
git clone https://github.com/kevinssheva/tucil-3-kriptografi-RSA.git
```

2. Open the project with your favorite IDE (for me it's VSCode)

```bash
code .
```

3. Open a terminal and install the dependencies

```bash
npm install
```

4. Run the project in development mode (Make sure you have Node.js installed)

```bash
npm run dev
```

## Makalah dari Aplikasi

Link : https://docs.google.com/document/d/1GJ3f30nq0CP1V4rsUytd-oVOgU5-Uw8c__rp5YmexFI/edit?usp=sharing

## Kontributor

- 18221055 - Mochamad Syahrial Alzaidan
- 18221143 - Kevin Sebastian Sheva T

## Tabel Fitur

| No  | Feature                                                                                                       | Success (✔) | Fail (❌) | Details                                                                                                                                             |
| :-: | ------------------------------------------------------------------------------------------------------------- | :---------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | Program dapat men-generate public key dan private key menggunakan algoritma RSA                             | ✔           |           |  |
|  2  | Program dapat menyimpan public key dan private key dalam file terpisah dengan format nama <nama_orang>_public.txt dan <nama_orang>_private.txt | ✔           |           | 
|  3  | Program dapat menerima pesan input dari pengguna berupa file sembarang (file text ataupun file biner) ataupun pesan yang diketikkan dari papan-ketik.          | ✔           |           | Pesan yang dimasukkan pengguna dibatasi isinya hanya berupa karakter ASCII |
|  4  | Program dapat mengenkripsi plaintext dan mendekripsi ciphertext menjadi plaintext semula dengan algoritma RSA.                                                             | ✔           |           |
|  5  | Program menampilkan teks plaintext dan ciphertext di layar percakapan. Khusus untuk ciphertext ditampilkan dalam notasi base64.                                   | ✔           |           |
|  6  | Program dapat menyimpan ciphertext ke dalam file.                                                          | ✔           |           |
|  7  | Program dapat mendekripsi file ciphertext menjadi file plaintext.                                          | ✔           |           |
