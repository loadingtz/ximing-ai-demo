// ========= 熹茗茶业真实产品体系 =========
// 武夷岩茶 / 白茶 / 修身四大名丛 / 朱子文化
const PRODUCTS = [
  {
    id: 'dahongpao', emoji: '🍂', name: '熹茗·母树大红袍',
    category: '武夷岩茶 · 名丛',
    grade: '特级', price: 1280, unit: '50g',
    base: '武夷山九龙窠母树后代 · 传统炭焙',
    origin: '福建武夷山九龙窠',
    craft: ['采青（开面采）','晒青','做青（摇青/晾青 7-8 次）','杀青（300℃）','揉捻','初焙（120℃）','炭焙（80-100℃，36-48 小时）','复焙'],
    flavor: ['岩骨花香','兰花香','炭焙韵','回甘绵长'],
    brew: { water: 100, weight: 8, gaiwan: 110, steps: [
      { n: 1, time: 5, hint: '温润泡，醒茶' },
      { n: 2, time: 8, hint: '出汤快，岩韵起' },
      { n: 3, time: 10, hint: '花香浓郁' },
      { n: 4, time: 15, hint: '滋味醇厚' },
      { n: 5, time: 20, hint: '韵味悠长' },
      { n: 6, time: 30, hint: '余香尚存' },
      { n: 7, time: 45, hint: '可煮饮' }
    ]},
    nutrition: { 茶多酚: '18%', 咖啡碱: '3.2%', 氨基酸: '2.8%', 适宜: '全年' },
    scripts: '推荐话术：「这款是熹茗以九龙窠母树后代为原料、按传统岩茶工艺制作的大红袍，岩骨花香是它最珍贵的特征 —— 您闻这干茶，就有清晰的兰花底香和炭焙香，这是十二道工序、48 小时炭焙才能得到的层次。」',
    common_q: [
      { q: '为什么大红袍冲泡要快出汤？', a: '岩茶内质浓厚，前 3 泡建议 5-10 秒出汤；过久会苦涩，破坏茶汤层次。投茶量按盖碗 1:14 比例（110ml 配 8g）。' },
      { q: '客人问母树和商品大红袍区别？', a: '母树指九龙窠岩壁上 6 棵古茶树（已停采），现在所有大红袍都是无性繁殖的后代。熹茗这款是母树第一代纯种繁育，DNA 与母树一致。' },
      { q: '炭焙为什么要 36-48 小时？', a: '低温慢焙才能去除青草气、激发岩骨韵。火工分轻火/中火/足火，熹茗这款为中足火，适合 3-5 年陈放。' }
    ]
  },
  {
    id: 'laocong-shuixian', emoji: '🌿', name: '熹茗·老枞水仙',
    category: '武夷岩茶 · 风味标准',
    grade: '高山特级', price: 580, unit: '100g',
    base: '60 年以上老枞水仙 · 三坑两涧山场',
    origin: '武夷山慧苑坑',
    craft: ['老枞采青（一芽三四叶）','日光萎凋','重做青（8-10 次摇青）','杀青','揉捻','足火炭焙'],
    flavor: ['粽叶香','木质香（枞味）','青苔味','醇厚甘甜'],
    brew: { water: 100, weight: 8, gaiwan: 110, steps: [
      { n: 1, time: 5, hint: '醒茶，温润' },
      { n: 2, time: 8, hint: '枞味初显' },
      { n: 3, time: 10, hint: '粽叶香突出' },
      { n: 4, time: 15, hint: '木质感明显' },
      { n: 5, time: 20, hint: '汤厚味醇' },
      { n: 6, time: 30, hint: '回甘持久' },
      { n: 7, time: 45, hint: '余韵生津' }
    ]},
    nutrition: { 茶多酚: '16%', 咖啡碱: '2.9%', 氨基酸: '3.1%', 适宜: '秋冬' },
    scripts: '推荐话术：「老枞水仙最珍贵的是「枞味」—— 那种独特的粽叶香、木质香、青苔味，只有 60 年以上老树才有。这是熹茗发布的《老枞水仙茶风味标准》核心产品，行业内第一份风味量化标准。」',
    common_q: [
      { q: '什么是「枞味」？', a: '老枞水仙独有风味，呈现粽叶、青苔、木质三种交织香气。来自老茶树根系深扎、积累的特殊代谢物，无法人工复制。' },
      { q: '熹茗的风味标准包括哪些指标？', a: '感官（香、汤、味、底）+ 理化（茶多酚/氨基酸/咖啡碱）+ 山场（三坑两涧/正岩/半岩）三维量化，共 18 项指标。' }
    ]
  },
  {
    id: 'tieluohan', emoji: '🪨', name: '熹茗·铁罗汉',
    category: '修身四大名丛',
    grade: '正岩', price: 880, unit: '100g',
    base: '武夷山慧苑坑·名丛之首',
    origin: '武夷山慧苑岩',
    craft: ['手工采摘','传统做青','炭焙足火'],
    flavor: ['醇厚','药香','岩骨','沉稳'],
    brew: { water: 100, weight: 8, gaiwan: 110, steps: [
      { n: 1, time: 5, hint: '醒茶' },
      { n: 2, time: 8, hint: '药香起' },
      { n: 3, time: 12, hint: '汤质醇厚' },
      { n: 4, time: 18, hint: '岩骨明显' },
      { n: 5, time: 25, hint: '回甘强烈' },
      { n: 6, time: 35, hint: '余韵深长' }
    ]},
    nutrition: { 茶多酚: '17%', 咖啡碱: '3.0%', 氨基酸: '2.6%', 适宜: '冬季' },
    scripts: '推荐话术：「铁罗汉是修身四大名丛之首，因「禅意」得名，药香和岩骨韵特别突出，朱子讲「格物致知」，喝铁罗汉就是一种修身体验。」',
    common_q: [
      { q: '修身四大名丛是哪四款？', a: '铁罗汉、水金龟、白鸡冠、半天夭，是熹茗根据朱子修身理念精选的四款武夷名丛。' }
    ]
  },
  {
    id: 'shuijingui', emoji: '🐢', name: '熹茗·水金龟',
    category: '修身四大名丛',
    grade: '正岩', price: 780, unit: '100g',
    base: '武夷山牛栏坑',
    origin: '武夷山牛栏坑',
    craft: ['手工采摘','武夷岩茶传统工艺','中火炭焙'],
    flavor: ['梅花香','清甜','汤色金黄','喉韵'],
    brew: { water: 100, weight: 8, gaiwan: 110, steps: [
      { n: 1, time: 5, hint: '醒茶' },
      { n: 2, time: 8, hint: '梅花香起' },
      { n: 3, time: 10, hint: '清甜显' },
      { n: 4, time: 15, hint: '喉韵清晰' },
      { n: 5, time: 20, hint: '层次分明' },
      { n: 6, time: 30, hint: '回甘悠长' }
    ]},
    nutrition: { 茶多酚: '16%', 咖啡碱: '2.8%', 氨基酸: '3.0%', 适宜: '春秋' },
    scripts: '推荐话术：「水金龟最大特征是「梅花香」，清甜爽朗，喉韵明显。不像大红袍那样浓烈，更适合品茶入门，朱子说「淡中有真味」就是这种感觉。」',
    common_q: []
  },
  {
    id: 'baijiguan', emoji: '🌸', name: '熹茗·白鸡冠',
    category: '修身四大名丛',
    grade: '正岩', price: 980, unit: '100g',
    base: '武夷山外鬼洞',
    origin: '武夷山外鬼洞',
    craft: ['白茶式工艺融入岩茶','轻发酵','低温慢焙'],
    flavor: ['玉米甜香','轻盈','花蜜韵','汤色橙黄'],
    brew: { water: 95, weight: 7, gaiwan: 110, steps: [
      { n: 1, time: 5, hint: '低温醒茶' },
      { n: 2, time: 8, hint: '玉米甜香' },
      { n: 3, time: 10, hint: '花蜜韵' },
      { n: 4, time: 15, hint: '汤甜柔和' },
      { n: 5, time: 25, hint: '余香明显' }
    ]},
    nutrition: { 茶多酚: '14%', 咖啡碱: '2.5%', 氨基酸: '3.4%', 适宜: '夏秋' },
    scripts: '推荐话术：「白鸡冠是四大名丛中最特别的 —— 叶色淡黄如鸡冠，工艺融合白茶元素，带玉米甜香和花蜜韵，是「君子之味」。」',
    common_q: []
  },
  {
    id: 'bantiaoyao', emoji: '☁️', name: '熹茗·半天夭',
    category: '修身四大名丛',
    grade: '正岩', price: 1080, unit: '100g',
    base: '武夷山三花峰半山',
    origin: '武夷山三花峰',
    craft: ['高山岩茶工艺','中足火炭焙'],
    flavor: ['花香高扬','岩骨清晰','汤感细腻','回甘迅速'],
    brew: { water: 100, weight: 8, gaiwan: 110, steps: [
      { n: 1, time: 5, hint: '醒茶' },
      { n: 2, time: 8, hint: '花香飘扬' },
      { n: 3, time: 10, hint: '岩骨初现' },
      { n: 4, time: 15, hint: '汤感细腻' },
      { n: 5, time: 22, hint: '回甘迅速' },
      { n: 6, time: 32, hint: '余韵清雅' }
    ]},
    nutrition: { 茶多酚: '17%', 咖啡碱: '2.9%', 氨基酸: '3.2%', 适宜: '春夏' },
    scripts: '推荐话术：「半天夭因生于半山而得名，花香比铁罗汉更高扬，比水金龟更细腻，是名丛中的「灵秀派」。」',
    common_q: []
  },
  {
    id: 'baicha-creative', emoji: '⚪', name: '熹茗·创新工艺白茶',
    category: '白茶 · 创新工艺',
    grade: '一级', price: 380, unit: '200g饼',
    base: '福鼎白毫银针 · 熹茗专利低温慢萎凋',
    origin: '福建福鼎',
    craft: ['采青（一芽一叶）','创新低温萎凋（专利）','空气流通调控','低温慢干','高山压饼','陈化'],
    flavor: ['毫香','蜜韵','花果香','陈香（陈年）'],
    brew: { water: 90, weight: 5, gaiwan: 150, steps: [
      { n: 1, time: 10, hint: '冷水醒茶' },
      { n: 2, time: 15, hint: '毫香显' },
      { n: 3, time: 20, hint: '蜜韵起' },
      { n: 4, time: 30, hint: '汤厚味甜' },
      { n: 5, time: 45, hint: '余香绵长' },
      { n: 6, time: 60, hint: '可煮饮' }
    ]},
    nutrition: { 茶多酚: '12%', 咖啡碱: '2.0%', 氨基酸: '4.5%', 适宜: '全年' },
    scripts: '推荐话术：「这是熹茗白茶创新工艺的代表 —— 通过专利低温慢萎凋，保留更多氨基酸（4.5%，行业平均 3%），毫香蜜韵更突出。一年茶三年药七年宝，越陈越香。」',
    common_q: [
      { q: '熹茗白茶创新工艺有何不同？', a: '传统白茶日光萎凋受天气影响大；熹茗专利工艺采用低温（22-25℃）+ 湿度（55-65%）+ 风速精准调控，氨基酸保留率提升 30%。' },
      { q: '白茶可以煮吗？', a: '3 年以上陈白茶建议煮饮，沸水投茶 5g/600ml，煮 3 分钟即可。新茶建议盖碗冲泡。' }
    ]
  }
];

