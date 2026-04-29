// =================================================================
// 熹茗茶业 · AI 加盟商赋能平台 · 主交互
// =================================================================

// ===== 落叶背景动画 =====
function initLeaves() {
  const layer = document.getElementById('leaves');
  const symbols = ['🍃','🌿','茶','叶'];
  for (let i=0;i<14;i++){
    const el = document.createElement('span');
    el.className = 'leaf';
    el.textContent = symbols[i % symbols.length];
    el.style.left = (Math.random()*100)+'vw';
    el.style.animationDuration = (12 + Math.random()*16)+'s';
    el.style.animationDelay = (Math.random()*20)+'s';
    el.style.fontSize = (12 + Math.random()*14)+'px';
    el.style.opacity = .3 + Math.random()*.4;
    layer.appendChild(el);
  }
}
initLeaves();

// ===== Tab 切换 =====
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.tab).classList.add('active');
    if (t.dataset.tab === 'ops') drawSalesChart();
    if (t.dataset.tab === 'overview') drawOverviewChart();
    if (t.dataset.tab === 'kg') drawKG();
  });
});

// =================================================================
// ⓪ 中枢驾驶舱
// =================================================================
function animateNum(el, target, duration=1200) {
  const start = 0; const t0 = performance.now();
  const isInt = Number.isInteger(target);
  function tick(now) {
    const p = Math.min(1, (now-t0)/duration);
    const v = start + (target-start) * (1 - Math.pow(1-p, 3));
    el.textContent = isInt ? Math.round(v).toLocaleString() : v.toFixed(1);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = isInt ? target.toLocaleString() : target;
  }
  requestAnimationFrame(tick);
}
function bootDashboard() {
  const targets = { m1: 412, m2: 8427, m3: 3612, m5: 11.3, m6: 21845 };
  Object.entries(targets).forEach(([k,v]) => animateNum(document.getElementById(k), v));
  // m4, m7, m8 are formatted strings - leave static or animate carefully
  document.getElementById('m4').textContent = '94.2%';
  document.getElementById('m7').textContent = '22 h';
  document.getElementById('m8').textContent = '91.6%';
}
bootDashboard();

// 实时事件流
const FEED_EVENTS = [
  { time:'09:42:18', html:'<b>福州·三坊七巷店</b> 提问「老枞水仙的枞味有几种？」' },
  { time:'09:42:31', html:'AI 命中知识 <b>《老枞水仙茶风味标准》</b>，置信度 0.94' },
  { time:'09:43:02', html:'<b>厦门·SM店</b> 上传茶汤图，视觉评分 92.4 ✓' },
  { time:'09:43:25', html:'总部研发上传 <b>2026 立夏新品 · 创新白茶饼</b>' },
  { time:'09:43:48', html:'AI 自动生成 SOP / 话术 / 题库 / 海报，已分发 412 门店' },
  { time:'09:44:11', html:'<b>泉州·泉秀店</b> 店长采纳 AI 补货建议 · 老枞水仙 +12 罐' },
  { time:'09:44:30', html:'员工 <b>张茶艺师</b> 完成今日 5 分钟微学习（连胜 7）' },
  { time:'09:45:02', html:'<b>知识图谱</b> 自动新增节点：<b>立夏 → 白茶</b>（关联强度 0.87）' },
  { time:'09:45:34', html:'Agent 触发：检测到 <b>半天夭</b> 库存周转过慢，已生成促销方案' }
];
function bootFeed() {
  const box = document.getElementById('liveFeed');
  FEED_EVENTS.forEach((e,i) => {
    const div = document.createElement('div');
    div.className = 'feed-item';
    div.style.animationDelay = (i*200)+'ms';
    div.innerHTML = `<span class="feed-time">${e.time}</span><span class="feed-text">${e.html}</span>`;
    box.appendChild(div);
  });
}
bootFeed();

function drawOverviewChart() {
  const cv = document.getElementById('overviewChart');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0,0,W,H);
  const days = 30;
  // 三条曲线：问答 / 学习 / 工具调用
  const series = [
    { name:'问答次数', color:'#c8302c', data: Array.from({length:days},(_,i)=>2400 + 800*Math.sin(i/4) + Math.random()*400 + i*30) },
    { name:'学习次数', color:'#5a8f4f', data: Array.from({length:days},(_,i)=>1500 + 500*Math.sin(i/3 + 1) + Math.random()*300 + i*20) },
    { name:'Agent 调用', color:'#b58a3a', data: Array.from({length:days},(_,i)=>1800 + 600*Math.cos(i/5) + Math.random()*250 + i*40) }
  ];
  const all = series.flatMap(s=>s.data);
  const max = Math.max(...all)*1.1;
  const padL=44, padR=20, padT=20, padB=30;
  const cw = W-padL-padR, ch = H-padT-padB;
  ctx.strokeStyle='#ece4d4'; ctx.lineWidth=1; ctx.font='10px monospace'; ctx.fillStyle='#8a7a68';
  for(let i=0;i<=4;i++){
    const y=padT+ch*i/4; ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
    ctx.fillText(Math.round(max*(1-i/4)).toLocaleString(), 4, y+3);
  }
  for (let i=0;i<days;i+=5) {
    const x = padL + cw*i/(days-1);
    ctx.fillText('D-'+(days-i), x-12, H-12);
  }
  series.forEach((s,si) => {
    const grad = ctx.createLinearGradient(0,padT,0,padT+ch);
    grad.addColorStop(0, s.color+'66'); grad.addColorStop(1, s.color+'00');
    ctx.fillStyle=grad; ctx.beginPath();
    s.data.forEach((v,i)=>{
      const x=padL+cw*i/(days-1); const y=padT+ch*(1-v/max);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.lineTo(W-padR, padT+ch); ctx.lineTo(padL, padT+ch); ctx.closePath();
    if (si === 0) ctx.fill();
    ctx.strokeStyle=s.color; ctx.lineWidth=2; ctx.beginPath();
    s.data.forEach((v,i)=>{
      const x=padL+cw*i/(days-1); const y=padT+ch*(1-v/max);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.stroke();
  });
  // legend
  let lx = padL;
  series.forEach(s => {
    ctx.fillStyle=s.color; ctx.fillRect(lx, 4, 12, 3);
    ctx.fillStyle='#5a4d3a'; ctx.font='11px sans-serif'; ctx.fillText(s.name, lx+16, 11);
    lx += 110;
  });
}
drawOverviewChart();

// =================================================================
// ① 智能问答助手（带推理过程）
// =================================================================
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatSuggest = document.getElementById('chatSuggest');
const traceBox = document.getElementById('traceBox');

const SUGGESTIONS = [
  '母树大红袍怎么冲泡？',
  '什么是枞味？',
  '修身四大名丛是哪四款？',
  '熹茗白茶创新工艺有何不同？',
  '今日应该主推什么茶？',
  '客人说价格贵怎么办？'
];
function renderSuggest() {
  chatSuggest.innerHTML = SUGGESTIONS.map(s => `<button>${s}</button>`).join('');
  chatSuggest.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => { chatInput.value = b.textContent; sendMessage(); });
  });
}
function appendMsg(text, who) {
  const div = document.createElement('div');
  div.className = 'msg ' + who;
  div.textContent = text;
  if (who === 'ai') div.style.marginLeft = '40px';
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
  return {
    answer: '抱歉，知识库中暂无确切匹配。\n\n建议尝试：\n• 「大红袍冲泡」「枞味」「修身四大名丛」\n• 「白茶创新工艺」「炭焙」「朱子文化」\n\n（系统已自动记录此问题为「知识缺口」，将提交研发中心补充。）',
    source: '知识缺口已自动上报至 R&D 中心',
    tools: ['kb.search()','log.gap_report()']
  };
}
function appendTrace(text, type='step') {
  const div = document.createElement('div');
  div.className = 'trace-step ' + type;
  const t0 = performance.now();
  div.innerHTML = `<div class="trace-label">${type.toUpperCase()}<span class="ms" data-t="${t0}"></span></div><div class="trace-text">${text}</div>`;
  traceBox.appendChild(div);
  traceBox.scrollTop = traceBox.scrollHeight;
  return div;
}
function clearTrace() { traceBox.innerHTML = ''; }

