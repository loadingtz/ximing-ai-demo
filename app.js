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
appendMsg('您好，我是熹茗 AI 知识中枢助手。已学习全部产品 SOP、《老枞水仙风味标准》、朱子文化体系、销售话术、运营经验。所有回答均带可追溯来源。', 'ai');
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
      <div class="section-title">茶艺冲泡参数 · 标准 SOP</div>
      <div class="brew-sim" id="brewSim">
        <h4>🍵 互动茶艺模拟器</h4>
        <div class="brew-controls">
          <button id="brewStart">▶ 开始模拟冲泡</button>
          <button id="brewReset">↺ 重置</button>
          <span class="meta-info">水温 ${p.brew.water}℃ · 投茶 ${p.brew.weight}g · 盖碗 ${p.brew.gaiwan}ml · 共 ${p.brew.steps.length} 泡</span>
        </div>
        <div class="brew-canvas-wrap"><canvas id="brewCanvas" width="780" height="180"></canvas></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">常见问答（一线沉淀 + AI 生成）</div>
      ${(p.common_q||[]).map(qa=>`<div class="faq-item"><b>Q：</b>${qa.q}<br/><b>A：</b>${qa.a}</div>`).join('') || '<div class="faq-item">暂无（系统会自动从问答日志归纳沉淀）</div>'}
    </div>
  `;
  bindBrewSim(p);
}

// 茶艺冲泡模拟器
function bindBrewSim(p) {
  const cv = document.getElementById('brewCanvas');
  const ctx = cv.getContext('2d');
  let timer = null, currentStep = 0, elapsed = 0;
  function draw() {
    const W = cv.width, H = cv.height;
    ctx.clearRect(0,0,W,H);
    // 标尺
    const padL = 60, padR = 20, padT = 30, padB = 40;
    const cw = W-padL-padR, ch = H-padT-padB;
    const maxT = Math.max(...p.brew.steps.map(s=>s.time)) * 1.2;
    ctx.strokeStyle='#3a2c20'; ctx.lineWidth=1;
    ctx.fillStyle='#7d6e58'; ctx.font='10px monospace';
    for (let i=0;i<=4;i++){
      const y = padT + ch*i/4;
      ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
      ctx.fillText(Math.round(maxT*(1-i/4))+'s', 8, y+3);
    }
    // 柱状条
    const bw = cw / p.brew.steps.length * 0.7;
    const gap = cw / p.brew.steps.length;
    p.brew.steps.forEach((s, i) => {
      const x = padL + gap*i + (gap-bw)/2;
      const h = ch * (s.time/maxT);
      const y = padT + ch - h;
      const isCurrent = i === currentStep;
      const isPast = i < currentStep;
      const grad = ctx.createLinearGradient(0, y, 0, padT+ch);
      if (isCurrent) { grad.addColorStop(0,'#e04944'); grad.addColorStop(1,'#9c1f1c'); }
      else if (isPast) { grad.addColorStop(0,'#7da17c'); grad.addColorStop(1,'#5a8f4f'); }
      else { grad.addColorStop(0,'#ece4d4'); grad.addColorStop(1,'#d9cdb4'); }
      ctx.fillStyle = grad; ctx.fillRect(x, y, bw, h);
      ctx.fillStyle = isCurrent ? '#c8302c' : (isPast ? '#5a8f4f' : '#8a7a68');
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('第'+s.n+'泡', x+4, padT+ch+15);
      ctx.font = '10px monospace';
      ctx.fillText(s.time+'s', x+4, padT+ch+27);
      if (isCurrent) {
        const progress = Math.min(1, elapsed / s.time);
        ctx.fillStyle = 'rgba(200,48,44,.25)';
        ctx.fillRect(x, padT+ch - h*progress, bw, h*progress);
        ctx.fillStyle = '#c8302c'; ctx.font='bold 11px sans-serif';
        ctx.fillText(s.hint, x, y - 6);
      }
    });
    ctx.fillStyle='#c8302c'; ctx.font='bold 12px sans-serif';
    ctx.fillText('出汤时间曲线（s）', padL, 18);
  }
  draw();
  document.getElementById('brewStart').onclick = () => {
    if (timer) return;
    currentStep = 0; elapsed = 0;
    timer = setInterval(() => {
      elapsed += 0.1;
      const cur = p.brew.steps[currentStep];
      if (elapsed >= cur.time) {
        elapsed = 0;
        currentStep++;
        if (currentStep >= p.brew.steps.length) {
          clearInterval(timer); timer=null;
          currentStep = p.brew.steps.length;
        }
      }
      draw();
    }, 100);
  };
  document.getElementById('brewReset').onclick = () => {
    if (timer) clearInterval(timer); timer=null;
    currentStep = 0; elapsed = 0; draw();
  };
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
    visionPreview.innerHTML = `<img src="${ev.target.result}" alt="茶汤" />`;
    runVisionAnalysis();
  };
  reader.readAsDataURL(file);
}
function runVisionAnalysis() {
  visionResult.innerHTML = '<div class="empty">🤖 ViT 视觉模型分析中...</div>';
  setTimeout(() => {
    const scores = [
      { name: '色泽', score: 86 + Math.floor(Math.random()*10), tip: 'CIE Lab 色差 ΔE=2.3 接近大红袍标准琥珀色，火工偏中火。' },
      { name: '通透度', score: 90 + Math.floor(Math.random()*8), tip: '茶汤清亮无悬浮，无沉淀，符合 SOP 出汤标准。' },
      { name: '投茶量', score: 75 + Math.floor(Math.random()*15), tip: '叶底估算 7.6g，标准 8g（盖碗 110ml），可补 0.4g。' },
      { name: '出汤时机', score: 88 + Math.floor(Math.random()*8), tip: '汤色饱和度推算 出汤时间约 9.5s，建议第 1 泡 5-6s 更佳。' }
    ];
    const overall = Math.round(scores.reduce((s,x)=>s+x.score,0)/scores.length);
    visionResult.innerHTML = `
      <h3>📷 茶汤 AI 评分（多任务 ViT）</h3>
      ${scores.map(s => `
        <div class="score-row">
          <div class="label">${s.name}</div>
          <div class="score-bar"><div style="width:${s.score}%"></div></div>
          <div class="score-num">${s.score}</div>
        </div>
        <div class="score-tip">↳ ${s.tip}</div>
      `).join('')}
      <div class="overall">
        <div class="num">${overall}</div>
        <div class="label">综合评分 · ${overall>=90?'✅ 达标':'⚠️ 建议复核'}</div>
      </div>
    `;
  }, 1100);
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
// 角色切换
// =================================================================
document.getElementById('role').addEventListener('change', e => {
  const map = {
    franchisee: '已切换为「加盟商店长」视角 — 重点查看运营驾驶舱、库存、销售建议',
    staff: '已切换为「茶艺师 / 销售顾问」视角 — 重点关注 SOP、话术、培训题',
    hq: '已切换为「总部研发 / 运营」视角 — 关注全网知识同步、知识缺口、加盟商画像'
  };
  appendMsg(map[e.target.value], 'ai');
});