// ========= 知识图谱节点（朱子文化 + 茶系） =========
const KG_NODES = [
  { id: 'ximing', label: '熹茗茶业', x: 400, y: 50, type: 'brand' },
  { id: 'zhuzi', label: '朱子文化', x: 200, y: 130, type: 'culture' },
  { id: 'yancha', label: '武夷岩茶', x: 400, y: 130, type: 'category' },
  { id: 'baicha', label: '白茶', x: 600, y: 130, type: 'category' },
  { id: 'mingcong', label: '修身四大名丛', x: 280, y: 230, type: 'series' },
  { id: 'dahongpao', label: '大红袍', x: 470, y: 230, type: 'product' },
  { id: 'shuixian', label: '老枞水仙', x: 560, y: 230, type: 'product' },
  { id: 'baicha-c', label: '创新白茶', x: 680, y: 230, type: 'product' },
  { id: 'tieluohan', label: '铁罗汉', x: 150, y: 340, type: 'product' },
  { id: 'shuijingui', label: '水金龟', x: 230, y: 340, type: 'product' },
  { id: 'baijiguan', label: '白鸡冠', x: 310, y: 340, type: 'product' },
  { id: 'bantianyao', label: '半天夭', x: 390, y: 340, type: 'product' },
  { id: 'gewu', label: '格物致知', x: 90, y: 230, type: 'culture' },
  { id: 'xiushen', label: '修身齐家', x: 60, y: 130, type: 'culture' },
  { id: 'yangao', label: '岩骨花香', x: 470, y: 340, type: 'attr' },
  { id: 'cong', label: '枞味', x: 560, y: 340, type: 'attr' },
  { id: 'patent', label: '低温慢萎凋（专利）', x: 680, y: 340, type: 'tech' },
];
const KG_EDGES = [
  ['ximing','zhuzi'],['ximing','yancha'],['ximing','baicha'],
  ['zhuzi','xiushen'],['zhuzi','gewu'],
  ['yancha','mingcong'],['yancha','dahongpao'],['yancha','shuixian'],
  ['baicha','baicha-c'],
  ['mingcong','tieluohan'],['mingcong','shuijingui'],['mingcong','baijiguan'],['mingcong','bantianyao'],
  ['mingcong','xiushen'],
  ['dahongpao','yangao'],['shuixian','cong'],['baicha-c','patent']
];