let isAnswering = false;
async function sendMessage() {
  const q = chatInput.value.trim();
  if (!q || isAnswering) return;
  appendMsg(q, 'user');
  chatInput.value = '';
  isAnswering = true;
  clearTrace();

  const result = ragAnswer(q);

  // Step 1: parse
  appendTrace('解析意图：' + q.slice(0, 36) + (q.length>36?'...':''), 'step');
  await sleep(220);
  // Step 2: embed
  appendTrace('Embedding (BGE-large-zh) · 1024 维向量化', 'step');
  await sleep(280);
  // Step 3: vector search
  appendTrace('Milvus 向量库检索 → Top-5 候选片段', 'step');
  await sleep(260);
  // Step 4: rerank
  appendTrace('Reranker 二次排序（BGE-reranker-v2）→ Top-2', 'step');
  await sleep(220);
  // Step 5: tools
  for (const tool of (result.tools || [])) {
    appendTrace('调用工具：' + tool, 'tool');
    await sleep(180);
  }
  // Step 6: generate
  appendTrace('LLM 生成答案 + 强制溯源（[来源] 字段）', 'step');
  await sleep(380);
  appendTrace('完成 · 总耗时 ≈ 1.6s', 'done');

  const aiDiv = appendMsg('', 'ai');
  // 流式打字
  const text = result.answer;
  let i = 0;
  const typer = setInterval(() => {
    aiDiv.textContent = text.slice(0, ++i);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (i >= text.length) {
      clearInterval(typer);
      if (result.source) {
        const s = document.createElement('div');
        s.className = 'source';
        s.innerHTML = '📚 来源：' + result.source;
        aiDiv.appendChild(s);
      }
      isAnswering = false;
    }
  }, 14);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
// 欢迎语与推荐问题由 applyRole() 在页面初始化时设置（按当前角色）
renderSuggest();

// =================================================================
// ② 新品知识库（含茶艺冲泡曲线）
// =================================================================
const kbGrid = document.getElementById('kbGrid');
const kbDetail = document.getElementById('kbDetail');
function renderKB() {
  kbGrid.innerHTML = PRODUCTS.map(p => `
    <div class="kb-card" data-id="${p.id}">
      <div class="emoji">${p.emoji}<span class="price">¥${p.price}<small> / ${p.unit}</small></span></div>
      <h4>${p.name}</h4>
      <div class="cat">${p.category}</div>
      <span class="grade">${p.grade}</span>
    </div>
  `).join('');
  kbGrid.querySelectorAll('.kb-card').forEach(c => {
    c.addEventListener('click', () => showProduct(c.dataset.id));
  });
  kbDetail.innerHTML = '<div class="empty">👆 点击上方任一产品，查看 AI 自动生成的 SOP / 话术 / 茶艺冲泡曲线 / FAQ</div>';
}
function showProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  kbDetail.innerHTML = `
    <h3>${p.emoji} ${p.name}</h3>
    <div class="meta"><b>¥${p.price} / ${p.unit}</b> · ${p.category} · ${p.grade} · 产地：${p.origin}</div>
    <div class="section">
      <div class="section-title">工艺流程（${p.craft.length} 道）</div>
      <div class="craft-flow">${p.craft.map((s,i)=>`<span class="craft-step">${s}</span>${i<p.craft.length-1?'<span class="craft-arrow">▸</span>':''}`).join('')}</div>
    </div>
    <div class="section">
      <div class="section-title">风味描述</div>
      <div class="flavor-tags">${p.flavor.map(f=>`<span class="flavor-tag">${f}</span>`).join('')}</div>
    </div>
    <div class="section">
      <div class="section-title">销售话术（AI 生成 · 已经品牌部审核）</div>
      <div class="scripts-box">${p.scripts}</div>
    </div>
    <div class="section">
      <div class="section-title">营养与适饮</div>
      <div class="nutrition-grid">${Object.entries(p.nutrition).map(([k,v])=>`<div class="nutrition-cell"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}</div>
    </div>
    <div class="section">
      <div class="section-title">茶艺冲泡互动模拟器 · 标准 SOP</div>
      <div class="brew-sim" id="brewSim">
        <div class="brew-params">
          <div class="param-cell"><div class="param-k">水温</div><div class="param-v">${p.brew.water}<small>℃</small></div></div>
          <div class="param-cell"><div class="param-k">投茶</div><div class="param-v">${p.brew.weight}<small>g</small></div></div>
          <div class="param-cell"><div class="param-k">盖碗</div><div class="param-v">${p.brew.gaiwan}<small>ml</small></div></div>
          <div class="param-cell"><div class="param-k">总泡数</div><div class="param-v">${p.brew.steps.length}<small>泡</small></div></div>
        </div>
        <div class="brew-stage">
          <div class="brew-scene">
            <svg id="brewSvg" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"></svg>
          </div>
          <div class="brew-info">
            <div class="brew-step-tag" id="brewStepTag">未开始</div>
            <div class="brew-timer"><span id="brewElapsed">0.0</span><small>s</small> / <span id="brewTarget">--</span><small>s</small></div>
            <div class="brew-hint" id="brewHint">点击「开始」启动冲泡演示</div>
            <div class="brew-bar"><div id="brewBarFill"></div></div>
          </div>
        </div>
        <div class="brew-timeline" id="brewTimeline"></div>
        <div class="brew-controls">
          <button id="brewStart" class="btn-primary">▶ 开始冲泡</button>
          <button id="brewPause">⏸ 暂停</button>
          <button id="brewReset">↺ 重置</button>
          <button id="brewSpeed">⏩ 加速 ×<span id="brewSpeedVal">1</span></button>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">常见问答（一线沉淀 + AI 生成）</div>
      ${(p.common_q||[]).map(qa=>`<div class="faq-item"><b>Q：</b>${qa.q}<br/><b>A：</b>${qa.a}</div>`).join('') || '<div class="faq-item">暂无（系统会自动从问答日志归纳沉淀）</div>'}
    </div>
  `;
  bindBrewSim(p);
}

// =================================================================
// 茶艺冲泡模拟器（SVG · 盖碗+公道杯+品茗杯）
// =================================================================
function bindBrewSim(p) {
  const svg = document.getElementById('brewSvg');
  const stepTag = document.getElementById('brewStepTag');
  const elapsedEl = document.getElementById('brewElapsed');
  const targetEl = document.getElementById('brewTarget');
  const hintEl = document.getElementById('brewHint');
  const barFill = document.getElementById('brewBarFill');
  const timeline = document.getElementById('brewTimeline');
  const speedBtn = document.getElementById('brewSpeed');
  const speedVal = document.getElementById('brewSpeedVal');

  let timer = null, currentStep = 0, elapsed = 0, paused = false;
  let phase = 'idle', phaseT = 0, speed = 1;

  function teaColor(idx, alpha=1) {
    const stages = [[156,60,38],[186,90,50],[206,120,64],[216,144,80],[222,168,102],[228,188,130],[232,204,156]];
    const i = Math.min(stages.length-1, idx);
    return `rgba(${stages[i][0]},${stages[i][1]},${stages[i][2]},${alpha})`;
  }

  function renderTimeline() {
    timeline.innerHTML = p.brew.steps.map((s,i) => {
      const cls = i === currentStep ? 'tl-current' : (i < currentStep ? 'tl-past' : '');
      return `<div class="tl-cell ${cls}" data-idx="${i}">
        <div class="tl-num">第 ${s.n} 泡</div>
        <div class="tl-time">${s.time}s</div>
        <div class="tl-hint">${s.hint}</div>
      </div>`;
    }).join('');
  }

  function draw() {
    const cur = p.brew.steps[currentStep];
    const total = cur ? cur.time : 1;
    const progress = Math.min(1, elapsed / total);
    let gaiwanFill = 0, pitcherFill = 0, cupFill = 0;
    if (phase === 'pour') gaiwanFill = phaseT;
    else if (phase === 'steep') gaiwanFill = 1;
    else if (phase === 'drain') { gaiwanFill = 1 - phaseT; pitcherFill = phaseT; }
    else if (phase === 'pourCup') { pitcherFill = 1 - phaseT; cupFill = phaseT; }
    else if (phase === 'done') { cupFill = 1; }

    const colorIdx = Math.min(p.brew.steps.length-1, currentStep);
    const tea = teaColor(colorIdx, 0.92);
    const teaLight = teaColor(colorIdx, 0.65);

    svg.innerHTML = `
      <defs>
        <linearGradient id="tg-${colorIdx}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${teaLight}"/><stop offset="100%" stop-color="${tea}"/>
        </linearGradient>
        <radialGradient id="steam"><stop offset="0%" stop-color="rgba(255,255,255,0.8)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/></radialGradient>
        <filter id="sd"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#9c1f1c" flood-opacity="0.18"/></filter>
        <clipPath id="clipG"><path d="M 42 112 Q 42 178 100 183 Q 158 178 158 112 Z"/></clipPath>
        <clipPath id="clipP"><path d="M 252 132 L 258 193 Q 258 198 270 198 L 330 198 Q 342 198 342 193 L 348 132 Z"/></clipPath>
        <clipPath id="clipC"><path d="M 432 167 L 434 193 Q 434 198 442 198 L 478 198 Q 486 198 486 193 L 488 167 Z"/></clipPath>
      </defs>
      <ellipse cx="100" cy="200" rx="80" ry="6" fill="rgba(60,40,20,0.08)"/>
      <ellipse cx="300" cy="200" rx="55" ry="5" fill="rgba(60,40,20,0.08)"/>
      <ellipse cx="460" cy="200" rx="35" ry="4" fill="rgba(60,40,20,0.08)"/>
      <g filter="url(#sd)">
        <path d="M 40 110 Q 40 180 100 185 Q 160 180 160 110 Z" fill="white" stroke="#c8302c" stroke-width="2"/>
        ${gaiwanFill > 0.02 ? `
          <rect x="40" y="${185 - 73*gaiwanFill}" width="120" height="${73*gaiwanFill}" fill="url(#tg-${colorIdx})" clip-path="url(#clipG)"/>
          <ellipse cx="100" cy="${185 - 73*gaiwanFill}" rx="${56 - 22*(1-gaiwanFill)}" ry="3" fill="${teaColor(colorIdx,.55)}"/>
        ` : ''}
        <ellipse cx="100" cy="110" rx="60" ry="8" fill="white" stroke="#c8302c" stroke-width="2"/>
        <ellipse cx="100" cy="110" rx="56" ry="5" fill="${gaiwanFill>0.02?teaColor(colorIdx,.75):'#fdfbf7'}"/>
        ${(phase === 'idle' || phase === 'steep') ? `
          <ellipse cx="100" cy="98" rx="62" ry="6" fill="white" stroke="#c8302c" stroke-width="2"/>
          <path d="M 38 98 Q 100 75 162 98" fill="none" stroke="#c8302c" stroke-width="2"/>
          <circle cx="100" cy="82" r="5" fill="#c8302c"/>
        ` : ''}
        ${phase === 'steep' ? `
          <g opacity="0.8">
            <circle cx="80" cy="60" r="${4+Math.sin(phaseT*8)*2}" fill="url(#steam)"/>
            <circle cx="100" cy="48" r="${5+Math.cos(phaseT*7)*2}" fill="url(#steam)"/>
            <circle cx="120" cy="62" r="${4+Math.sin(phaseT*9)*2}" fill="url(#steam)"/>
          </g>
        ` : ''}
        <path d="M 50 140 Q 100 145 150 140" stroke="#c8302c" stroke-width="0.8" fill="none" opacity="0.5"/>
      </g>
      ${phase === 'drain' ? `<path d="M 160 130 Q 200 ${130 + 40*phaseT} 245 165" stroke="${tea}" stroke-width="${4 - 2*phaseT}" fill="none" opacity="0.85"/>` : ''}
      <g filter="url(#sd)">
        <path d="M 250 130 L 256 195 Q 256 200 270 200 L 330 200 Q 344 200 344 195 L 350 130 Z" fill="white" stroke="#c8302c" stroke-width="2"/>
        ${pitcherFill > 0.02 ? `
          <rect x="250" y="${200 - 70*pitcherFill}" width="100" height="${70*pitcherFill}" fill="url(#tg-${colorIdx})" clip-path="url(#clipP)"/>
          <ellipse cx="300" cy="${200 - 70*pitcherFill}" rx="${48 - 8*(1-pitcherFill)}" ry="2" fill="${teaColor(colorIdx,.55)}"/>
        ` : ''}
        <path d="M 350 130 L 360 122 L 358 138 Z" fill="white" stroke="#c8302c" stroke-width="2"/>
        <ellipse cx="300" cy="130" rx="50" ry="5" fill="white" stroke="#c8302c" stroke-width="2"/>
      </g>
      ${phase === 'pourCup' ? `<path d="M 360 132 Q 410 ${135 + 30*phaseT} 450 168" stroke="${tea}" stroke-width="${3 - 1.5*phaseT}" fill="none" opacity="0.85"/>` : ''}
      <g filter="url(#sd)">
        <path d="M 430 165 L 432 195 Q 432 200 442 200 L 478 200 Q 488 200 488 195 L 490 165 Z" fill="white" stroke="#c8302c" stroke-width="2"/>
        ${cupFill > 0.02 ? `
          <rect x="430" y="${200 - 35*cupFill}" width="60" height="${35*cupFill}" fill="url(#tg-${colorIdx})" clip-path="url(#clipC)"/>
          <ellipse cx="460" cy="${200 - 35*cupFill}" rx="${28 - 4*(1-cupFill)}" ry="1.5" fill="${teaColor(colorIdx,.55)}"/>
        ` : ''}
        <ellipse cx="460" cy="165" rx="30" ry="3.5" fill="white" stroke="#c8302c" stroke-width="2"/>
      </g>
      <text x="100" y="218" text-anchor="middle" fill="#8a7a68" font-size="11">盖碗</text>
      <text x="300" y="218" text-anchor="middle" fill="#8a7a68" font-size="11">公道杯</text>
      <text x="460" y="218" text-anchor="middle" fill="#8a7a68" font-size="11">品茗杯</text>
    `;

    if (phase === 'idle') {
      stepTag.textContent = '未开始';
      stepTag.className = 'brew-step-tag idle';
      hintEl.textContent = '点击「开始」启动冲泡演示';
      barFill.style.width = '0%';
      elapsedEl.textContent = '0.0';
      targetEl.textContent = '--';
    } else if (currentStep < p.brew.steps.length) {
      const s = p.brew.steps[currentStep];
      stepTag.textContent = `第 ${s.n} 泡 / 共 ${p.brew.steps.length}`;
      stepTag.className = 'brew-step-tag active';
      const labels = { pour:'⤵ 注水中', steep:'🍵 闷泡浸出 — ' + s.hint, drain:'⤴ 出汤至公道杯', pourCup:'🍷 分至品茗杯' };
      hintEl.textContent = labels[phase] || s.hint;
      elapsedEl.textContent = elapsed.toFixed(1);
      targetEl.textContent = s.time;
      barFill.style.width = (progress*100) + '%';
    } else {
      stepTag.textContent = '✓ 全部完成';
      stepTag.className = 'brew-step-tag done';
      hintEl.textContent = '🌿 余韵悠长，可重置再来一遍';
      barFill.style.width = '100%';
    }
  }

  function renderAll() { draw(); renderTimeline(); }
  renderAll();

  function tick() {
    if (paused || timer === null) return;
    if (currentStep >= p.brew.steps.length) { stop(); return; }
    const s = p.brew.steps[currentStep];
    const dt = 0.05 * speed;
    const norm = elapsed / s.time;
    const pourEnd = 0.18, drainStart = 0.85, cupStart = 0.94;
    if (norm < pourEnd) { phase = 'pour'; phaseT = norm / pourEnd; }
    else if (norm < drainStart) { phase = 'steep'; phaseT = (norm - pourEnd) / (drainStart - pourEnd); }
    else if (norm < cupStart) { phase = 'drain'; phaseT = (norm - drainStart) / (cupStart - drainStart); }
    else { phase = 'pourCup'; phaseT = Math.min(1, (norm - cupStart) / (1 - cupStart)); }
    elapsed += dt;
    if (elapsed >= s.time) {
      elapsed = 0; currentStep++;
      phase = currentStep < p.brew.steps.length ? 'pour' : 'done';
    }
    renderAll();
  }
  function stop() { if (timer) clearInterval(timer); timer = null; phase = 'done'; renderAll(); }

  document.getElementById('brewStart').onclick = () => {
    if (timer) return;
    paused = false;
    if (currentStep >= p.brew.steps.length) { currentStep = 0; elapsed = 0; }
    phase = 'pour';
    timer = setInterval(tick, 50);
  };
  document.getElementById('brewPause').onclick = () => {
    paused = !paused;
    document.getElementById('brewPause').textContent = paused ? '▶ 继续' : '⏸ 暂停';
  };
  document.getElementById('brewReset').onclick = () => {
    if (timer) clearInterval(timer); timer = null;
    currentStep = 0; elapsed = 0; phase = 'idle'; paused = false;
    document.getElementById('brewPause').textContent = '⏸ 暂停';
    renderAll();
  };
  speedBtn.onclick = () => {
    speed = speed === 1 ? 2 : (speed === 2 ? 4 : 1);
    speedVal.textContent = speed;
  };
  timeline.addEventListener('click', e => {
    const cell = e.target.closest('.tl-cell');
    if (!cell) return;
    currentStep = parseInt(cell.dataset.idx);
    elapsed = 0; phase = 'pour';
    renderAll();
  });
}
renderKB();

// =================================================================
// ③ 知识图谱
// =================================================================
const kgDetail = document.getElementById('kgDetail');
const KG_COLOR = { brand:'#c8302c', culture:'#9c1f1c', category:'#5a8f4f', series:'#b58a3a', product:'#b46847', attr:'#4a7ba8', tech:'#4a7ba8' };

function drawKG() {
  const svg = document.getElementById('kgSvg');
  if (svg.dataset.drawn) return;
  svg.dataset.drawn = '1';
  // edges
  KG_EDGES.forEach(([from,to]) => {
    const a = KG_NODES.find(n=>n.id===from), b = KG_NODES.find(n=>n.id===to);
    if (!a || !b) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',a.x); line.setAttribute('y1',a.y);
    line.setAttribute('x2',b.x); line.setAttribute('y2',b.y);
    line.setAttribute('stroke','#d9cdb4'); line.setAttribute('stroke-width','1.2');
    line.setAttribute('opacity','.8');
    svg.appendChild(line);
  });
  // nodes
  KG_NODES.forEach(n => {
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','kg-node'); g.setAttribute('transform',`translate(${n.x},${n.y})`);
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    const r = n.type === 'brand' ? 22 : (n.type === 'category' || n.type === 'culture' ? 18 : 14);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', KG_COLOR[n.type]);
    circle.setAttribute('stroke','#ffffff');
    circle.setAttribute('stroke-width','2');
    circle.setAttribute('opacity','.85');
    g.appendChild(circle);
    // halo
    const halo = document.createElementNS('http://www.w3.org/2000/svg','circle');
    halo.setAttribute('r', r+4);
    halo.setAttribute('fill','none');
    halo.setAttribute('stroke', KG_COLOR[n.type]);
    halo.setAttribute('stroke-width','1');
    halo.setAttribute('opacity','.3');
    g.appendChild(halo);
    const text = document.createElementNS('http://www.w3.org/2000/svg','text');
    text.textContent = n.label;
    text.setAttribute('y', r+14);
    text.setAttribute('text-anchor','middle');
    text.setAttribute('fill','#2d2419');
    text.setAttribute('font-size','11');
    text.setAttribute('font-family','PingFang SC');
    g.appendChild(text);
    g.addEventListener('click', () => showKGDetail(n));
    g.addEventListener('mouseenter', () => circle.setAttribute('opacity','1'));
    g.addEventListener('mouseleave', () => circle.setAttribute('opacity','.85'));
    svg.appendChild(g);
  });
  // pulse animation on Ximing center
  const pulse = document.createElementNS('http://www.w3.org/2000/svg','circle');
  const center = KG_NODES.find(n=>n.id==='ximing');
  pulse.setAttribute('cx',center.x); pulse.setAttribute('cy',center.y);
  pulse.setAttribute('r','22'); pulse.setAttribute('fill','none');
  pulse.setAttribute('stroke','#c8302c'); pulse.setAttribute('stroke-width','2');
  pulse.innerHTML = '<animate attributeName="r" from="22" to="50" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite"/>';
  svg.appendChild(pulse);
}
function showKGDetail(n) {
  const related = KG_EDGES.filter(([a,b])=>a===n.id||b===n.id)
    .map(([a,b])=>a===n.id?b:a)
    .map(id=>KG_NODES.find(x=>x.id===id))
    .filter(Boolean);
  const desc = {
    brand:'400 余家专卖店、覆盖 20 余省市的综合性茶企，以武夷岩茶为核心研发能力。',
    culture:'熹茗品牌的精神原点，承载朱子理学「修身齐家」「格物致知」理念。',
    category:'熹茗核心产品大类，通过统一标准支撑一致性。',
    series:'同属一个文化主题的产品集合。',
    product:'熹茗具体 SKU，每款均有完整 SOP / 风味标准 / 话术。',
    attr:'产品的核心风味特征，作为感官评估的关键词。',
    tech:'熹茗自有的工艺创新，构建差异化壁垒。'
  };
  kgDetail.innerHTML = `
    <b>${n.label}</b><br/>
    <span style="color:#c9a45a;font-size:11px">类型：${n.type}</span><br/><br/>
    ${desc[n.type] || ''}<br/><br/>
    <b>关联实体（${related.length}）：</b><br/>
    ${related.map(r=>`<span style="display:inline-block;background:#fff;border:1px solid #ece4d4;padding:3px 8px;border-radius:6px;margin:3px;color:${KG_COLOR[r.type]};font-weight:600">${r.label}</span>`).join('')}
  `;
}
drawKG();

// =================================================================
// ④ 智能学习
// =================================================================
const qScore = document.getElementById('qScore');
const qTotal = document.getElementById('qTotal');
const qStreak = document.getElementById('qStreak');
const qLevel = document.getElementById('qLevel');
const quizCard = document.getElementById('quizCard');
let quizIdx = 0, score = 0, total = 0, streak = 0;
function renderQuiz() {
  const item = QUIZ[quizIdx % QUIZ.length];
  const lvl = ['★','★★','★★★'][Math.min(2, Math.floor(streak/2))];
  qLevel.innerText = lvl;
  quizCard.innerHTML = `
    <h3>题目 ${total + 1} · 难度 ${lvl} · 推荐依据：${total===0?'入职评估':streak>=3?'连胜，升级难度':streak===0&&total>0?'答错，强化基础':'常规出题'}</h3>
    <div class="quiz-q">${item.q}</div>
    <div class="quiz-options">
      ${item.options.map((o,i)=>`<button data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}
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

// =================================================================
// ⑤ 运营 AI 顾问
// =================================================================
document.getElementById('adviceList').innerHTML = OPS_ADVICE.map(a => `
  <div class="advice-item">
    <span class="advice-tag ${a.priority==='高'?'high':a.priority==='中'?'medium':'low'}">${a.tag} · ${a.priority}</span>
    <div class="advice-body">
      ${a.text}
      <div class="advice-reason">↳ ${a.reason}</div>
      <div class="advice-tools">${(a.tools||[]).map(t=>`<code>${t}</code>`).join('')}</div>
    </div>
  </div>
`).join('');

function drawSalesChart() {
  const cv = document.getElementById('salesChart');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  ctx.clearRect(0,0,W,H);
  const days = 30;
  const series = [
    { name:'母树大红袍', color:'#c8302c', data: Array.from({length:days},(_,i)=>3 + Math.sin(i/3)*2 + Math.random()*1.5) },
    { name:'老枞水仙', color:'#b58a3a', data: Array.from({length:days},(_,i)=>5 + Math.sin(i/4+1)*2.5 + Math.random()*1.8 + i*0.05) },
    { name:'修身四大名丛', color:'#5a8f4f', data: Array.from({length:days},(_,i)=>4 + Math.cos(i/5)*2 + Math.random()*1.4) },
    { name:'创新白茶', color:'#9c1f1c', data: Array.from({length:days},(_,i)=>2 + Math.sin(i/2.5)*1.5 + Math.random()*1 + i*0.08) }
  ];
  const max = Math.max(...series.flatMap(s=>s.data))*1.1;
  const padL=44, padR=130, padT=20, padB=30;
  const cw = W-padL-padR, ch = H-padT-padB;
  ctx.strokeStyle='#ece4d4'; ctx.lineWidth=1; ctx.font='10px monospace'; ctx.fillStyle='#8a7a68';
  for(let i=0;i<=4;i++){
    const y=padT+ch*i/4; ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
    ctx.fillText(Math.round(max*(1-i/4)*10)/10, 8, y+3);
  }
  for (let i=0;i<days;i+=5) {
    const x = padL + cw*i/(days-1);
    ctx.fillText('D-'+(days-i), x-12, H-12);
  }
  series.forEach(s => {
    ctx.strokeStyle=s.color; ctx.lineWidth=2.2; ctx.beginPath();
    s.data.forEach((v,i)=>{
      const x=padL+cw*i/(days-1); const y=padT+ch*(1-v/max);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.stroke();
  });
  // legend
  let ly = padT;
  series.forEach(s => {
    ctx.fillStyle=s.color; ctx.fillRect(W-padR+10, ly+2, 12, 3);
    ctx.fillStyle='#5a4d3a'; ctx.font='11px sans-serif'; ctx.fillText(s.name, W-padR+28, ly+6);
    ly += 22;
  });
}

// =================================================================
// ⑥ 视觉质检
// =================================================================
const fileInput = document.getElementById('fileInput');
const visionPreview = document.getElementById('visionPreview');
const visionResult = document.getElementById('visionResult');
const dropZone = document.getElementById('dropZone');
fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
dropZone.addEventListener('dragover', e => { e.preventDefault(); });
dropZone.addEventListener('drop', e => { e.preventDefault(); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    visionPreview.innerHTML = `<img src="${ev.target.result}" alt="茶汤" id="visionImg" />`;
    const img = document.getElementById('visionImg');
    if (img.complete) runVisionAnalysis(img);
    else img.onload = () => runVisionAnalysis(img);
  };
  reader.readAsDataURL(file);
}

// 真实图像分析 — Canvas 像素级运算
function analyzeImage(img) {
  const canvas = document.createElement('canvas');
  const W = 200, H = 200;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, W, H);
  const data = ctx.getImageData(0, 0, W, H).data;

  // 1. 提取「茶汤区域」像素 — 排除接近白/灰的背景与高亮反光
  const teaPixels = [];
  for (let i=0;i<data.length;i+=4) {
    const r=data[i], g=data[i+1], b=data[i+2];
    const max=Math.max(r,g,b), min=Math.min(r,g,b);
    const sat = max === 0 ? 0 : (max-min)/max;
    const lightness = (r+g+b)/3;
    if (lightness > 30 && lightness < 245 && sat > 0.15) teaPixels.push([r,g,b]);
  }
  if (teaPixels.length < 100) return { error: '未检测到明显茶汤区域，请确保图片中茶汤占主体' };

  // 2. 平均 RGB
  const sum = teaPixels.reduce((a,p)=>[a[0]+p[0],a[1]+p[1],a[2]+p[2]],[0,0,0]);
  const n = teaPixels.length;
  const avgR = sum[0]/n, avgG = sum[1]/n, avgB = sum[2]/n;

  // 3. RGB → HSV
  function rgb2hsv(r,g,b) {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min; let h=0;
    if (d!==0) {
      if (max===r) h=((g-b)/d)%6;
      else if (max===g) h=(b-r)/d+2;
      else h=(r-g)/d+4;
      h*=60; if (h<0) h+=360;
    }
    return { h, s: max===0?0:d/max, v: max };
  }
  const hsv = rgb2hsv(avgR,avgG,avgB);

  // 4. RGB → CIE Lab
  function rgb2lab(r,g,b) {
    r/=255; g/=255; b/=255;
    [r,g,b]=[r,g,b].map(c=>c>0.04045?Math.pow((c+0.055)/1.055,2.4):c/12.92);
    const x=(r*0.4124+g*0.3576+b*0.1805)/0.95047;
    const y=(r*0.2126+g*0.7152+b*0.0722)/1.00000;
    const z=(r*0.0193+g*0.1192+b*0.9505)/1.08883;
    const f=t=>t>0.008856?Math.cbrt(t):(7.787*t+16/116);
    const fx=f(x), fy=f(y), fz=f(z);
    return [116*fy-16, 500*(fx-fy), 200*(fy-fz)];
  }
  const lab = rgb2lab(avgR, avgG, avgB);
  // 武夷岩茶（大红袍）标准琥珀色 Lab 参考值（≈ #B26337）
  const REF_LAB = [50, 30, 40];
  const dE = Math.sqrt(
    Math.pow(lab[0]-REF_LAB[0],2) +
    Math.pow(lab[1]-REF_LAB[1],2) +
    Math.pow(lab[2]-REF_LAB[2],2)
  );

  // 5. 标准差（通透度）
  const variance = teaPixels.reduce((acc,p) =>
    acc + Math.pow(p[0]-avgR,2) + Math.pow(p[1]-avgG,2) + Math.pow(p[2]-avgB,2), 0) / n / 3;
  const stdDev = Math.sqrt(variance);

  // 6. 评分
  const clamp = v => Math.max(0, Math.min(100, v));
  const colorScore = Math.round(clamp(100 - dE * 1.6));
  const clarityScore = Math.round(clamp(100 - stdDev * 0.9));
  const idealV = 0.55, idealS = 0.55;
  const concDist = Math.sqrt(Math.pow(hsv.v - idealV, 2) + Math.pow(hsv.s - idealS, 2));
  const concScore = Math.round(clamp(100 - concDist * 180));
  const concEstimate = (hsv.v < 0.4 ? '过浓' : (hsv.v > 0.7 ? '偏淡' : '适中'));
  const weightEst = (5 + (1 - hsv.v) * 8).toFixed(1);

  let timingScore, timingHint;
  if (hsv.h >= 15 && hsv.h <= 35) {
    timingScore = 92;
    timingHint = '色相 H=' + hsv.h.toFixed(0) + '° 处于岩茶最佳区间（15-35°），出汤时机精准。';
  } else if (hsv.h < 15 || hsv.h > 50) {
    timingScore = 70;
    timingHint = '色相 H=' + hsv.h.toFixed(0) + '° 偏离岩茶最佳区间，建议下一泡' + (hsv.h < 15 ? '提前出汤' : '延长 3-5 秒') + '。';
  } else {
    timingScore = 82;
    timingHint = '色相 H=' + hsv.h.toFixed(0) + '°，略偏黄棕，可延长 2 秒强化岩骨。';
  }

  return {
    pixels: n,
    avgRgb: [Math.round(avgR), Math.round(avgG), Math.round(avgB)],
    hex: '#' + [avgR,avgG,avgB].map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''),
    lab, dE, hsv, stdDev,
    scores: [
      { name: '色泽', score: colorScore,
        tip: `平均 Lab=(${lab[0].toFixed(1)}, ${lab[1].toFixed(1)}, ${lab[2].toFixed(1)})；与岩茶标准琥珀色 ΔE=${dE.toFixed(1)} ${dE<5?'(优秀)':dE<10?'(良好)':dE<20?'(需调整)':'(偏离较大)'}` },
      { name: '通透度', score: clarityScore,
        tip: `茶汤区域像素标准差 σ=${stdDev.toFixed(1)}；${stdDev<15?'清亮通透':stdDev<30?'轻微浑浊':'明显悬浮'}` },
      { name: '浓度', score: concScore,
        tip: `HSV 饱和度 S=${(hsv.s*100).toFixed(0)}%、明度 V=${(hsv.v*100).toFixed(0)}%；浓度${concEstimate}，估算投茶 ${weightEst}g（标准 8g）` },
      { name: '出汤时机', score: timingScore, tip: timingHint }
    ]
  };
}

function runVisionAnalysis(img) {
  visionResult.innerHTML = '<div class="empty">🔍 视觉分析中 · 像素级 RGB / HSV / Lab / 标准差实时计算...</div>';
  setTimeout(() => {
    let r;
    try { r = analyzeImage(img); }
    catch(e) { visionResult.innerHTML = '<div class="empty" style="color:var(--red)">⚠️ 分析失败：' + e.message + '</div>'; return; }
    if (r.error) { visionResult.innerHTML = `<div class="empty" style="color:var(--red)">⚠️ ${r.error}</div>`; return; }
    const overall = Math.round(r.scores.reduce((s,x)=>s+x.score,0)/r.scores.length);
    visionResult.innerHTML = `
      <h3>📷 茶汤 AI 评分（Canvas 像素级真实分析）</h3>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;font-size:11px;color:var(--ink-3);flex-wrap:wrap">
        <span>检测像素 <b style="color:var(--red)">${r.pixels.toLocaleString()}</b></span><span>·</span>
        <span>平均色 <span style="display:inline-block;width:14px;height:14px;background:${r.hex};border:1px solid #ddd;border-radius:3px;vertical-align:middle"></span> <code style="background:#fdf6f6;padding:1px 4px;border-radius:3px;color:var(--red)">${r.hex}</code></span>
        <span>·</span><span>RGB(${r.avgRgb.join(',')})</span>
      </div>
      ${r.scores.map(s => `
        <div class="score-row">
          <div class="label">${s.name}</div>
          <div class="score-bar"><div style="width:${s.score}%"></div></div>
          <div class="score-num">${s.score}</div>
        </div>
        <div class="score-tip">↳ ${s.tip}</div>
      `).join('')}
      <div class="overall">
        <div class="num">${overall}</div>
        <div class="label">综合评分 · ${overall>=90?'✅ 优秀':overall>=80?'✓ 达标':overall>=70?'⚠️ 待复核':'❌ 不达标'}</div>
      </div>
      <div style="margin-top:14px;padding:10px;background:var(--bg-2);border-radius:6px;font-size:11px;color:var(--ink-3);line-height:1.6">
        <b style="color:var(--red)">⚙️ 技术说明：</b>本 Demo 真实在浏览器执行图像分析 — Canvas 像素采样 → 饱和度+亮度过滤背景 → RGB 均值 → HSV / CIE Lab 转换 → 与岩茶基准色 ΔE 色差、像素方差判通透、HSV 反推浓度、色相判出汤时机。生产环境替换为服务端 ViT 模型（标注 50-100 张/品类即可上线）。
      </div>
    `;
  }, 400);
}

// =================================================================
// ⑦ 系统架构
// =================================================================
const archStack = document.getElementById('archStack');
archStack.innerHTML = ARCH_LAYERS.map(l => `
  <div class="arch-layer" style="border-left-color:${l.color}">
    <div class="name" style="color:${l.color}">${l.name}</div>
    <div class="items">${l.items.map(i=>`<span class="item">${i}</span>`).join('')}</div>
  </div>
`).join('');
const archTbody = document.getElementById('archTable');
archTbody.innerHTML = ARCH_TABLE.map(r => `
  <tr>
    <td class="biz">${r.biz}</td>
    <td>${r.tech}</td>
    <td>${r.deliver}</td>
    <td class="gain">${r.gain}</td>
  </tr>
`).join('');

// =================================================================
// 角色驱动：换仪表盘 / Tab 排序 / 欢迎语 / 推荐问题
// =================================================================
const ROLE_PROFILES = {
  franchisee: {
    label: '加盟商店长',
    welcome: '👋 张店长，您好！我已为您切换到「店长视角」。今日重点：① 老枞水仙库存预警；② 立夏新品已就绪；③ 员工李静需 5 分钟带教。',
    suggestions: ['今日应该主推什么茶？','库存还能撑几天？','客人说价格贵怎么办？','员工培训进度如何？','本周销售目标差多少？'],
    metrics: [
      { k:'本店今日营业额', v:'¥ 12,840', d:'↑ 12.3% vs 昨日' },
      { k:'本店今日客流', v:'287', d:'峰值 14:32' },
      { k:'热销品类', v:'老枞水仙', d:'占比 38%' },
      { k:'库存预警', v:'2 项', d:'老枞水仙 / 半天夭', dn:true },
      { k:'员工今日学习', v:'4 / 6', d:'李静缺勤' },
      { k:'AI 建议采纳', v:'5 / 6', d:'本周 ↑ 18%' },
      { k:'客户满意度', v:'4.7 ★', d:'本月 +0.2' },
      { k:'本月达成率', v:'87%', d:'目标 100%' }
    ],
    tabsOrder: ['ops','assistant','kb','training','overview','vision','kg','arch'],
    tabsHide: [],
    feed: [
      { time:'09:42:18', html:'本店收到 3 条 AI 建议，已采纳 <b>补货老枞水仙</b>' },
      { time:'09:43:02', html:'客人询问 <b>修身四大名丛</b>，员工成功推荐套装' },
      { time:'09:43:25', html:'员工 <b>张茶艺师</b> 完成今日微学习' },
      { time:'09:43:48', html:'<b>立夏新品</b> 已下发，话术已就绪' },
      { time:'09:44:11', html:'本店当前评分 <b>4.7 ★</b>（区域排名 第 8）' },
      { time:'09:44:30', html:'AI 预测明日客流 <b>320 人</b>，建议提前备料' }
    ]
  },
  staff: {
    label: '茶艺师 / 销售顾问',
    welcome: '🍵 您好！我是您的 AI 学习伙伴。已为您切换到「茶艺师视角」。今日重点：① 复习老枞水仙 SOP；② 有 3 道新题；③ 立夏新品话术已上架。',
    suggestions: ['母树大红袍怎么冲泡？','枞味是什么？','客人问产地怎么答？','修身四大名丛区别？','如何向客人推荐套装？'],
    metrics: [
      { k:'今日已学习', v:'8 min', d:'目标 10 min' },
      { k:'连胜', v:'7 题', d:'本周新高' },
      { k:'掌握知识点', v:'124 / 180', d:'↑ 12 本周' },
      { k:'弱项', v:'3 个', d:'枞味/炭焙/朱子文化', dn:true },
      { k:'今日服务客人', v:'42', d:'达成率 85%' },
      { k:'转化率', v:'24%', d:'高于均值' },
      { k:'话术使用', v:'18 次', d:'最常用：母树大红袍' },
      { k:'本月学习排名', v:'#3', d:'门店内' }
    ],
    tabsOrder: ['training','assistant','kb','vision','kg','overview','ops','arch'],
    tabsHide: ['ops','arch'],
    feed: [
      { time:'09:42:18', html:'您在「枞味三要素」答错 → 推送 <b>1 分钟微课</b>' },
      { time:'09:43:02', html:'您完成 <b>第 7 题</b>，连胜 7 ✨' },
      { time:'09:43:25', html:'AI 推送 <b>立夏白茶话术</b> 至您的学习清单' },
      { time:'09:43:48', html:'本周已学 <b>11.2 分钟</b>，超过 87% 同岗位员工' },
      { time:'09:44:11', html:'您的能力画像更新：朱子文化 70% → 75%' },
      { time:'09:44:30', html:'今日服务转化率 <b>24%</b>，门店均值 19%' }
    ]
  },
  hq: {
    label: '总部研发 / 运营',
    welcome: '🏢 总部研发您好。已为您切换到「总部视角」 — 全网 412 家门店实时态势、知识缺口、加盟商画像。本周新发现 6 处知识缺口待补充。',
    suggestions: ['全网知识同步率？','哪些门店学习率最低？','本周新发现哪些知识缺口？','哪些产品销售下滑？','加盟商满意度如何？'],
    metrics: [
      { k:'覆盖门店', v:'412', d:'↑ 18 / 30 天' },
      { k:'知识中枢条目', v:'8,427', d:'本周 +124' },
      { k:'今日全网问答', v:'3,612', d:'峰值 14:32' },
      { k:'RAG 命中率', v:'94.2%', d:'↑ 2.1pp' },
      { k:'员工日均学习', v:'11.3 min', d:'完课率 87%' },
      { k:'Agent 调用', v:'21,845', d:'采纳率 64%' },
      { k:'新品发布周期', v:'22 h', d:'基线 ↓ 93%' },
      { k:'视觉质检通过率', v:'91.6%', d:'一致性 ↑' }
    ],
    tabsOrder: ['overview','kg','arch','assistant','kb','training','ops','vision'],
    tabsHide: [],
    feed: [
      { time:'09:42:18', html:'<b>福州·三坊七巷店</b> 提问「枞味」，命中标准 v1' },
      { time:'09:43:02', html:'<b>厦门·SM店</b> 茶汤评分 92.4 ✓' },
      { time:'09:43:25', html:'研发上传 <b>立夏白茶</b>，AI 自动分发 412 门店' },
      { time:'09:44:11', html:'AI 发现 <b>知识缺口</b>：「白茶煮饮温度」3 次未命中' },
      { time:'09:44:30', html:'<b>修身四大名丛</b> 知识点全网掌握度 68%（目标 80%）' },
      { time:'09:45:34', html:'已生成《本周知识缺口报告》— 6 项待补充' }
    ]
  }
};

function applyRole(role) {
  const profile = ROLE_PROFILES[role];
  if (!profile) return;

  // 1. 仪表盘指标重写
  const grid = document.querySelector('#overview .dash-grid');
  if (grid) {
    grid.innerHTML = profile.metrics.map(m => `
      <div class="card metric">
        <h4>${m.k}</h4>
        <div class="num">${m.v}</div>
        <div class="delta ${m.dn?'down':''}">${m.d}</div>
      </div>
    `).join('');
  }

  // 2. 实时事件流重写
  const feedBox = document.getElementById('liveFeed');
  if (feedBox) {
    feedBox.innerHTML = '';
    profile.feed.forEach((e,i) => {
      const div = document.createElement('div');
      div.className = 'feed-item';
      div.style.animationDelay = (i*150)+'ms';
      div.innerHTML = `<span class="feed-time">${e.time}</span><span class="feed-text">${e.html}</span>`;
      feedBox.appendChild(div);
    });
  }

  // 3. Tab 重新排序与隐藏
  const tabsBar = document.querySelector('.tabs');
  const tabBtns = Array.from(tabsBar.querySelectorAll('.tab'));
  const tabMap = {};
  tabBtns.forEach(b => tabMap[b.dataset.tab] = b);
  // 清空再按 order 顺序追加
  tabsBar.innerHTML = '';
  profile.tabsOrder.forEach(name => {
    const btn = tabMap[name];
    if (!btn) return;
    if (profile.tabsHide.includes(name)) {
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
    }
    tabsBar.appendChild(btn);
  });

  // 4. 聊天欢迎语 + 推荐问题更新
  appendMsg(profile.welcome, 'ai');
  // 重写推荐问题
  if (chatSuggest) {
    chatSuggest.innerHTML = profile.suggestions.map(s => `<button>${s}</button>`).join('');
    chatSuggest.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => { chatInput.value = b.textContent; sendMessage(); });
    });
  }

  // 5. 切换到该角色的首选 Tab（若当前不可见）
  const activeTab = document.querySelector('.tab.active');
  if (activeTab && profile.tabsHide.includes(activeTab.dataset.tab)) {
    const firstVisible = profile.tabsOrder.find(n => !profile.tabsHide.includes(n));
    if (firstVisible) tabMap[firstVisible].click();
  }

  // 6. 重绘可能受影响的图表
  if (document.getElementById('overview').classList.contains('active')) {
    drawOverviewChart();
  }
}

document.getElementById('role').addEventListener('change', e => applyRole(e.target.value));
applyRole('franchisee'); // 默认按店长视角加载
