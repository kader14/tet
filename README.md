# 🎯 Smart Focus Hub — مركز الإنتاجية الذكي

تطبيق ويب متكامل لإدارة الوقت والإنتاجية، مبني بـ **HTML + CSS + JavaScript خالص** بدون أي مكتبات خارجية أو خطوة بناء — ويعمل **بدون إنترنت** كـ PWA.

A modern, all-in-one productivity web app built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step. Works **offline as a PWA**.

---

## ✨ المميزات | Features

| | |
|---|---|
| ⏱️ **Pomodoro Timer** | مؤقت بومودورو **دقيق** يعتمد على `Date.now()` (لا يتأخر حتى لو التبويب في الخلفية) |
| 🔔 **Notifications** | إشعارات حقيقية عبر Service Worker عند انتهاء الجلسة/الاستراحة |
| 🌅 **Wake Lock** | يمنع الشاشة من الانطفاء أثناء جلسة التركيز (Screen Wake Lock API) |
| 🎯 **Daily Goals** | أهداف يومية قابلة للتعديل (جلسات/دقائق/مهام) مع شريط تقدم واحتفاء |
| ✅ **Task Manager** | إدارة المهام مع أولويات + **فئات/علامات** قابلة للتصفية |
| 🔥 **Habit Tracker** | متتبع عادات + **خريطة حرارية لـ 26 أسبوعاً** (Heatmap بنمط GitHub) |
| 📊 **Statistics** | إحصائيات شاملة + رسم بياني لآخر 7 أيام |
| 💾 **Backup / Restore** | تصدير واستيراد البيانات بصيغة JSON |
| 📱 **PWA** | يعمل بدون إنترنت + قابل للتثبيت كتطبيق على الهاتف وسطح المكتب |
| 🌍 **AR / EN** | دعم كامل للعربية (RTL) والإنجليزية (LTR) |
| 🌙 **Dark / Light** | وضع داكن وفاتح عصري |
| ⌨️ **Shortcuts** | اضغط `Space` لبدء/إيقاف المؤقت |
| 🔔 **Audio Cue** | تنبيه صوتي مدمج عبر Web Audio API |

---

## 🚀 التشغيل | Quick Start

> **مهم:** الـ Service Worker يحتاج بروتوكول `http://` أو `https://` — لا يعمل بفتح `index.html` مباشرة (`file://`).

```bash
# Python 3
python3 -m http.server 8080

# Node
npx serve .

# ثم افتح:
# http://localhost:8080
```

---

## 📁 البنية | Project Structure

```
.
├── index.html                # الواجهة + روابط PWA
├── styles.css                # التصميم + داكن/فاتح + RTL
├── app.js                    # المنطق الكامل
├── manifest.webmanifest      # PWA manifest
├── service-worker.js         # Offline-first SW
├── icon.svg                  # أيقونة التطبيق (any + maskable)
└── README.md
```

---

## 🧠 كيف يعمل | How it Works

### الحالة (State)
كائن واحد في الذاكرة يُسلسل إلى `localStorage` تحت المفتاح `smart-focus-hub:v2`. هناك **ترحيل تلقائي** من الإصدار v1.

### المؤقت الدقيق (Drift-free Timer)
- يعتمد على `Date.now()` كمرجع زمني عبر `endsAt` بدلاً من تجميع `setInterval`.
- لا يتأخر إذا تم تعليق التبويب في الخلفية أو دخول الجهاز للنوم.
- يُعاد رسمه فوراً عند `visibilitychange` و `focus`.

### الإشعارات + Wake Lock
- زر 🔕/🔔 في الشريط العلوي لتفعيل الإشعارات (يطلب الإذن أول مرة).
- الإشعارات تُطلق عبر Service Worker بعنوان ووصف مترجمين، والنقر عليها يفتح/يُركّز التطبيق على تبويب بومودورو.
- Wake Lock يُكتسب تلقائياً عند بدء جلسة تركيز ويُحرَّر عند الإيقاف/الإنهاء/إخفاء التبويب — ثم يُعاد اكتسابه عند العودة.

### الأهداف اليومية (Daily Goals)
- 3 أهداف قابلة للتعديل: عدد الجلسات، دقائق التركيز، مهام مكتملة.
- تُحدَّث تلقائياً عند انتهاء جلسة بومودورو أو إكمال مهمة.
- شريط تقدم لكل هدف + تهنئة عند تحقيق الكل.

### فئات المهام (Categories)
- حقل اختياري عند إضافة مهمة (مثل: `عمل`، `دراسة`، `صحة`).
- يظهر كـ **chips** يمكن النقر عليها للتصفية.
- اقتراحات تلقائية عبر `<datalist>` من فئات سابقة.

### النسخ الاحتياطي (Backup)
- **تصدير:** ملف `smart-focus-hub-backup-YYYYMMDD.json` ينزل تلقائياً.
- **استيراد:** اختر ملف JSON — يتم التحقق من صحته ثم استبدال البيانات بعد تأكيد المستخدم.

### خريطة حرارية للعادات (Habit Heatmap)
- شبكة 7×26 (أسبوع × يوم) أسفل كل عادة، مماثلة لشبكة GitHub.
- اللون الأخضر = يوم تم فيه إكمال العادة، الإطار الأرجواني = اليوم.
- النقر على أي خانة (داخل الفترة) يبدّل الحالة لذلك اليوم — مفيد لتدوين عادة قمت بها أمس ونسيت تسجيلها.

### PWA
- **Service Worker** بثلاث استراتيجيات:
  - `network-first` للصفحات (HTML) — لتلقي التحديثات.
  - `cache-first` للملفات الثابتة (CSS/JS/SVG).
  - `stale-while-revalidate` لخطوط Google.
- **زر تثبيت عائم** يظهر عند توفر `beforeinstallprompt` (Chrome / Edge / Android).
- **App Shortcuts** تتيح بدء بومودورو أو فتح المهام مباشرة من أيقونة التطبيق على شاشة الهاتف.

---

## 🌐 النشر | Deploy

التطبيق متوافق مع أي خدمة استضافة ملفات ثابتة — لكن **لا بد من HTTPS** ليعمل الـ Service Worker:

- **GitHub Pages** — `Settings → Pages → Source: main / (root)`
- **Netlify / Vercel / Cloudflare Pages** — اربط المستودع، لا حاجة لإعدادات بناء.

عنوان GitHub Pages المتوقع: `https://kader14.github.io/tet/`

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Start / Pause Pomodoro (لما تكون في تبويب بومودورو) |
| `Esc` | إغلاق نافذة تعديل الأهداف (عبر النقر خارجها) |

---

## 🧪 المتصفحات المدعومة | Browser Support

أي متصفح حديث يدعم:
- CSS Custom Properties + `inset-inline-end`
- ES2020 (optional chaining, nullish coalescing)
- Service Worker + Cache API
- Web Audio API (للتنبيه الصوتي فقط)

Chrome / Edge / Firefox / Safari الإصدارات الأخيرة كلها مدعومة.

---

## 📜 الترخيص | License

MIT — استخدمه وعدّله بحرية.