// ========= 智能问答 RAG 知识 =========
const FAQ_KB = [
  { keys:['大红袍','怎么泡','冲泡','母树','沖泡'], answer:'【熹茗·母树大红袍 · 标准冲泡】\n• 茶水比 1:14（110ml 盖碗 + 8g 茶）\n• 水温：100℃ 沸水\n• 出汤：第 1 泡 5 秒（醒茶）→ 2 泡 8 秒 → 3 泡 10 秒 → 之后每泡递增 5-10 秒\n• 可冲泡 7-9 次，第 7 泡后建议煮饮\n• 注意：岩茶忌闷泡，前 3 泡必须快出汤', source:'熹茗 SOP · 大红袍冲泡标准 v3.2', tools:['kb.search(query=大红袍冲泡)','sop.get(product=dahongpao)'] },
  { keys:['老枞水仙','枞味'], answer:'【枞味解析】\n老枞水仙独有风味，呈现「粽叶香 + 木质香 + 青苔味」三种交织香气。\n• 形成原因：60 年以上老茶树根系深扎，积累特殊代谢物\n• 核心区域：三坑两涧（牛栏坑、慧苑坑、倒水坑、流香涧、悟源涧）\n• 量化指标（熹茗风味标准 v1）：粽叶香强度 ≥ 4.0/5.0、木质感 ≥ 3.5/5.0', source:'熹茗 R&D · 《老枞水仙茶风味标准》白皮书', tools:['kb.search(query=枞味)','rd.standard(name=老枞水仙)'] },
  { keys:['修身四大名丛','名丛','哪四款'], answer:'熹茗修身四大名丛 = 铁罗汉 + 水金龟 + 白鸡冠 + 半天夭\n• 取自朱子「修身齐家」理念\n• 同属武夷正岩名丛，但风味迥异：\n  - 铁罗汉：药香沉稳（如圣贤气度）\n  - 水金龟：梅花清香（如君子风骨）\n  - 白鸡冠：玉米甜韵（如赤子之心）\n  - 半天夭：花香高扬（如灵秀之意）', source:'熹茗品牌部 · 朱子修身茶系手册', tools:['kg.query(node=修身四大名丛)'] },
  { keys:['白茶','煮','创新工艺','专利'], answer:'【熹茗白茶创新工艺】\n传统白茶依赖日光萎凋（受天气影响大），熹茗采用专利低温慢萎凋：\n• 温度：22-25℃ 恒温\n• 湿度：55-65% 调控\n• 时长：48-72 小时（传统 36 小时）\n• 收益：氨基酸保留率 +30%，毫香更突出\n• 3 年以上可煮饮：沸水 5g/600ml，煮 3 分钟', source:'熹茗 R&D · 白茶创新工艺白皮书 · 专利号 ZL202xxxxx', tools:['rd.patent(no=ZL202xxxxx)','kb.search(query=白茶煮饮)'] },
  { keys:['朱子','朱熹','文化'], answer:'【熹茗与朱子文化】\n朱熹（1130-1200）晚年居武夷山五夫里，著《四书章句集注》，奠定朱子理学。\n• 「熹茗」之名取自朱熹\n• 品牌理念：以茶载道，格物致知\n• 修身四大名丛 = 朱子修身理念的茶式表达\n• 文化 IP：朱子六艺茶礼、武夷山朱子文化园联名', source:'熹茗品牌文化手册 · 第 1 章', tools:['kg.query(node=朱子文化)'] },
  { keys:['炭焙','焙火'], answer:'【岩茶炭焙工艺】\n• 燃料：荔枝木炭（不冒烟、温度稳）\n• 温度：80-100℃ 低温慢焙\n• 时长：36-48 小时\n• 火工等级：轻火（清香）/ 中火（醇和）/ 足火（厚重）\n• 熹茗大红袍 = 中足火，适合陈放 3-5 年风味更佳', source:'熹茗 SOP · 炭焙工艺规范', tools:['sop.get(craft=炭焙)'] },
  { keys:['过敏','禁忌','空腹','孕妇'], answer:'【饮茶禁忌】\n• 空腹：胃寒者勿饮浓茶（建议白茶或淡茶）\n• 孕妇：每日 ≤ 1 杯淡茶\n• 服药：服药前后 1 小时不宜\n• 失眠：午后避免高咖啡碱（铁罗汉、大红袍）\n• 推荐替代：白茶（咖啡碱 2.0%，最低）', source:'熹茗食安手册 · 饮茶建议', tools:['kb.search(query=饮茶禁忌)'] },
  { keys:['销售','建议','推荐','应该卖','推什么'], answer:'【AI 运营建议·今日】\n基于近 7 天销售 + 当前库存 + 节气：\n1️⃣ 主推：老枞水仙（周转最快，毛利 62%）\n2️⃣ 体验装：白茶创新款（拉新最佳，转化率 38%）\n3️⃣ 高端客：母树大红袍 + 朱子六艺茶礼套装（客单价 +¥860）\n4️⃣ 减少进货：半天夭（库存 32 饼，周销 4 饼，3 个月才能消化）', source:'AI 运营 Agent · 综合 6 个数据源', tools:['pos.weekly_sales()','inventory.list()','calendar.solar_term()','kg.query(node=朱子六艺)'] },
  { keys:['新品','本月','最新'], answer:'【2026 春季新品】\n本季共上线 3 款：\n• 熹茗·创新工艺白茶（专利）\n• 熹茗·朱子六艺茶礼套装（4 大名丛 + 茶具）\n• 熹茗·武夷正岩拼配茶（电商专供）\n点击「② 知识库」查看完整 SOP / 话术 / 营养表 / 营销素材。', source:'熹茗新品发布·2026 Q1', tools:['rd.new_products(quarter=2026Q1)'] }
];

