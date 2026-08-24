# TaskFlow API

Görev ve Proje Yönetim Sistemi — Node.js & Express.js ile geliştirilmiş REST API.

## Kurulum

1. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

2. Sunucuyu başlatın:
   ```
   npm start
   ```
   (Geliştirme sırasında otomatik yeniden başlatma için: `npm run dev`)

3. Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Klasör Yapısı

```
backend/
├── server.js                  # Uygulama giriş noktası
├── package.json
├── src/
│   ├── data/
│   │   └── tasks.json         # Görevlerin kalıcı olarak tutulduğu dosya
│   ├── middleware/
│   │   └── logger.js          # İstek loglama middleware'i
│   ├── controllers/
│   │   └── taskController.js  # CRUD iş mantığı
│   └── routes/
│       └── taskRoutes.js      # /tasks route tanımları
└── docs/
    └── proje-envanteri.pdf   # Proje Tanıtımı + README + Veri Modeli + API Tasarımı + Postman kanıtları
```

## Endpoint'ler

| Method | Endpoint      | Açıklama              |
|--------|---------------|------------------------|
| GET    | `/tasks`      | Tüm görevleri listele  |
| GET    | `/tasks/:id`  | Görev detayı           |
| POST   | `/tasks`      | Yeni görev oluştur     |
| PUT    | `/tasks/:id`  | Görev güncelle         |
| DELETE | `/tasks/:id`  | Görev sil              |

Detaylı istek/yanıt örnekleri için `docs/proje-envanteri.pdf` dosyasına bakın.

## Loglama

Her istek hem konsola hem de proje kök dizinindeki `requests.log`
dosyasına `[zaman damgası] METHOD /endpoint` formatında kaydedilir.

## Test

Endpoint'ler Postman ile test edilmiştir. Test ekran görüntüleri
`postman/` klasöründe yer almaktadır.
