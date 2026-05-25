## الخطة: إكمال التحقق من Google Search Console

بعد ما نشرت التحديث، صار ميتا التحقق `google-site-verification` موجود في `<head>` على `https://justlator.com/`. باقي خطوتين عبر بوابة الموصلات:

### 1. التحقق من ملكية الموقع (META)
استدعاء `POST /siteVerification/v1/webResource?verificationMethod=META` على بوابة Google Search Console مع:
```json
{"site":{"identifier":"https://justlator.com/","type":"SITE"}}
```
نتيجة 200 = Google قرأ الميتا وأكّد الملكية.

### 2. إضافة الموقع لقائمة Search Console
استدعاء `PUT /webmasters/v3/sites/https%3A%2F%2Fjustlator.com%2F` ليظهر الموقع في حساب المستخدم.

### 3. إرسال السايت ماب
استدعاء `PUT /webmasters/v3/sites/https%3A%2F%2Fjustlator.com%2F/sitemaps/https%3A%2F%2Fjustlator.com%2Fsitemap.xml` لتسجيل `https://justlator.com/sitemap.xml`.

### 4. تثبيت الملاحظة
بعد نجاح الخطوات أعلاه، تحديث ملاحظة SEO `gsc:gsc` كـ fixed.

### في حال فشل التحقق
لو رجع `failedToFindMetaTag`، يعني Google ما قدر يجيب الصفحة لأي سبب (تأخير CDN، أو الميتا لم تظهر بعد). الحل: إعادة المحاولة بعد دقيقة أو دقيقتين.

لا تعديلات على الكود مطلوبة في هذه المرحلة — كل شي عبر استدعاءات API.