// ========= 培训题库 =========
const QUIZ = [
  { q:'母树大红袍冲泡的茶水比标准是？', options:['1:10','1:14','1:20','1:30'], answer:1, explain:'岩茶标准：110ml 盖碗 + 8g 茶 ≈ 1:14。比例过浓苦涩，过淡损失岩韵。' },
  { q:'老枞水仙最珍贵的「枞味」由几种香气交织？', options:['1 种','2 种','3 种','5 种'], answer:2, explain:'枞味 = 粽叶香 + 木质香 + 青苔味，三种交织。这是熹茗《老枞水仙茶风味标准》的核心定义。' },
  { q:'修身四大名丛不包括以下哪一款？', options:['铁罗汉','水金龟','大红袍','白鸡冠'], answer:2, explain:'修身四大名丛 = 铁罗汉 + 水金龟 + 白鸡冠 + 半天夭。大红袍另立一格，与四大名丛并称「五大珍稀名丛」。' },
  { q:'熹茗品牌名字的文化来源是？', options:['朱熹（朱子）','陆羽','苏轼','王阳明'], answer:0, explain:'「熹茗」取自朱熹（朱子），朱子晚年居武夷山，是熹茗品牌的文化原点。修身四大名丛即朱子「修身齐家」理念的茶式表达。' },
  { q:'岩茶炭焙温度区间是？', options:['60-70℃','80-100℃','120-150℃','180-200℃'], answer:1, explain:'低温慢焙（80-100℃）持续 36-48 小时，激发岩骨韵、去除青草气。温度过高会焦化破坏茶质。' },
  { q:'熹茗白茶创新工艺的核心专利是？', options:['日光萎凋自动化','低温慢萎凋','高温烘干','真空压饼'], answer:1, explain:'低温（22-25℃）+ 湿度（55-65%）+ 风速精准调控，氨基酸保留率提升 30%，是熹茗白茶差异化核心。' },
  { q:'客人夜间想买茶但担心失眠，最该推荐？', options:['母树大红袍','铁罗汉','创新工艺白茶','老枞水仙'], answer:2, explain:'白茶咖啡碱含量最低（约 2.0% vs 岩茶 3.0%+），且氨基酸高，安神。同时白茶适合女性、老人，用户画像更广。' },
  { q:'三坑两涧不包括以下哪一处？', options:['牛栏坑','慧苑坑','九龙窠','流香涧'], answer:2, explion:'三坑两涧 = 牛栏坑、慧苑坑、倒水坑 + 流香涧、悟源涧。九龙窠是大红袍母树所在地，独立山场。', explain:'三坑两涧 = 牛栏坑、慧苑坑、倒水坑 + 流香涧、悟源涧。九龙窠是大红袍母树所在地，独立山场。' },
  { q:'高客单价客户进店，最佳推荐组合是？', options:['创新白茶 + 简单介绍','老枞水仙 + 标准话术','母树大红袍 + 朱子六艺茶礼','低端拼配 + 折扣'], answer:2, explain:'高客单客户重视品质与文化体验。母树大红袍（产品稀缺性）+ 朱子六艺茶礼（文化深度）= 客单价 +¥860，复购转化最高。' },
  { q:'AI 助手回答问题时为什么要附「来源」？', options:['装饰用','法律要求','建立信任 + 便于复核','凑字数'], answer:2, explain:'RAG 答案必带来源（哪份 SOP 第几节），让一线员工信任 AI、且能复核；这是熹茗 AI 系统的核心设计原则。' }
];

