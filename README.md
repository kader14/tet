# 🎯 Smart Focus Hub — مركز الإنتاجية الذكي

تطبيق ويب متكامل لإدارة الوقت والإنتاجية، مبني بـ **HTML + CSS + JavaScript خالص** بدون أي مكتبات خارجية أو خطوة بناء.

A modern, all-in-one productivity web app built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step.

---

## ✨ المميزات | Features

| | |
|---|---|
| ⏱️ **Pomodoro Timer** | مؤقت بومودورو مع وضع التركيز والاستراحة القصيرة والطويلة، وحلقة تقدم متحركة |
| ✅ **Task Manager** | إدارة المهام مع أولويات (عالية / متوسطة / منخفضة) وفلاتر وعدّاد |
| 🔥 **Habit Tracker** | متتبع عادات يومي مع حساب السلسلة المستمرة (streak) |
| 📊 **Statistics** | إحصائيات شاملة مع رسم بياني لآخر 7 أيام |
| 🌍 **AR / EN** | دعم كامل للعربية (RTL) والإنجليزية (LTR) — قابل للتبديل |
| 🌙 **Dark / Light** | وضع داكن وفاتح عصري |
| 💾 **Offline-first** | يعمل بالكامل بدون إنترنت — البيانات محفوظة في `localStorage` |
| ⌨️ **Shortcuts** | اضغط `Space` لبدء/إيقاف المؤقت |
| 🔔 **Audio Cue** | تنبيه صوتي مدمج عبر Web Audio API |

---

## 🚀 التشغيل | Quick Start

التطبيق ملف ثابت بالكامل (static). افتح `index.html` مباشرة في أي متصفح حديث:

```bash
# Option 1 — مباشرة
open index.html      # macOS
xdg-open index.html  # Linux

# Option 2 — خادم محلي بسيط
python3 -m http.server 8080
# ثم افتح http://localhost:8080
```

---

## 📁 البنية | Project Structure

```
.
├── index.html      # هيكل الواجهة + روابط الموارد
├── styles.css      # التصميم + الوضع الداكن + RTL
├── app.js          # المنطق الكامل (Timer / Tasks / Habits / Stats / i18n)
└── README.md
```

لا يوجد `node_modules`، لا `package.json`، لا خطوات بناء — افتح وشغّل.

---

## 🧠 كيف يعمل | How it Works

- **الحالة (State):** كائن واحد في الذاكرة يُسلسل إلى `localStorage` تحت المفتاح `smart-focus-hub:v1`.
- **i18n:** قاموس بسيط لِلغتين، يُطبَّق ديناميكياً عبر `data-i18n` و `data-i18n-ph`.
- **المؤقت:** حلقة `<svg>` مع `stroke-dashoffset` يُحدَّث كل ثانية.
- **الإحصائيات:** الجلسات تُجمَّع يومياً (`{date: {sessions, minutes}}`) ويُرسم منها مخطط أعمدة CSS.
- **العادات:** كل عادة تحتفظ بسجل تواريخ (`history: ['YYYY-MM-DD', ...]`)، والسلسلة تُحسب بالسير للخلف من اليوم.

---

## 🌐 النشر | Deploy

التطبيق متوافق مع أي خدمة استضافة ملفات ثابتة:

- **GitHub Pages** — فعّل Pages على فرع `main` ومجلد `/` (الجذر).
- **Netlify / Vercel / Cloudflare Pages** — اربط المستودع، لا تحتاج إعدادات بناء.

---

## 🧪 المتصفحات المدعومة | Browser Support

أي متصفح حديث يدعم:
- CSS Custom Properties
- ES2020 (optional chaining, nullish coalescing)
- Web Audio API (للتنبيه الصوتي فقط — اختياري)

Chrome / Edge / Firefox / Safari الإصدارات الأخيرة كلها مدعومة.

---

## 📜 الترخيص | License

MIT — استخدمه وعدّله بحرية.
