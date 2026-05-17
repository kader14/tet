/* ==========================================================================
   Smart Focus Hub — Application Logic
   Pomodoro Timer + Tasks + Habits + Stats + i18n + Theme + LocalStorage
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
      danger_zone: 'المنطقة الحساسة',
      danger_desc: 'سيتم حذف جميع المهام والعادات والإحصائيات.',
      reset_all: 'إعادة تعيين كل شيء',
      reset_confirm: 'هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع.',
      reset_done: 'تم حذف جميع البيانات',

      session_done: 'انتهت الجلسة! استراحة جيدة 🎉',
      break_done: 'انتهت الاستراحة! وقت العودة للتركيز 💪',
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
      danger_zone: 'Danger zone',
      danger_desc: 'All tasks, habits and stats will be erased.',
      reset_all: 'Reset everything',
      reset_confirm: 'Are you sure? This cannot be undone.',
      reset_done: 'All data wiped',

      session_done: 'Session complete! Enjoy your break 🎉',
      break_done: 'Break is over! Back to focus 💪',
      days_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
  };

  // ------------------------------ State -----------------------------
  const STORAGE_KEY = 'smart-focus-hub:v1';

  const defaultState = {
    lang: 'ar',
    theme: 'light',
    tasks: [],
    habits: [],
    sessions: {},          // { 'YYYY-MM-DD': { sessions: n, minutes: m } }
    totalSessions: 0,
    totalMinutes: 0,
    tasksCompleted: 0,
    activeFilter: 'all',
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      return { ...defaultState, ...JSON.parse(raw) };
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
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

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

    // dynamic UI re-render after language change
    renderTasks();
    renderHabits();
    renderStats();
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

    const RING_LEN = 2 * Math.PI * 108; // ≈ 678.58

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
      if (running) {
        pause();
        return;
      }
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
      if (remaining <= 0) {
        complete(true);
        return;
      }
      render();
    }

    function complete(natural) {
      stop();
      remaining = totalSec;
      if (natural && mode === 'focus') {
        // Record completed focus session
        state.totalSessions += 1;
        state.totalMinutes += Math.round(totalSec / 60);
        const k = todayKey();
        state.sessions[k] = state.sessions[k] || { sessions: 0, minutes: 0 };
        state.sessions[k].sessions += 1;
        state.sessions[k].minutes += Math.round(totalSec / 60);
        saveState();
        playBeep();
        showToast(t('session_done'));
        // auto switch to short break
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
      // Update browser tab title with remaining time when running
      document.title = running
        ? `${$('#timer-display').textContent} • ${t('app_name')}`
        : `${t('app_name')} | ${state.lang === 'ar' ? 'مركز الإنتاجية الذكي' : 'Smart Focus Hub'}`;
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
    label.textContent = Timer.mode === 'focus' ? t('ready_focus') : t('mode_' + (Timer.mode === 'short' ? 'short' : 'long'));
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

    // Keyboard shortcut: Space to start/pause when not typing
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

  // Web Audio beep — no external assets needed
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

  // --------------------------- Tasks --------------------------------
  function setupTasks() {
    $('#task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('#task-input');
      const text = input.value.trim();
      if (!text) return;
      const priority = $('#task-priority').value;
      state.tasks.unshift({ id: uid(), text, priority, done: false, createdAt: Date.now() });
      input.value = '';
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
      state.tasks = state.tasks.filter((t) => !t.done);
      if (state.tasks.length !== before) {
        saveState();
        renderTasks();
        showToast(t('tasks_cleared'));
      }
    });
  }

  function renderTasks() {
    const list = $('#task-list');
    const empty = $('#task-empty');
    list.innerHTML = '';

    let visible = state.tasks;
    if (state.activeFilter === 'active') visible = state.tasks.filter((x) => !x.done);
    if (state.activeFilter === 'done') visible = state.tasks.filter((x) => x.done);

    visible.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' done' : '');
      li.innerHTML = `
        <button class="task-checkbox" aria-label="toggle"></button>
        <span class="priority-dot priority-${task.priority}" title="${t('priority_' + task.priority)}"></span>
        <span class="task-text"></span>
        <button class="task-delete" aria-label="delete">✕</button>
      `;
      li.querySelector('.task-text').textContent = task.text;

      li.querySelector('.task-checkbox').addEventListener('click', () => toggleTask(task.id));
      li.querySelector('.task-delete').addEventListener('click', () => deleteTask(task.id));

      list.appendChild(li);
    });

    empty.classList.toggle('hidden', visible.length > 0);

    const active = state.tasks.filter((x) => !x.done).length;
    const done = state.tasks.filter((x) => x.done).length;
    $('#tasks-active-count').textContent = active;
    $('#tasks-done-count').textContent = done;
  }

  function toggleTask(id) {
    const task = state.tasks.find((x) => x.id === id);
    if (!task) return;
    task.done = !task.done;
    if (task.done) state.tasksCompleted += 1;
    else state.tasksCompleted = Math.max(0, state.tasksCompleted - 1);
    saveState();
    renderTasks();
    renderStats();
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
        history: [],     // array of YYYY-MM-DD checked dates
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
    // If today not done, start streak from yesterday
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
      // compute longest run by scanning sorted dates
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

  // -------------------------- Bootstrap -----------------------------
  function init() {
    applyTheme();
    applyLanguage();
    setupTabs();
    setupPomodoro();
    setupTasks();
    setupHabits();
    setupReset();
    setupToggles();
    renderTasks();
    renderHabits();
    renderStats();
    rotateTip();

    // restore active filter chip
    $$('[data-filter]').forEach((b) => b.classList.toggle('active', b.dataset.filter === state.activeFilter));
  }

  // wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
