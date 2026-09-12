# Berk PPF Studio — 20 maddelik teslim kontrolü

## Son özellik: canlı özetli ziyaret talebi
Teklif formunda ziyaret isteği, tercih günü ve zaman aralığı seçilebilir. Türkiye saatine göre geçmiş günler engellenir; tarih, yalnızca ziyaret talebinde zorunludur. Canlı özet ve WhatsApp metni aynı üretim fonksiyonunu kullanır. Stüdyo onayı olmadan randevu oluşturulmaz. Seçim yardımcısından aktarılan bağlam ve mevcut notlar korunur. Teklif moduna dönünce tarih/saat mesaja eklenmez. Veriler sitede saklanmaz.

## İletişim güncellemesi
Son değişiklik: Marka ve model zorunlu; model yılı, hizmet seçimi ve not alanları bulunan form yeniden eklenmiştir. Teklif CTA’ları bu forma gider. Gönder düğmesi tüm bilgileri URL kodlamasıyla `https://wa.me/905301512808?text=...` adresinde hazır mesaja taşır. Gönderim kullanıcı tarafından WhatsApp içinde tamamlanır. Dosya indirme ve site içinde kayıt yoktur. Telefon, Instagram ve konum bağlantıları korunur. Önceki doğrudan CTA açıklaması bu değişiklikle geçersizdir.
Telefon: +90 530 151 28 08. Tüm teklif CTA’ları doğrudan `https://wa.me/905301512808`, sabit arama ve telefon düğmeleri `tel:+905301512808` bağlantısını açar. Form ve dosya indirme kaldırılmıştır; aşağıdaki ilk teslimdeki form açıklamaları artık geçerli değildir. Instagram: `berkppfstudio`. Konum: kullanıcının paylaştığı `https://share.google/f0SpaFKK2oVJ6CKRe` bağlantısı. Açık adres metni doğrulanmadığından eklenmemiştir. Teşekkür sayfası önceki bağlantılar için korunur; iletişim akışı bu sayfaya yönlenmez.

İşletme bilgilerini `site.config.json` içinde güncelleyip `node build.cjs` çalıştırın. Görseller `dist/assets` altında yer alır. Bu dosya site ziyaretçilerine sunulmaz.

1. **404 sayfası:** `dist/404.html`; yerel sunucu bulunamayan sayfalarda 404 durum kodu döndürür.
2. **Üst kısım CTA:** Ana ekranda teklif bölümüne bağlantı.
3. **İç linkleme:** Menü, hizmetler, iletişim, gizlilik ve altbilgi bağlantıları.
4. **Teşekkür sayfası:** Teklif metni indirildikten sonra gösterilir. Mesaj gönderilmiş veya randevu alınmış gibi davranmaz.
5. **Sayfa işaret yolu:** Alt sayfalarda erişilebilir gezinme yolu.
6. **Vaka çalışmaları:** İki açıkça etiketli örnek uygulama planı var. Gerçek vakalar için `cases` listesine `title`, `description`, `image` ekleyin. Gerçek sonuç ve fotoğraflar bekleniyor.
7. **5 SSS:** Açılır/kapanır beş soru ve yanıt.
8. **Site hızı:** Statik sayfalar, küçük JavaScript, sıkıştırılmış WebP ana görsel, öncelikli ana görsel yüklemesi. Performans puanı garantisi verilmedi; Google yazı tipi harici bağlantı gerektirir ve sistem yazı tipi yedeği vardır.
9. **Sticky telefon CTA:** Sabit iletişim düğmesi hazır. `phone` alanı dolunca doğrudan arama bağlantısına dönüşür. `whatsapp` uluslararası biçimde girilirse teklif formu WhatsApp açar.
10. **robots.txt:** Doğru dosya adıyla hazır, site haritasına bağlantılı.
11. **Benzersiz meta başlık:** Her sayfada farklı başlık.
12. **Meta açıklama:** Her sayfada farklı açıklama.
13. **Sosyal paylaşım resmi:** Markalı `assets/og.png`, Open Graph ve geniş kart bildirimi.
14. **Google Harita ve adres:** Gerçek adres bekleniyor. `address` ve isteğe bağlı `mapsUrl` doldurulunca Google Haritalar yol tarifi bağlantısı görünür. Yanlış konum veya gömülü harita eklenmedi.
15. **Müşteri yorumları:** Doğrulanmış içerik bekleniyor. `reviews` listesine `name`, `text` eklenebilir. Uydurma yıldız puanı veya yorum yok.
16. **Resim alt etiketi:** Ana görsel açıklamalı; dinamik ekip ve vaka görselleri de alt metin alır. Otomobil görseli temsili ve yapay zekâ ile oluşturulmuştur.
17. **Google zengin içerik:** Organization/AutomotiveBusiness ve FAQPage JSON-LD mevcut. Adres girilince işletme türü etkinleşir. Arama sonuçlarında zengin gösterim Google'ın kararına bağlıdır.
18. **Gizlilik sayfası:** Mevcut teknik işleyişi anlatan başlangıç metni hazır. Veri sorumlusu kimliği, gerçek sağlayıcılar ve iletişim ayrıntılarıyla nihai hale getirilmeli.
19. **Google Search Console:** Doğrulama meta alanı ve sitemap hazır. `searchConsoleVerification` gerçek doğrulama koduyla doldurulmalı; hesapta mülk kaydı ve site haritası gönderimi ayrıca yapılmalı. Özel erişimli site arama motorlarınca taranamaz; herkese açık yayın ve alan adı kararı gerekir.
20. **Ekip fotoğrafları:** Gerçek fotoğraflar bekleniyor. `team` listesine `name`, `role`, `image` ekleyin.

## İşletmeden beklenenler
Telefon, WhatsApp, açık adres, Instagram, hizmetlerin teyidi, gerçek vaka fotoğrafları ve sonuçları, yayımlanmasına izin verilen yorumlar, ekip fotoğrafları, gizlilik bilgileri, Search Console doğrulaması.
