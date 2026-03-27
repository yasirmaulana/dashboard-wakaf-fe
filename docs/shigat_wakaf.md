# Detail Elemen Shigat Wakaf

Dokumen ini memberikan panduan khusus untuk pengelolaan data **Shigat** (Akad/Lafadz Wakaf) dalam sistem.

## Struktur Tabel Shigat (Updated)

```sql
CREATE TABLE asset_shigat (
    -- Primary Key menggunakan INT Auto-increment
    id SERIAL PRIMARY KEY, 
    
    -- Relasi ke aset inti
    asset_id INT NOT NULL REFERENCES waqf_assets(id),
    
    -- Teks akad
    lafadz_text TEXT NOT NULL, 
    
    -- Tujuan khusus sesuai akad (Amanah Wakif)
    intended_use_shigat TEXT, 
    
    -- Bukti fisik/digital
    document_type VARCHAR(50), -- AIW, Sertifikat, dll
    document_url VARCHAR(255),  -- Link ke file PDF/Foto
    
    -- Metadata
    agreement_date DATE,       
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Mengapa Shigat Penting untuk Wakaf Produktif?

Walaupun Wakaf Produktif berorientasi ekonomi, peruntukan hasilnya (surplus) tetap harus mengikuti Shigat awal. 
Contoh: 
- **Aset**: Ruko (Produktif).
- **Shigat**: "Hasil sewa ruko ini untuk operasional panti asuhan."
- **Sistem**: Tabel `benefit_distributions` harus memvalidasi bahwa `mauquf_alaih_id` yang menerima dana sesuai dengan mandat di tabel `asset_shigat`.

> [!IMPORTANT]
> Konsistensi antara pilar **Shigat** dan **Penyaluran Manfaat** adalah kunci dari kepatuhan syariah dan legalitas sistem ini.