// ========= 运营 Agent 建议 =========
const OPS_ADVICE = [
  { tag:'补货', priority:'高', text:'老枞水仙 当前库存 18 罐（100g），近 7 日均销 4.2 罐 → 仅可支撑 4 天。', reason:'AI 已自动生成采购单（通过 ERP API），等待店长 1 键确认。同步触发武夷山仓发货，预计 36h 到店。', tools:['inventory.query(sku=laocong-shuixian)','pos.daily_sales(days=7)','erp.draft_order()','logistics.eta()'] },
  { tag:'推广', priority:'中', text:'明日为「立夏」节气，建议主推创新工艺白茶（清润适宜），上架朱子六艺茶礼宣传海报。', reason:'去年同期同类活动客流 +28%，转化 +15%。AI 已生成 3 套海报文案，内置二维码跟踪。', tools:['calendar.solar_term()','pos.history(period=2025-05-05)','llm.generate(template=poster)'] },
  { tag:'排班', priority:'中', text:'本周六 14:00-17:00 是品鉴会高峰，建议增配 1 名茶艺师（已识别张茶艺师此时段空档）。', reason:'品鉴会平均出品 3 道茶，单人服务 2 桌满载，预约已 6 桌。AI 已发送排班调整请求至张茶艺师手机。', tools:['booking.list(date=Sat)','hr.schedule(date=Sat)','msg.send(to=staff)'] },
  { tag:'培训', priority:'低', text:'员工李静 在「枞味三要素」连续答错 3 次，建议推送 5 分钟微课。', reason:'李静主要负责老枞水仙销售，知识缺口直接影响转化率（其单据老枞转化 12%，门店均值 25%）。', tools:['training.weak_points(staff=lijing)','pos.staff_perf(staff=lijing)','content.recommend()'] },
  { tag:'减损', priority:'高', text:'半天夭库存 32 饼，周销 4 饼。建议下月停止进货，并发起「修身四大名丛拼装」促销。', reason:'若继续按当前节奏，3 个月后将占用资金 ¥3.4w + 占据陈列。AI 测算：拼装促销 4 周可清 18 饼。', tools:['inventory.aging()','pos.velocity()','marketing.bundle()'] },
  { tag:'文化', priority:'低', text:'下周三为朱子诞辰，建议在小程序首页推送「朱子六艺茶礼」专题。', reason:'文化营销 24h 内可触达全部会员，去年同活动 RFM 分层中 R1M3 唤醒率达 18%。', tools:['calendar.brand_day()','crm.segment(rfm=R1M3)','content.push()'] }
];

