# Detail Elemen Shigat Wakaf

Dokumen ini memberikan panduan khusus untuk pengelolaan data **Shigat** (Akad/Lafadz Wakaf) dalam sistem.

## Apa itu Shigat?
Shigat adalah pernyataan kehendak dari Wakif (pemberi wakaf) yang diucapkan atau dituliskan saat proses penyerahan harta wakaf. Dalam sistem database, elemen ini kritikal untuk menentukan legalitas dan tujuan penggunaan harta.

## Struktur Tabel Shigat

```sql
CREATE TABLE asset_shigat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES waqf_assets(id),
    
    -- Teks akad
    lafadz_text TEXT NOT NULL, 
    
    -- Tujuan khusus sesuai akad (Sangat Penting)
    intended_use_shigat TEXT, 
    
    -- Bukti fisik/digital
    document_type VARCHAR(50), -- Akad Tertulis, Akta Ikrar Wakaf (AIW), dll
    document_url VARCHAR(255),  -- Link ke file PDF/Foto sertifikat
    
    -- Metadata
    witness_names TEXT,        -- Nama saksi-saksi jika ada
    agreement_date DATE,       -- Tanggal akad
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Komponen Penting dalam Antarmuka (UI)

Saat Admin atau Nazhir menginput data Shigat, elemen berikut harus tersedia:

1.  **Input Text (Lafadz)**: Area teks yang luas untuk menyalin kalimat akad dari Wakif.
2.  **Upload Center**: Komponen untuk mengunggah scan sertifikat atau foto saat akad berlangsung.
3.  **Dropdown Status Dokumen**:
    -   *AIW/PPAIW* (Akta Ikrar Wakaf)
    -   *Sertifikat Tanah Wakaf*
    -   *Surat Pernyataan Wakif* (Untuk harta bergerak seperti kendaraan/laptop)
4.  **Date Picker**: Tanggal diwakafkan yang harus sinkron dengan data di tabel utama `waqf_assets`.

## Keterkaitan dengan "Wakaf Penggunaan" vs "Produktif"

-   **Wakaf Penggunaan**: Shigat biasanya menentukan fasilitas mana yang akan dibangun atau siapa yang boleh menggunakan barang tersebut (Contoh: "Motor ini digunakan untuk operasional Madrasah").
-   **Wakaf Produktif**: Shigat biasanya memberikan mandat kepada Nazhir untuk mengembangkan harta tersebut secara ekonomi (Contoh: "Tanah ini dikelola sebagai ruko, hasilnya untuk beasiswa").

> [!IMPORTANT]
> Sistem harus memastikan bahwa `intended_use_shigat` tidak diubah setelah diverifikasi, karena ini adalah amanah Wakif yang memiliki kekuatan hukum syariah dan negara.
