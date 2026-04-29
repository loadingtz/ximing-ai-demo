// ==== Tab Switching ====
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.tab).classList.add('active');
  });
});

// ==== 1. Chat Assistant ====
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatSuggest = document.getElementById('chatSuggest');

const SUGGESTIONS = [
  '桂花乌龙的SOP是什么？',
  '鲜奶冻能存放多久？',
  '客人说不甜怎么办？',
  '本月有哪些新品？',
  '岩茶拿铁的注入顺序？'
];

function renderSuggest() {
  chatSuggest.innerHTML = SUGGESTIONS.map(s => `<button>${s}</button>`).join('');
  chatSuggest.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => { chatInput.value = b.textContent; sendMessage(); });
  });
}

function appendMsg(text, who, source) {
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.textContent = text;
  if (source) {
    const s = document.createElement('div');
    s.className = 'source'; s.textContent = '📚 来源：' + source;
    div.appendChild(s);
  }
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function ragAnswer(query) {
  const q = query.toLowerCase();
  let best = null, bestScore = 0;
  for (const item of FAQ_KB) {
    const score = item.keys.reduce((s, k) => s + (q.includes(k.toLowerCase()) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = item; }
  }
  if (best && bestScore > 0) return best;
  return { answer: '抱歉，我在当前知识库没有找到对应内容。建议：\n• 试试问「桂花乌龙SOP」「鲜奶冻保质期」「本月新品」\n• 或联系总部 R&D 补充该知识点（系统已自动记录此问题）', source: '知识缺口已上报' };
}

let isAnswering = false;
function sendMessage() {
  const q = chatInput.value.trim();
  if (!q || isAnswering) return;
  appendMsg(q, 'user');
  chatInput.value = '';
  isAnswering = true;

  const aiDiv = appendMsg('', 'ai');
  aiDiv.classList.add('typing');
  aiDiv.textContent = '思考中';

  setTimeout(() => {
    const r = ragAnswer(q);
    aiDiv.classList.remove('typing');
    aiDiv.textContent = r.answer;
    if (r.source) {
      const s = document.createElement('div');
      s.className = 'source'; s.textContent = '📚 来源：' + r.source;
      aiDiv.appendChild(s);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
    isAnswering = false;
  }, 700);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

// 初始欢迎语
appendMsg('您好！我是熹茗 AI 助手，已学习全部新品资料、SOP、营销话术与门店历史问答。试着问我吧 👇', 'ai', '熹茗知识中台 v2026.4');
renderSuggest();

// ==== 2. KB ====
const kbGrid = document.getElementById('kbGrid');
const kbDetail = document.getElementById('kbDetail');

function renderKB() {
  kbGrid.innerHTML = PRODUCTS.map(p => `
    <div class="kb-card" data-id="${p.id}">
      <div class="emoji">${p.emoji}<span class="price">¥${p.price}</span></div>
      <h4>${p.name}</h4>
      <div>${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');
  kbGrid.querySelectorAll('.kb-card').forEach(c => {
    c.addEventListener('click', () => showDetail(c.dataset.id));
  });
  kbDetail.innerHTML = '<div class="empty">👆 点击上方任一新品卡片，查看 AI 自动生成的 SOP / 话术 / 营养信息 / 常见问答</div>';
}

function showDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  kbDetail.innerHTML = `
    <h3>${p.emoji} ${p.name} <small style="color:var(--muted);font-size:13px;">¥${p.price} · ${p.base}</small></h3>
    <div class="section">
      <div class="section-title">📋 标准操作流程 (SOP)</div>
      ${p.sop.map((s,i) => `<div class="sop-step"><b>步骤 ${i+1}：</b>${s}</div>`).join('')}
    </div>
    <div class="section">
      <div class="section-title">🗣 推荐销售话术</div>
      <div class="scripts">${p.scripts}</div>
    </div>
    <div class="section">
      <div class="section-title">📊 营养与过敏原</div>
      <div class="nutrition">${Object.entries(p.nutrition).map(([k,v]) => `<span><b>${k}：</b>${v}</span>`).join('')}</div>
    </div>
    <div class="section">
      <div class="section-title">❓ 常见问答（AI 自动生成 + 一线沉淀）</div>
      ${p.common_q.map(q => `<div class="sop-step"><b>Q：</b>${q.q}<br/><b>A：</b>${q.a}</div>`).join('')}
    </div>
  `;
}
renderKB();

// ==== 3. Quiz ====
const qScore = document.getElementById('qScore');
const qTotal = document.getElementById('qTotal');
const qStreak = document.getElementById('qStreak');
const quizCard = document.getElementById('quizCard');
let quizIdx = 0, score = 0, total = 0, streak = 0;

function renderQuiz() {
  const item = QUIZ[quizIdx % QUIZ.length];
  quizCard.innerHTML = `
    <h3>题目 ${total + 1} · 难度：${'★'.repeat((quizIdx % 3)+1)}</h3>
    <div class="quiz-q">${item.q}</div>
    <div class="quiz-options">
      ${item.options.map((o,i) => `<button data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}
    </div>
  `;
  quizCard.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => answerQuiz(item, parseInt(b.dataset.i), b));
  });
}
function answerQuiz(item, i, btn) {
  total++;
  const correct = i === item.answer;
  if (correct) { score++; streak++; btn.classList.add('correct'); }
  else { streak = 0; btn.classList.add('wrong'); quizCard.querySelectorAll('button')[item.answer].classList.add('correct'); }
  quizCard.querySelectorAll('button').forEach(b => b.disabled = true);
  qScore.textContent = score; qTotal.textContent = total; qStreak.textContent = streak;
  const exp = document.createElement('div');
  exp.className = 'quiz-explain';
  exp.innerHTML = (correct ? '✅ 答对了！' : '❌ 答错了 — ') + item.explain;
  quizCard.appendChild(exp);
  const next = document.createElement('button');
  next.className = 'quiz-next'; next.textContent = '下一题 →';
  next.addEventListener('click', () => { quizIdx++; renderQuiz(); });
  quizCard.appendChild(next);
}
renderQuiz();

// ==== 4. Ops ====
const adviceList = document.getElementById('adviceList');
adviceList.innerHTML = OPS_ADVICE.map(a => `
  <li>
    <span class="badge">${a.tag}</span>
    <div><div>${a.text}</div><div class="reason">↳ ${a.reason}</div></div>
  </li>
`).join('');

// 简易 chart - canvas 折线图
function drawChart() {
  const cv = document.getElementById('salesChart');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0,0,W,H);
  const days = ['周一','周二','周三','周四','周五','周六','周日'];
  const newP = [62, 78, 85, 92, 110, 145, 138];
  const oldP = [180, 175, 170, 168, 172, 195, 188];
  const max = 220;
  const padL = 50, padB = 30, padT = 20, padR = 20;
  const chartW = W - padL - padR, chartH = H - padT - padB;
  ctx.strokeStyle = '#ece3d6'; ctx.lineWidth = 1;
  for (let i=0;i<=4;i++){ const y = padT + chartH*i/4; ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
    ctx.fillStyle = '#8a7a68'; ctx.font = '11px sans-serif'; ctx.fillText(Math.round(max*(1-i/4)), 10, y+4);
  }
  ctx.fillStyle = '#8a7a68';
  days.forEach((d,i) => { const x = padL + chartW*i/(days.length-1); ctx.fillText(d, x-12, H-10); });
  function plot(arr, color) {
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.beginPath();
    arr.forEach((v,i) => { const x = padL + chartW*i/(arr.length-1); const y = padT + chartH*(1 - v/max);
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.stroke();
    ctx.fillStyle = color;
    arr.forEach((v,i) => { const x = padL + chartW*i/(arr.length-1); const y = padT + chartH*(1 - v/max);
      ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
    });
  }
  plot(newP, '#d4a373');
  plot(oldP, '#6b3f2a');
  // legend
  ctx.fillStyle = '#d4a373'; ctx.fillRect(padL, padT-12, 12, 3);
  ctx.fillStyle = '#2d2419'; ctx.font='12px sans-serif'; ctx.fillText('新品', padL+18, padT-8);
  ctx.fillStyle = '#6b3f2a'; ctx.fillRect(padL+70, padT-12, 12, 3);
  ctx.fillStyle = '#2d2419'; ctx.fillText('经典款', padL+88, padT-8);
}
// chart 在 panel 切换到 ops 时绘制 (canvas 大小问题)
const opsObserver = new MutationObserver(() => {
  if (document.getElementById('ops').classList.contains('active')) drawChart();
});
opsObserver.observe(document.getElementById('ops'), { attributes: true, attributeFilter: ['class'] });

// ==== 5. Vision ====
const fileInput = document.getElementById('fileInput');
const visionPreview = document.getElementById('visionPreview');
const visionResult = document.getElementById('visionResult');
const dropZone = document.getElementById('dropZone');

fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.style.background='#f5ede0'; });
dropZone.addEventListener('dragleave', () => dropZone.style.background='');
dropZone.addEventListener('drop', e => { e.preventDefault(); dropZone.style.background=''; if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });

function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    visionPreview.innerHTML = `<img src="${ev.target.result}" alt="出品" />`;
    runVisionAnalysis();
  };
  reader.readAsDataURL(file);
}
function runVisionAnalysis() {
  visionResult.innerHTML = '<div class="empty">🤖 AI 视觉模型分析中...</div>';
  setTimeout(() => {
    // 演示用伪评分（真实部署调用 ViT/CLIP 模型）
    const scores = [
      { name: '色泽', score: 88 + Math.floor(Math.random()*8), tip: '茶汤颜色接近标准琥珀色，建议萃取再延长 10s 提升通透度。' },
      { name: '分量', score: 92 + Math.floor(Math.random()*6), tip: '液面距杯口约 1.2cm，符合标准。' },
      { name: '装饰', score: 75 + Math.floor(Math.random()*15), tip: '桂花撒料偏少，建议补 0.1g 至标准量。' },
      { name: '温度', score: 95, tip: '热感图显示约 65℃，处于最佳出品温度区间。' }
    ];
    const overall = Math.round(scores.reduce((s,x)=>s+x.score,0)/scores.length);
    visionResult.innerHTML = `
      <h3>📷 出品 AI 评分</h3>
      ${scores.map(s => `
        <div class="score-row">
          <div style="width:50px">${s.name}</div>
          <div class="score-bar"><div style="width:${s.score}%"></div></div>
          <div style="width:36px;text-align:right;font-weight:600;">${s.score}</div>
        </div>
        <div style="font-size:12px;color:var(--muted);padding:0 0 8px 50px;">↳ ${s.tip}</div>
      `).join('')}
      <div class="overall">
        <div class="num">${overall}</div>
        <div style="color:var(--muted)">综合评分 · ${overall>=90?'✅ 达标，可出品':'⚠️ 建议复核后出品'}</div>
      </div>
    `;
  }, 900);
}

// ==== 6. Architecture Table ====
const archTbody = document.getElementById('archTable');
archTbody.innerHTML = ARCH_TABLE.map(r => `
  <tr><td><b>${r.biz}</b></td><td>${r.tech}</td><td>${r.deliver}</td><td style="color:var(--green);font-weight:600;">${r.gain}</td></tr>
`).join('');

// ==== Role Switching ====
document.getElementById('role').addEventListener('change', e => {
  const map = {
    franchisee: '👋 已切换为「加盟商店长」视角 — 重点查看运营驾驶舱与新品话术',
    staff: '👋 已切换为「门店店员」视角 — 重点关注 SOP 与培训题',
    hq: '👋 已切换为「总部运营」视角 — 关注全网知识同步率与反馈回流'
  };
  appendMsg(map[e.target.value], 'ai', '角色路由');
});