// ========= 业务 ↔ 技术映射 =========
const ARCH_TABLE = [
  { biz:'400+ 门店知识同步滞后（2-3 周）',
    tech:'多模态文档解析 + 知识图谱 + 增量推送',
    deliver:'1) PDF/DOCX/视频解析 Pipeline (pdfplumber + OCR + Whisper)\n2) Neo4j 知识图谱（朱子文化 + 产品系 + 工艺）\n3) Embedding 增量更新（BGE-large-zh）\n4) 多端推送服务（APP / 小程序 / 平板）',
    gain:'2-3 周 → 24h（↓93%）' },
  { biz:'加盟商专业知识门槛高（岩骨花香、枞味等术语）',
    tech:'RAG + 私有大模型 + 强制溯源',
    deliver:'1) Milvus 向量库（覆盖 SOP/标准/话术/文化）\n2) 私有部署通义千问 72B / DeepSeek-V3\n3) Reranker（BGE-reranker-v2）\n4) Prompt 模板：强制 [来源] 字段',
    gain:'员工自助率 92%' },
  { biz:'员工流动率高、培训成本高',
    tech:'自适应学习 + 数字人 + 场景化模拟',
    deliver:'1) 知识掌握度模型（BKT 算法）\n2) 题库 LLM 自动生成 + 专家审核\n3) 数字人讲解（HeyGen + TTS）\n4) 场景对话 Agent（客户角色扮演）',
    gain:'培训成本 -65%' },
  { biz:'店长决策靠经验、备货容易出错',
    tech:'Agent + Function Call + 工具编排',
    deliver:'1) 销量预测（Prophet + 节气特征）\n2) 工具注册中心：ERP/POS/CRM/HRM API\n3) Agent 编排（LangGraph + 自研）\n4) 解释性输出（每条建议带 Why）',
    gain:'决策准确率 ↑40%、备货损耗 ↓50%' },
  { biz:'400 门店出品标准不一（茶艺、出汤、温度）',
    tech:'CV 视觉模型 + IoT 茶艺机',
    deliver:'1) 出品图像评分（ViT 微调）\n2) 智能茶艺机（温度/时间/水量传感器）\n3) 边缘部署（Jetson + ONNX）\n4) 异常实时回流总部',
    gain:'门店一致性 70% → 92%' },
  { biz:'反馈不闭环、研发与一线脱节',
    tech:'日志回流 + 主动学习 + 周报自动生成',
    deliver:'1) 问答日志采集与脱敏\n2) HDBSCAN 聚类发现知识缺口\n3) 周报 LLM 自动撰写\n4) 标注平台 + RLHF lite',
    gain:'知识库每周自演进、缺口发现速度 ↑10x' }
];

// ========= 系统架构层级（白底 + 红黄绿蓝点缀） =========
const ARCH_LAYERS = [
  { name:'⑤ 终端层', items:['店长 App','员工 H5','微信小程序','智能茶艺机','吧台平板','总部大屏'], color:'#c8302c' },
  { name:'④ 应用层', items:['知识管理平台','智能学习平台','运营支持平台','数据洞察平台'], color:'#9c1f1c' },
  { name:'③ 服务层', items:['知识管理服务','语义理解服务','检索服务','学习服务','运营 Agent','视觉服务'], color:'#b58a3a' },
  { name:'② 模型层', items:['通义千问 72B（基座）','茶叶垂直微调模型','BGE Embedding','Reranker','视觉 ViT','规则引擎'], color:'#5a8f4f' },
  { name:'① 数据层', items:['Milvus 向量库','Neo4j 知识图谱','MySQL 业务库','ClickHouse 数仓','OSS 对象存储','Redis 缓存'], color:'#4a7ba8' }
];
