/* ==========================================================================
   Smart Focus Hub — Application Logic
   Pomodoro + Tasks (with categories) + Habits + Stats + Daily Goals
   + JSON Export/Import + PWA Service Worker + i18n + Theme + LocalStorage
   ========================================================================== */

(() => {
  'use strict';

  // ------------------------------ i18n ------------------------------
  const I18N = {
    ar: {
      app_name: 'مركز الإنتاجية الذكي',
      tab_pomodoro: 'بومودورو',
      tab_tasks: 'المهام',
      tab_habits: 'العادات',
      tab_stats: 'الإحصائيات',

      mode_focus: 'تركيز',
      mode_short: 'استراحة قصيرة',
      mode_long: 'استراحة طويلة',
      ready_focus: 'جاهز للتركيز',
      focus_running: 'جلسة تركيز جارية...',
      break_running: 'وقت الاستراحة',
      paused: 'متوقف مؤقتاً',
      btn_start: 'ابدأ',
      btn_pause: 'إيقاف',
      btn_reset: 'إعادة',
      btn_skip: 'تخطّي',
      completed_today: 'جلسات اليوم',
      focus_minutes: 'دقائق التركيز',

      goals_title: 'أهداف اليوم',
      goal_sessions: 'جلسات التركيز',
      goal_minutes: 'دقائق التركيز',
      goal_tasks: 'المهام المكتملة',
      goals_done: 'أحسنت! حققت كل أهداف اليوم',
      goals_edit_title: 'تعديل أهداف اليوم',
      btn_edit: 'تعديل',
      btn_save: 'حفظ',
      btn_cancel: 'إلغاء',
      goals_saved: 'تم حفظ الأهداف',

      tip_title: 'نصيحة اليوم',
      tip_default: 'ركز لمدة 25 دقيقة، ثم خذ استراحة 5 دقائق. هذه هي تقنية بومودورو التي تساعد على تحسين الإنتاجية.',
      tips: [
        'ركز لمدة 25 دقيقة، ثم خذ استراحة 5 دقائق.',
        'ابتعد عن مصادر التشتيت قبل بدء جلسة التركيز.',
        'ابدأ بأصعب مهمة في اليوم لتحقيق إنجاز كبير مبكراً.',
        'دوّن أفكارك بدلاً من ملاحقتها أثناء التركيز.',
        'الاستراحة القصيرة لا تقل أهمية عن التركيز نفسه.',
        'قسّم المهام الكبيرة إلى خطوات صغيرة قابلة للتحقيق.',
        'احتفل بالإنجازات الصغيرة لبناء عادة الإنتاجية.',
      ],

      tasks_title: 'قائمة المهام',
      task_placeholder: 'أضف مهمة جديدة...',
      category_placeholder: 'فئة (اختياري)',
      priority_high: 'عالية',
      priority_medium: 'متوسطة',
      priority_low: 'منخفضة',
      btn_add: 'إضافة',
      filter_all: 'الكل',
      filter_active: 'نشطة',
      filter_done: 'مكتملة',
      clear_done: 'حذف المكتملة',
      active: 'نشطة',
      done: 'مكتملة',
      no_tasks: 'لا توجد مهام بعد. أضف مهمتك الأولى!',
      task_added: 'تمت إضافة المهمة',
      task_deleted: 'تم حذف المهمة',
      tasks_cleared: 'تم حذف المهام المكتملة',
      cat_all: 'كل الفئات',

      habits_title: 'متتبع العادات',
      habit_placeholder: 'عادة جديدة (مثل: قراءة 30 دقيقة)...',
      no_habits: 'ابدأ بإضافة عاداتك اليومية لبنائها خطوة بخطوة.',
      habit_added: 'تمت إضافة العادة',
      habit_deleted: 'تم حذف العادة',
      streak: 'سلسلة',
      day: 'يوم',
      total: 'الإجمالي',

      stat_sessions: 'إجمالي الجلسات',
      stat_minutes: 'دقائق التركيز',
      stat_tasks: 'مهام مكتملة',
      stat_streak: 'أطول سلسلة (يوم)',
      weekly_focus: 'جلسات التركيز - آخر 7 أيام',

      backup_title: 'النسخ الاحتياطي',
      backup_desc: 'قم بتصدير بياناتك إلى ملف JSON أو استيرادها لاستعادتها على جهاز آخر.',
      btn_export: 'تصدير JSON',
      btn_import: 'استيراد JSON',
      export_done: 'تم تصدير البيانات',
      import_done: 'تم استيراد البيانات بنجاح',
      import_invalid: 'الملف غير صالح أو تالف',
      import_confirm: 'سيتم استبدال بياناتك الحالية. هل تريد المتابعة؟',

      danger_zone: 'المنطقة الحساسة',
      danger_desc: 'سيتم حذف جميع المهام والعادات والإحصائيات.',
      reset_all: 'إعادة تعيين كل شيء',
      reset_confirm: 'هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع.',
      reset_done: 'تم حذف جميع البيانات',

      session_done: 'انتهت الجلسة! استراحة جيدة 🎉',
      break_done: 'انتهت الاستراحة! وقت العودة للتركيز 💪',
      install_app: 'تثبيت التطبيق',
      installed: 'تم تثبيت التطبيق على جهازك',
      offline_ready: 'التطبيق جاهز للعمل بدون إنترنت',
      days_short: ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
    },
    en: {
      app_name: 'Smart Focus Hub',
      tab_pomodoro: 'Pomodoro',
      tab_tasks: 'Tasks',
      tab_habits: 'Habits',
      tab_stats: 'Stats',

      mode_focus: 'Focus',
      mode_short: 'Short Break',
      mode_long: 'Long Break',
      ready_focus: 'Ready to focus',
      focus_running: 'Focus session running...',
      break_running: 'Break time',
      paused: 'Paused',
      btn_start: 'Start',
      btn_pause: 'Pause',
      btn_reset: 'Reset',
      btn_skip: 'Skip',
      completed_today: 'Sessions today',
      focus_minutes: 'Focus minutes',

      goals_title: "Today's Goals",
      goal_sessions: 'Focus sessions',
      goal_minutes: 'Focus minutes',
      goal_tasks: 'Tasks completed',
      goals_done: "Awesome! You hit all of today's goals",
      goals_edit_title: "Edit Today's Goals",
      btn_edit: 'Edit',
      btn_save: 'Save',
      btn_cancel: 'Cancel',
      goals_saved: 'Goals saved',

      tip_title: 'Tip of the day',
      tip_default: 'Focus for 25 minutes, then take a 5-minute break. This is the Pomodoro Technique.',
      tips: [
        'Focus for 25 minutes, then take a 5-minute break.',
        'Eliminate distractions before starting your session.',
        'Tackle the hardest task first to build momentum.',
        'Write thoughts down instead of chasing them mid-focus.',
        'Short breaks are as important as focus itself.',
        'Break large tasks into small achievable steps.',
        'Celebrate small wins to build a productivity habit.',
      ],

      tasks_title: 'Tasks',
      task_placeholder: 'Add a new task...',
      category_placeholder: 'Category (optional)',
      priority_high: 'High',
      priority_medium: 'Medium',
      priority_low: 'Low',
      btn_add: 'Add',
      filter_all: 'All',
      filter_active: 'Active',
      filter_done: 'Done',
      clear_done: 'Clear done',
      active: 'active',
      done: 'done',
      no_tasks: 'No tasks yet. Add your first one!',
      task_added: 'Task added',
      task_deleted: 'Task deleted',
      tasks_cleared: 'Completed tasks cleared',
      cat_all: 'All categories',

      habits_title: 'Habit Tracker',
      habit_placeholder: 'New habit (e.g. Read 30 min)...',
      no_habits: 'Start by adding daily habits to build them step by step.',
      habit_added: 'Habit added',
      habit_deleted: 'Habit deleted',
      streak: 'streak',
      day: 'day',
      total: 'total',

      stat_sessions: 'Total sessions',
      stat_minutes: 'Focus minutes',
      stat_tasks: 'Tasks completed',
      stat_streak: 'Longest streak (days)',
      weekly_focus: 'Focus sessions - last 7 days',

      backup_title: 'Backup',
      backup_desc: 'Export your data to a JSON file or import it to restore on another device.',
      btn_export: 'Export JSON',
      btn_import: 'Import JSON',
      export_done: 'Data exported',
      import_done: 'Data imported successfully',
      import_invalid: 'Invalid or corrupted file',
      import_confirm: 'This will overwrite your current data. Continue?',

      danger_zone: 'Danger zone',
      danger_desc: 'All tasks, habits and stats will be erased.',
      reset_all: 'Reset everything',
      reset_confirm: 'Are you sure? This cannot be undone.',
      reset_done: 'All data wiped',

      session_done: 'Session complete! Enjoy your break 🎉',
      break_done: 'Break is over! Back to focus 💪',
      install_app: 'Install app',
      installed: 'App installed on your device',
      offline_ready: 'App ready to work offline',
      days_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
  };

  // ------------------------------ State -----------------------------
  const STORAGE_KEY = 'smart-focus-hub:v2';
  const SCHEMA_VERSION = 2;

  const defaultState = {
    schemaVersion: SCHEMA_VERSION,
    lang: 'ar',
    theme: 'light',
    tasks: [],
    habits: [],
    sessions: {},          // { 'YYYY-MM-DD': { sessions: n, minutes: m } }
    totalSessions: 0,
    totalMinutes: 0,
    tasksCompleted: 0,
    activeFilter: 'all',
    activeCategory: 'all',
    goals: { sessions: 4, minutes: 120, tasks: 5 },
    tasksCompletedByDate: {}, // { 'YYYY-MM-DD': n } — for goal tracking
  };

  let state = loadState();

  function loadState() {
    try {
      // Try v2 first
      let raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultState, ...JSON.parse(raw) };

      // Migrate from v1 if present
      const v1 = localStorage.getItem('smart-focus-hub:v1');
      if (v1) {
        const parsed = JSON.parse(v1);
        const migrated = { ...defaultState, ...parsed, schemaVersion: SCHEMA_VERSION };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return { ...defaultState };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {/* ignore quota */}
  }

  // ----------------------------- Helpers ----------------------------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const t = (key) => I18N[state.lang][key] ?? key;

  function todayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  // ------------------------- Theme & Language -----------------------
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    $('#theme-icon').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    $('#lang-label').textContent = state.lang === 'ar' ? 'EN' : 'ع';

    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    $$('[data-i18n-ph]').forEach((el) => {
      const key = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', t(key));
    });

    // re-render dynamic UI
    renderTasks();
    renderHabits();
    renderStats();
    renderGoals();
    updateTimerLabel();
    updateStartButton();
    rotateTip();
    updateTodayDate();
  }

  // ----------------------------- Tabs -------------------------------
  function setupTabs() {
    $$('.tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        $$('.tab').forEach((b) => b.classList.toggle('active', b === btn));
        $$('.panel').forEach((p) => p.classList.toggle('active', p.id === tab));
        if (tab === 'stats') renderStats();
      });
    });
  }

  // --------------------------- Pomodoro -----------------------------
  const Timer = (() => {
    let mode = 'focus';
    let totalSec = 25 * 60;
    let remaining = totalSec;
    let intervalId = null;
    let running = false;

    const RING_LEN = 2 * Math.PI * 108;

    function setMode(newMode, durationMin) {
      stop();
      mode = newMode;
      totalSec = durationMin * 60;
      remaining = totalSec;
      $$('.mode-btn').forEach((b) => b.classList.toggle('active', b.dataset.mode === newMode));
      $('.timer-wrapper').classList.toggle('break', newMode !== 'focus');
      render();
      updateTimerLabel();
    }

    function start() {
      if (running) { pause(); return; }
      running = true;
      updateStartButton();
      $('#timer-label').textContent = mode === 'focus' ? t('focus_running') : t('break_running');
      intervalId = setInterval(tick, 1000);
    }

    function pause() {
      running = false;
      clearInterval(intervalId);
      intervalId = null;
      updateStartButton();
      $('#timer-label').textContent = t('paused');
    }

    function stop() {
      running = false;
      clearInterval(intervalId);
      intervalId = null;
      updateStartButton();
    }

    function reset() {
      stop();
      remaining = totalSec;
      render();
      updateTimerLabel();
    }

    function skip() {
      stop();
      complete(false);
    }

    function tick() {
      remaining--;
      if (remaining <= 0) { complete(true); return; }
      render();
    }

    function complete(natural) {
      stop();
      remaining = totalSec;
      if (natural && mode === 'focus') {
        state.totalSessions += 1;
        state.totalMinutes += Math.round(totalSec / 60);
        const k = todayKey();
        state.sessions[k] = state.sessions[k] || { sessions: 0, minutes: 0 };
        state.sessions[k].sessions += 1;
        state.sessions[k].minutes += Math.round(totalSec / 60);
        saveState();
        playBeep();
        showToast(t('session_done'));
        const shortBtn = document.querySelector('[data-mode="short"]');
        setMode('short', parseInt(shortBtn.dataset.duration, 10));
      } else if (natural) {
        playBeep();
        showToast(t('break_done'));
        const focusBtn = document.querySelector('[data-mode="focus"]');
        setMode('focus', parseInt(focusBtn.dataset.duration, 10));
      } else {
        render();
      }
      updateTodayMeta();
      renderStats();
      renderGoals();
    }

    function render() {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      $('#timer-display').textContent =
        `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      const ring = $('#ring-progress');
      ring.style.strokeDasharray = String(RING_LEN);
      const progress = remaining / totalSec;
      ring.style.strokeDashoffset = String(RING_LEN * (1 - progress));
      document.title = running
        ? `${$('#timer-display').textContent} • ${t('app_name')}`
        : `${t('app_name')}`;
    }

    return {
      setMode, start, pause, reset, skip, render,
      get running() { return running; },
      get mode() { return mode; },
    };
  })();

  function updateStartButton() {
    const btnText = $('#btn-start-text');
    const btnIcon = $('#btn-start-icon');
    if (Timer.running) {
      btnText.textContent = t('btn_pause');
      btnIcon.textContent = '⏸';
    } else {
      btnText.textContent = t('btn_start');
      btnIcon.textContent = '▶';
    }
  }

  function updateTimerLabel() {
    if (Timer.running) return;
    const label = $('#timer-label');
    if (Timer.mode === 'focus') label.textContent = t('ready_focus');
    else if (Timer.mode === 'short') label.textContent = t('mode_short');
    else label.textContent = t('mode_long');
  }

  function setupPomodoro() {
    $$('.mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        Timer.setMode(btn.dataset.mode, parseInt(btn.dataset.duration, 10));
      });
    });
    $('#btn-start').addEventListener('click', () => Timer.start());
    $('#btn-reset').addEventListener('click', () => Timer.reset());
    $('#btn-skip').addEventListener('click', () => Timer.skip());

    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.code === 'Space' && $('#pomodoro').classList.contains('active')) {
        e.preventDefault();
        Timer.start();
      }
    });

    Timer.setMode('focus', 25);
    updateTodayMeta();
  }

  function updateTodayMeta() {
    const today = state.sessions[todayKey()] || { sessions: 0, minutes: 0 };
    $('#sessions-today').textContent = today.sessions;
    $('#focus-minutes').textContent = today.minutes;
  }

  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {/* audio not supported */}
  }

  // -------------------------- Daily Goals ---------------------------
  function setupGoals() {
    const dialog = $('#goals-dialog');
    const open = () => {
      $('#goal-sessions-input').value = state.goals.sessions;
      $('#goal-minutes-input').value = state.goals.minutes;
      $('#goal-tasks-input').value = state.goals.tasks;
      dialog.classList.remove('hidden');
    };
    const close = () => dialog.classList.add('hidden');

    $('#btn-edit-goals').addEventListener('click', open);
    $('#goals-dialog-close').addEventListener('click', close);
    $('#goals-dialog-cancel').addEventListener('click', close);
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });

    $('#goals-form').addEventListener('submit', (e) => {
      e.preventDefault();
      state.goals = {
        sessions: clamp(parseInt($('#goal-sessions-input').value, 10) || 1, 1, 20),
        minutes:  clamp(parseInt($('#goal-minutes-input').value, 10)  || 5, 5, 600),
        tasks:    clamp(parseInt($('#goal-tasks-input').value, 10)    || 1, 1, 50),
      };
      saveState();
      renderGoals();
      close();
      showToast(t('goals_saved'));
    });
  }

  function renderGoals() {
    const k = todayKey();
    const today = state.sessions[k] || { sessions: 0, minutes: 0 };
    const tasksToday = state.tasksCompletedByDate?.[k] || 0;

    const items = [
      { id: 'sessions', current: today.sessions, target: state.goals.sessions },
      { id: 'minutes',  current: today.minutes,  target: state.goals.minutes },
      { id: 'tasks',    current: tasksToday,     target: state.goals.tasks },
    ];

    let allDone = true;
    for (const item of items) {
      const pct = Math.min(100, (item.current / item.target) * 100);
      const bar = $(`#goal-${item.id}-bar`);
      const cur = $(`#goal-${item.id}-current`);
      const tar = $(`#goal-${item.id}-target`);
      if (bar) {
        bar.style.width = pct + '%';
        bar.classList.toggle('complete', pct >= 100);
      }
      if (cur) cur.textContent = item.current;
      if (tar) tar.textContent = item.target;
      if (pct < 100) allDone = false;
    }

    $('#goals-celebration').classList.toggle('hidden', !allDone);
  }

  // --------------------------- Tasks --------------------------------
  function setupTasks() {
    $('#task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('#task-input');
      const text = input.value.trim();
      if (!text) return;
      const priority = $('#task-priority').value;
      const catRaw = $('#task-category').value.trim();
      const category = catRaw ? catRaw.toLowerCase().slice(0, 20) : '';
      state.tasks.unshift({ id: uid(), text, priority, category, done: false, createdAt: Date.now() });
      input.value = '';
      $('#task-category').value = '';
      saveState();
      renderTasks();
      showToast(t('task_added'));
    });

    $$('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeFilter = btn.dataset.filter;
        $$('[data-filter]').forEach((b) => b.classList.toggle('active', b === btn));
        saveState();
        renderTasks();
      });
    });

    $('#clear-done').addEventListener('click', () => {
      const before = state.tasks.length;
      state.tasks = state.tasks.filter((x) => !x.done);
      if (state.tasks.length !== before) {
        saveState();
        renderTasks();
        showToast(t('tasks_cleared'));
      }
    });
  }

  function getCategoryCounts() {
    const counts = new Map();
    for (const task of state.tasks) {
      const cat = task.category || '';
      if (!cat) continue;
      counts.set(cat, (counts.get(cat) || 0) + 1);
    }
    return counts;
  }

  function renderCategoryFilters() {
    const wrap = $('#category-filters');
    const counts = getCategoryCounts();
    wrap.innerHTML = '';

    if (counts.size === 0) {
      // ensure activeCategory is reset if none exist
      if (state.activeCategory !== 'all') {
        state.activeCategory = 'all';
        saveState();
      }
      return;
    }

    // "All" chip
    const allChip = document.createElement('button');
    allChip.className = 'chip chip-category' + (state.activeCategory === 'all' ? ' active' : '');
    allChip.innerHTML = `<span>${t('cat_all')}</span><span class="chip-count">${state.tasks.length}</span>`;
    allChip.addEventListener('click', () => {
      state.activeCategory = 'all';
      saveState();
      renderTasks();
    });
    wrap.appendChild(allChip);

    // Sorted category chips
    [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0])).forEach(([cat, n]) => {
      const chip = document.createElement('button');
      chip.className = 'chip chip-category' + (state.activeCategory === cat ? ' active' : '');
      chip.innerHTML = `<span>#${cat}</span><span class="chip-count">${n}</span>`;
      chip.addEventListener('click', () => {
        state.activeCategory = state.activeCategory === cat ? 'all' : cat;
        saveState();
        renderTasks();
      });
      wrap.appendChild(chip);
    });

    // Update datalist (suggestions)
    const list = $('#categories-list');
    list.innerHTML = '';
    [...counts.keys()].forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat;
      list.appendChild(opt);
    });
  }

  function renderTasks() {
    const list = $('#task-list');
    const empty = $('#task-empty');
    list.innerHTML = '';

    let visible = state.tasks;
    if (state.activeFilter === 'active') visible = visible.filter((x) => !x.done);
    if (state.activeFilter === 'done') visible = visible.filter((x) => x.done);
    if (state.activeCategory !== 'all') visible = visible.filter((x) => (x.category || '') === state.activeCategory);

    visible.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' done' : '');
      li.innerHTML = `
        <button class="task-checkbox" aria-label="toggle"></button>
        <span class="priority-dot priority-${task.priority}" title="${t('priority_' + task.priority)}"></span>
        <div class="task-body">
          <span class="task-text"></span>
          ${task.category ? '<span class="task-tag"></span>' : ''}
        </div>
        <button class="task-delete" aria-label="delete">✕</button>
      `;
      li.querySelector('.task-text').textContent = task.text;
      if (task.category) li.querySelector('.task-tag').textContent = '#' + task.category;

      li.querySelector('.task-checkbox').addEventListener('click', () => toggleTask(task.id));
      li.querySelector('.task-delete').addEventListener('click', () => deleteTask(task.id));

      list.appendChild(li);
    });

    empty.classList.toggle('hidden', visible.length > 0);

    const active = state.tasks.filter((x) => !x.done).length;
    const done = state.tasks.filter((x) => x.done).length;
    $('#tasks-active-count').textContent = active;
    $('#tasks-done-count').textContent = done;

    renderCategoryFilters();
  }

  function toggleTask(id) {
    const task = state.tasks.find((x) => x.id === id);
    if (!task) return;
    const k = todayKey();
    state.tasksCompletedByDate = state.tasksCompletedByDate || {};

    task.done = !task.done;
    if (task.done) {
      state.tasksCompleted += 1;
      state.tasksCompletedByDate[k] = (state.tasksCompletedByDate[k] || 0) + 1;
    } else {
      state.tasksCompleted = Math.max(0, state.tasksCompleted - 1);
      state.tasksCompletedByDate[k] = Math.max(0, (state.tasksCompletedByDate[k] || 0) - 1);
    }
    saveState();
    renderTasks();
    renderStats();
    renderGoals();
  }

  function deleteTask(id) {
    state.tasks = state.tasks.filter((x) => x.id !== id);
    saveState();
    renderTasks();
    showToast(t('task_deleted'));
  }

  // --------------------------- Habits -------------------------------
  function setupHabits() {
    $('#habit-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('#habit-input');
      const name = input.value.trim();
      if (!name) return;
      state.habits.push({
        id: uid(),
        name,
        history: [],
        createdAt: Date.now(),
      });
      input.value = '';
      saveState();
      renderHabits();
      showToast(t('habit_added'));
    });
  }

  function renderHabits() {
    const wrap = $('#habit-list');
    const empty = $('#habit-empty');
    wrap.innerHTML = '';

    state.habits.forEach((habit) => {
      const today = todayKey();
      const checked = habit.history.includes(today);
      const streak = computeStreak(habit.history);

      const div = document.createElement('div');
      div.className = 'habit-item' + (checked ? ' checked' : '');
      div.innerHTML = `
        <button class="habit-check" aria-label="check">${checked ? '✓' : ''}</button>
        <div class="habit-info">
          <div class="habit-name"></div>
          <div class="habit-meta">
            <span class="habit-streak">🔥 ${streak} ${t('day')} (${t('streak')})</span>
            <span>📅 ${habit.history.length} ${t('total')}</span>
          </div>
        </div>
        <button class="habit-delete" aria-label="delete">✕</button>
      `;
      div.querySelector('.habit-name').textContent = habit.name;

      div.querySelector('.habit-check').addEventListener('click', () => toggleHabit(habit.id));
      div.querySelector('.habit-delete').addEventListener('click', () => deleteHabit(habit.id));

      wrap.appendChild(div);
    });

    empty.classList.toggle('hidden', state.habits.length > 0);
    updateTodayDate();
  }

  function updateTodayDate() {
    const el = $('#habits-date');
    if (!el) return;
    const d = new Date();
    const locale = state.lang === 'ar' ? 'ar' : 'en-US';
    el.textContent = d.toLocaleDateString(locale, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  function toggleHabit(id) {
    const habit = state.habits.find((x) => x.id === id);
    if (!habit) return;
    const today = todayKey();
    const idx = habit.history.indexOf(today);
    if (idx === -1) habit.history.push(today);
    else habit.history.splice(idx, 1);
    saveState();
    renderHabits();
    renderStats();
  }

  function deleteHabit(id) {
    state.habits = state.habits.filter((x) => x.id !== id);
    saveState();
    renderHabits();
    showToast(t('habit_deleted'));
  }

  function computeStreak(history) {
    if (!history || history.length === 0) return 0;
    const set = new Set(history);
    let streak = 0;
    const cursor = new Date();
    if (!set.has(todayKey(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (set.has(todayKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function longestStreakAcrossHabits() {
    let max = 0;
    for (const h of state.habits) {
      const set = new Set(h.history);
      const dates = [...set].sort();
      let run = 0, best = 0, prev = null;
      for (const d of dates) {
        if (prev) {
          const pd = new Date(prev);
          pd.setDate(pd.getDate() + 1);
          run = todayKey(pd) === d ? run + 1 : 1;
        } else run = 1;
        best = Math.max(best, run);
        prev = d;
      }
      max = Math.max(max, best);
    }
    return max;
  }

  // ---------------------------- Stats -------------------------------
  function renderStats() {
    $('#stat-total-sessions').textContent = state.totalSessions;
    $('#stat-total-minutes').textContent = state.totalMinutes;
    $('#stat-tasks-done').textContent = state.tasksCompleted;
    $('#stat-streak').textContent = longestStreakAcrossHabits();
    renderWeeklyChart();
  }

  function renderWeeklyChart() {
    const chart = $('#weekly-chart');
    chart.innerHTML = '';
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const k = todayKey(d);
      const s = state.sessions[k]?.sessions || 0;
      days.push({ key: k, dow: d.getDay(), sessions: s });
    }
    const max = Math.max(1, ...days.map((d) => d.sessions));

    days.forEach((d) => {
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      const heightPct = Math.max(2, (d.sessions / max) * 100);
      bar.innerHTML = `
        <div class="chart-bar-fill" style="height:${heightPct}%" data-value="${d.sessions}"></div>
        <div class="chart-bar-label">${I18N[state.lang].days_short[d.dow]}</div>
      `;
      chart.appendChild(bar);
    });
  }

  // -------------------- Backup: Export / Import ---------------------
  function setupBackup() {
    $('#btn-export').addEventListener('click', exportData);
    $('#btn-import').addEventListener('click', () => $('#import-file').click());
    $('#import-file').addEventListener('change', importData);
  }

  function exportData() {
    const payload = {
      app: 'smart-focus-hub',
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      data: state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = todayKey().replace(/-/g, '');
    a.href = url;
    a.download = `smart-focus-hub-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t('export_done'));
  }

  function importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const data = parsed?.data;
        if (!data || typeof data !== 'object' || parsed.app !== 'smart-focus-hub') {
          throw new Error('schema');
        }
        if (!confirm(t('import_confirm'))) return;
        state = { ...defaultState, ...data, schemaVersion: SCHEMA_VERSION };
        saveState();
        applyTheme();
        applyLanguage();
        Timer.setMode('focus', 25);
        updateTodayMeta();
        renderTasks();
        renderHabits();
        renderStats();
        renderGoals();
        showToast(t('import_done'));
      } catch {
        showToast(t('import_invalid'));
      } finally {
        e.target.value = '';
      }
    };
    reader.onerror = () => {
      showToast(t('import_invalid'));
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  function setupReset() {
    $('#btn-reset-all').addEventListener('click', () => {
      if (!confirm(t('reset_confirm'))) return;
      const lang = state.lang;
      const theme = state.theme;
      state = { ...defaultState, lang, theme };
      saveState();
      renderTasks();
      renderHabits();
      renderStats();
      renderGoals();
      updateTodayMeta();
      Timer.reset();
      showToast(t('reset_done'));
    });
  }

  // ---------------------------- Tips --------------------------------
  function rotateTip() {
    const tips = I18N[state.lang].tips;
    const dayIdx = new Date().getDay();
    const tip = tips[dayIdx % tips.length];
    $('#daily-tip').textContent = tip;
  }

  // ----------------------- Toggle Handlers --------------------------
  function setupToggles() {
    $('#theme-toggle').addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyTheme();
    });

    $('#lang-toggle').addEventListener('click', () => {
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      saveState();
      applyLanguage();
    });
  }

  // ------------------------------ PWA -------------------------------
  function setupPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then((reg) => {
          // optional: detect first install
          if (!navigator.serviceWorker.controller && reg.active) {
            // existing controller already
          }
        }).catch(() => {/* ignore */});
      });
    }

    // Install prompt (Android/Chrome)
    let deferredPrompt = null;
    const installBtn = $('#install-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.classList.remove('hidden');
    });

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      try {
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') showToast(t('installed'));
      } catch {/* ignore */}
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    });

    window.addEventListener('appinstalled', () => {
      installBtn.classList.add('hidden');
      showToast(t('installed'));
    });
  }

  // -------------------------- Bootstrap -----------------------------
  function init() {
    applyTheme();
    applyLanguage();
    setupTabs();
    setupPomodoro();
    setupTasks();
    setupHabits();
    setupGoals();
    setupBackup();
    setupReset();
    setupToggles();
    setupPWA();

    renderTasks();
    renderHabits();
    renderStats();
    renderGoals();
    rotateTip();

    $$('[data-filter]').forEach((b) => b.classList.toggle('active', b.dataset.filter === state.activeFilter));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
