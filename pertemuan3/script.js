function hitungLaundry() {
    let nama = prompt("Masukkan nama pelanggan");
    let layanan = prompt("Masukkan jenis layanan");
    let berat = parseFloat(
        prompt("Masukkan berat pakaian dalam KG")
    );
    let harga = parseInt(
        prompt("Masukkan harga per KG")
    );
    let biayaTambahan = parseInt(
        prompt("Masukkan biaya tambahan")
    );

    let biayaLaundry = berat * harga;
    let totalBayar = biayaLaundry + biayaTambahan;

    let teksHasil =
        "<h2>Rincian Laundry</h2>" + 
        "<p>Nama: <b>" + nama + "</b></p>" +
        "<p>Layanan: " + layanan + "</p>" +
        "<p>Berat: " + berat + "</p>" +
        "<p>Harga per KG: Rp" + harga + "</p>" +
        "<p>Biaya Laundry: Rp" + biayaLaundry + "</p>" +
        "<p>Biaya Tambahan: Rp" + biayaTambahan + "</P>" +
        "<hr>" +
        "<h3>Total Bayar: Rp" + totalBayar + "</h3>";

    document.getElementById("hasil").innerHTML =teksHasil;
}
