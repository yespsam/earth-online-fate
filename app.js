const fates = [
  {
    id: "migration",
    name: "迁徙",
    line: "漂泊与适应，是生存的代价。",
    odds: "18.7%",
    tone: "#92e8dc",
    icon: "migration",
    bias: { freedom: 1, solitude: 1, belonging: -1 },
    logs: ["出生地坐标偏移", "语言系统追加磨损", "归属感被延迟发放"],
  },
  {
    id: "wealth",
    name: "财富",
    line: "追逐与占有，是永恒的欲望。",
    odds: "17.5%",
    tone: "#d8b75f",
    icon: "wealth",
    bias: { wealth: 2, order: 1, freedom: -1 },
    logs: ["欲望阈值上调", "损失厌恶写入", "安全感余额冻结"],
  },
  {
    id: "fame",
    name: "名望",
    line: "被看见，被记住，被神化。",
    odds: "12.3%",
    tone: "#a8d5cf",
    icon: "fame",
    bias: { fame: 2, solitude: 1 },
    logs: ["他人凝视接入", "自我叙事公开", "沉默权限下降"],
  },
  {
    id: "illness",
    name: "病痛",
    line: "肉体的限制，命运的烙印。",
    odds: "22.1%",
    tone: "#f1624d",
    icon: "illness",
    bias: { health: -2, solitude: 1, curiosity: 1 },
    logs: ["疼痛模块启用", "日常成本上升", "希望恢复为间歇性"],
  },
  {
    id: "solitude",
    name: "孤独",
    line: "无人理解，无处归属。",
    odds: "16.4%",
    tone: "#7da29c",
    icon: "solitude",
    bias: { solitude: 2, curiosity: 1, belonging: -1 },
    logs: ["亲密连接弱化", "夜间思维增殖", "求救信号低优先级"],
  },
  {
    id: "freedom",
    name: "自由",
    line: "渴望无拘，却处处受限。",
    odds: "12.0%",
    tone: "#b9c7c0",
    icon: "freedom",
    bias: { freedom: 2, order: -1, solitude: 1 },
    logs: ["选择权外观开启", "边界检测增强", "自由被定义为约束"],
  },
];

const lifeNodes = [
  {
    id: "childhood",
    age: 6,
    progress: 8,
    title: "第一次被比较",
    prompt: "你发现世界喜欢把人排成一列。",
    options: [
      { id: "answer", label: "背下标准答案", result: "你学会了安全地正确。", tag: "标准答案", effects: { order: 2, belonging: 1, curiosity: -1 } },
      { id: "ask", label: "追问为什么", result: "你被记为不稳定变量。", tag: "问题儿童", effects: { curiosity: 2, freedom: 1, order: -1 } },
      { id: "please", label: "讨好所有人", result: "你把需求藏进了礼貌里。", tag: "温顺样本", effects: { belonging: 1, solitude: 1, health: -1 } },
    ],
  },
  {
    id: "exam",
    age: 18,
    progress: 24,
    title: "志愿填报",
    prompt: "纸面上有很多格子，系统称它们为未来。",
    options: [
      { id: "major", label: "选最稳的专业", result: "稳定开始替你解释热爱。", tag: "稳定优先", effects: { order: 2, wealth: 1, freedom: -1 } },
      { id: "leave", label: "去很远的城市", result: "地图变大，归属感变小。", tag: "远行", effects: { freedom: 2, migration: 1, solitude: 1 } },
      { id: "dream", label: "选一个梦", result: "你向不可控递交了申请。", tag: "梦的贷款", effects: { fame: 1, curiosity: 1, wealth: -1 } },
    ],
  },
  {
    id: "work",
    age: 24,
    progress: 36,
    title: "第一份工作",
    prompt: "你第一次把白天出售给一个组织。",
    options: [
      { id: "overtime", label: "加班换上升", result: "你得到位置，也失去一些夜晚。", tag: "上升通道", effects: { wealth: 2, fame: 1, health: -2 } },
      { id: "quiet", label: "低调保全自己", result: "你被系统判定为可长期运行。", tag: "低噪运行", effects: { health: 1, order: 1, fame: -1 } },
      { id: "quit", label: "辞职去试一次", result: "你获得一小段自由，也获得一大段账单。", tag: "试错债务", effects: { freedom: 2, wealth: -2, curiosity: 1 } },
    ],
  },
  {
    id: "intimacy",
    age: 32,
    progress: 52,
    title: "亲密关系",
    prompt: "有人靠近你，系统询问是否开放权限。",
    options: [
      { id: "family", label: "组成家庭", result: "你多了一处港口，也多了几条锚链。", tag: "港口与锚", effects: { belonging: 2, order: 1, freedom: -1 } },
      { id: "alone", label: "保持独身", result: "你的房间很安静，安静也会回声。", tag: "单人回声", effects: { solitude: 2, freedom: 1, belonging: -1 } },
      { id: "perform", label: "维持体面关系", result: "你们共同维护一张可被展示的照片。", tag: "体面合照", effects: { fame: 1, order: 1, solitude: 1 } },
    ],
  },
  {
    id: "crisis",
    age: 45,
    progress: 70,
    title: "中年警报",
    prompt: "身体、账户、亲人和时间同时弹窗。",
    options: [
      { id: "carry", label: "继续扛住", result: "你成为很多人的支柱，也被压成支柱的形状。", tag: "承重结构", effects: { belonging: 1, wealth: 1, health: -2 } },
      { id: "turn", label: "强行转向", result: "你把半生推翻，废墟里长出新路。", tag: "中途改写", effects: { freedom: 2, curiosity: 1, order: -1 } },
      { id: "numb", label: "装作没看见", result: "警报静音后，损耗仍在后台运行。", tag: "后台损耗", effects: { order: 1, health: -1, solitude: 1 } },
    ],
  },
  {
    id: "farewell",
    age: 72,
    progress: 92,
    title: "回望清算",
    prompt: "终局之前，系统要求你为一生命名。",
    options: [
      { id: "accept", label: "承认这就是我", result: "你停止辩解，命运也停止伪装。", tag: "承认", effects: { belonging: 1, health: 1, order: 1 } },
      { id: "regret", label: "计算所有错过", result: "你终于看清每条岔路的价格。", tag: "错过账单", effects: { curiosity: 1, solitude: 2, health: -1 } },
      { id: "laugh", label: "对系统笑一下", result: "系统无法判定这是服从还是反抗。", tag: "不可分类", effects: { freedom: 2, curiosity: 1, order: -1 } },
    ],
  },
];

const initialScores = {
  wealth: 0,
  fame: 0,
  freedom: 0,
  health: 0,
  belonging: 0,
  order: 0,
  solitude: 0,
  curiosity: 0,
  migration: 0,
};

const chapterRealities = {
  childhood: {
    kicker: "家庭 / 学校",
    summary: "童年不是教程关，它更像一张被成人提前写好的座位表。",
    facts: ["家里开始用成绩解释你是否值得被夸", "老师把安静当成懂事，把反问当成麻烦", "你第一次意识到喜欢和正确不是同一种东西"],
  },
  exam: {
    kicker: "教育 / 流动",
    summary: "十八岁那年，所有人都说你自由选择，其实大多数选项早被分数、钱和距离筛过。",
    facts: ["志愿表把热爱压缩成代码", "亲戚开始讨论稳定、前途和回本", "离开家意味着打开地图，也意味着账单和孤独"],
  },
  work: {
    kicker: "工作 / 账单",
    summary: "第一份工作会教你一件事：现实不是反对梦想，它只是按月扣款。",
    facts: ["租金、通勤和绩效开始决定你的脾气", "同事关系像临时联盟，亲密但很难真正安全", "你第一次发现疲惫也可以被包装成成长"],
  },
  intimacy: {
    kicker: "亲密 / 责任",
    summary: "有人靠近你时，世界不会暂停。房租、父母、职业和身体仍然同时运行。",
    facts: ["爱意会带来港口，也会带来新的权限请求", "独处不再只是自由，也会被社会翻译成问题", "体面关系常常比真实关系更容易被外界接受"],
  },
  crisis: {
    kicker: "中年 / 损耗",
    summary: "中年不是突然发生的，它只是把多年后台运行的损耗一次性弹到前台。",
    facts: ["身体检查、贷款余额和父母病历同时更新", "你开始怀疑自己是在生活，还是在维护生活的外壳", "真正昂贵的东西往往不是钱，而是转向的勇气"],
  },
  farewell: {
    kicker: "晚年 / 清算",
    summary: "晚年像系统日志回放：每个选择都不再争辩，只展示它留下的痕迹。",
    facts: ["遗憾会变得具体，像某个没拨出的电话", "拥有过的关系开始比拥有过的物品更难统计", "你终于知道，结局不是审判，是累积"],
  },
};

const optionAftermath = {
  childhood: {
    answer: "你把课本边角磨得发白，知道哪一句话能换来红勾。家里少了争吵，但你也开始在说话前检查自己。",
    ask: "你在课堂上多问了一句，空气先安静，随后有人笑。那天之后你学会了，问题会打开世界，也会让你先被世界盯上。",
    please: "你很快学会看大人的脸色，知道什么时候递水、什么时候闭嘴。大家说你懂事，你却越来越难说出自己想要什么。",
  },
  exam: {
    major: "录取通知书来得很安稳，像一张盖章的保险单。你没有输给现实，只是把热爱交给了未来某个更空闲的自己。",
    leave: "火车开走时你以为自由开始了，后来发现自由也要交押金。新的城市给你灯光，也让你在深夜格外想家。",
    dream: "你把志愿填给一个听起来不太会赚钱的梦。家里沉默了一阵，随后把担心拆成生活费和反复确认的电话。",
  },
  work: {
    overtime: "凌晨离开公司时，城市像一台还没关机的机器。你拿到更快的上升速度，也把睡眠、朋友和身体抵押给了下一次考核。",
    quiet: "你不再在会议上抢最后一句话，准时吃饭，准时下班。生活变得可维护，但别人也更少把机会和风险同时递给你。",
    quit: "辞职邮件发出去后，你先感到轻，随后是银行卡余额带来的重量。那段日子很狼狈，但你重新听见自己想试什么。",
  },
  intimacy: {
    family: "你们开始共享账单、节日和一个需要反复修补的家。幸福是真的，牺牲也是真的，两者常常在同一张餐桌上出现。",
    alone: "你的房间保持整洁，冰箱里只有你爱吃的东西。自由变得完整，安静也变得完整，有些夜晚它会坐在床边看着你。",
    perform: "你们学会在合照里站得很近，在争执里退得很远。外界看见体面，你们看见彼此都不敢拆穿的疲惫。",
  },
  crisis: {
    carry: "你把父母的检查单、孩子的费用和自己的疲惫排成优先级。大家都说你可靠，只有身体知道你快要超载。",
    turn: "你强行改道，像把已经铺好的铁轨拆掉重来。亲友担心，账户缩水，但你第一次在中年看见新的早晨。",
    numb: "你把警报调成静音，继续上班、吃饭、回复消息。生活表面没有坏掉，只是后台的裂缝开始扩大。",
  },
  farewell: {
    accept: "你不再把一生解释成胜利或失败，只承认它确实发生过。某些遗憾还在，但它们终于不用替你说话。",
    regret: "你把所有没走的路重新算了一遍，每条都看起来像另一个人生。可账本合上时，你仍然只拥有这一条。",
    laugh: "你对系统笑了一下，不是原谅，也不是反抗。只是到了最后，你终于不愿再让它决定这笑是什么意思。",
  },
};

const originProfiles = [
  {
    region: "华东沿海小城",
    home: "父母经营一家临街小店，家里现金流紧，但总有人在饭点喊你回家",
    school: "普通公办学校，老师很忙，好的资源需要自己去抢",
    body: "从小容易过敏，体检单上总有一两项轻微异常",
    economy: -6,
    education: -2,
    family: 8,
    health: -5,
    city: "县城",
  },
  {
    region: "北方工业城市",
    home: "父母在厂区和单位之间轮班，家里重视稳定，讨厌突然冒险",
    school: "学校纪律强，竞赛和补习是少数向外走的入口",
    body: "身体底子不错，但睡眠一直被噪音和焦虑切碎",
    economy: -2,
    education: 3,
    family: 3,
    health: 2,
    city: "老工业城",
  },
  {
    region: "西南山城",
    home: "家里亲戚很多，关系热闹，也很难真正划清边界",
    school: "班级人数很多，老师记得成绩，也记得谁不合群",
    body: "小时候常跑坡路，耐力好，但胃口和压力绑在一起",
    economy: -4,
    education: 0,
    family: 10,
    health: 1,
    city: "山城",
  },
  {
    region: "一线城市边缘",
    home: "家里房贷很重，父母把安全感寄存在每一次升学和证书里",
    school: "教育资源密集，竞争也密集，优秀像最低门槛",
    body: "你很早学会熬夜，身体没有立刻抗议，只是慢慢记账",
    economy: 4,
    education: 8,
    family: 0,
    health: -3,
    city: "大城市",
  },
];

const realityStatLabels = {
  finance: "钱",
  health: "健康",
  family: "家庭",
  relation: "关系",
  career: "职业",
  education: "教育",
  agency: "自主",
  stability: "稳定",
};

const scoreEffectLabels = {
  wealth: "钱",
  fame: "名望",
  freedom: "自由",
  health: "健康",
  belonging: "归属",
  order: "秩序",
  solitude: "孤独",
  curiosity: "好奇",
  migration: "迁徙",
};

const realityEffectMap = {
  wealth: { finance: 8, career: 2, stability: 1 },
  fame: { career: 5, relation: -1, agency: -1 },
  freedom: { agency: 7, stability: -4, relation: -1 },
  health: { health: 8 },
  belonging: { family: 5, relation: 4, agency: -1 },
  order: { stability: 6, career: 2, agency: -3 },
  solitude: { relation: -5, agency: 2, family: -1 },
  curiosity: { education: 5, agency: 2, stability: -1 },
  migration: { agency: 3, relation: -3, career: 2, stability: -2 },
};

const state = {
  selectedId: "illness",
  locked: false,
  life: 0,
  age: 0,
  nodeIndex: -1,
  awaitingNode: false,
  decisions: [],
  scores: { ...initialScores },
  finalEnding: null,
  resistance: 0,
  correction: 0,
  rebirths: 3,
  tick: 0,
  elapsed: 0,
  logs: [],
  ended: false,
  population: 8090230142,
  seed: Math.floor(Math.random() * 99999),
  profile: null,
  reality: null,
  lifeFragments: [],
};

const els = {
  fateList: document.querySelector("#fateList"),
  constraints: document.querySelector("#constraints"),
  fateLog: document.querySelector("#fateLog"),
  chooseBtn: document.querySelector("#chooseBtn"),
  escapeBtn: document.querySelector("#escapeBtn"),
  rebirthBtn: document.querySelector("#rebirthBtn"),
  lifeBar: document.querySelector("#lifeBar"),
  lifeValue: document.querySelector("#lifeValue"),
  lifeWarning: document.querySelector("#lifeWarning"),
  escapeRate: document.querySelector("#escapeRate"),
  rebirthLeft: document.querySelector("#rebirthLeft"),
  selectState: document.querySelector("#selectState"),
  runState: document.querySelector("#runState"),
  worldNote: document.querySelector("#worldNote"),
  endingText: document.querySelector("#endingText"),
  population: document.querySelector("#population"),
  earthTime: document.querySelector("#earthTime"),
  hintText: document.querySelector("#hintText"),
  choiceTitle: document.querySelector("#choiceTitle"),
  choiceSubtitle: document.querySelector("#choiceSubtitle"),
  timelineTitle: document.querySelector("#timelineTitle"),
  timelineSubtitle: document.querySelector("#timelineSubtitle"),
  endingPanel: document.querySelector("#endingPanel"),
  chapterKicker: document.querySelector("#chapterKicker"),
  chapterTitle: document.querySelector("#chapterTitle"),
  chapterSummary: document.querySelector("#chapterSummary"),
  chapterFacts: document.querySelector("#chapterFacts"),
  realityState: document.querySelector("#realityState"),
  profileSummary: document.querySelector("#profileSummary"),
  lifeStats: document.querySelector("#lifeStats"),
  lifeFragments: document.querySelector("#lifeFragments"),
  canvas: document.querySelector("#worldCanvas"),
};

const ctx = els.canvas.getContext("2d");
const bg = new Image();
bg.src = "./assets/orbital-earth.png";
bg.addEventListener("load", () => drawWorld());

function fate() {
  return fates.find((item) => item.id === state.selectedId) ?? fates[0];
}

function activeNode() {
  return lifeNodes[state.nodeIndex] ?? null;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function nowStamp() {
  const seconds = Math.floor(state.elapsed);
  const h = pad(Math.floor(seconds / 3600));
  const m = pad(Math.floor((seconds % 3600) / 60));
  const s = pad(seconds % 60);
  return `[${h}:${m}:${s}]`;
}

function iconSvg(type) {
  const common = 'viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
  const icons = {
    migration: `<svg ${common}><path d="M8 36c5-10 11-15 18-15 5 0 8 2 14 7"/><path d="M27 12c-5 6-6 12-3 18"/><path d="M19 33h11"/><path d="M33 17l7 11-12 2"/></svg>`,
    wealth: `<svg ${common}><ellipse cx="17" cy="16" rx="9" ry="4"/><path d="M8 16v14c0 2 4 4 9 4s9-2 9-4V16"/><ellipse cx="31" cy="24" rx="9" ry="4"/><path d="M22 24v10c0 2 4 4 9 4s9-2 9-4V24"/></svg>`,
    fame: `<svg ${common}><path d="M24 8l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1 4-9z"/><path d="M12 40h24"/></svg>`,
    illness: `<svg ${common}><path d="M13 34h22"/><path d="M16 34V18c0-4 3-7 7-7 5 0 8 4 8 8v15"/><path d="M11 23h26"/><path d="M24 15v14"/><path d="M18 22h12"/></svg>`,
    solitude: `<svg ${common}><path d="M24 9c5 0 9 4 9 9 0 10-9 21-9 21S15 28 15 18c0-5 4-9 9-9z"/><path d="M20 19h.01M28 19h.01"/><path d="M20 27c2 1 6 1 8 0"/></svg>`,
    freedom: `<svg ${common}><path d="M9 30c10-2 17-8 22-19 1 10 4 17 8 22"/><path d="M11 38c9-5 18-6 28-3"/><path d="M18 23l-7-6"/></svg>`,
  };
  return icons[type] ?? icons.migration;
}

function lockSvg() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
}

function addLog(text, critical = false) {
  state.logs.unshift({ text, critical, t: nowStamp() });
  state.logs = state.logs.slice(0, 10);
  renderLog();
}

function addScores(effects = {}) {
  for (const [key, value] of Object.entries(effects)) {
    if (!(key in state.scores)) state.scores[key] = 0;
    state.scores[key] += value;
  }
}

function pickSeed(list, offset = 0) {
  return list[Math.abs(state.seed + offset) % list.length];
}

function clampStat(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function makeProfile() {
  const origin = pickSeed(originProfiles, 3);
  const temperament = pickSeed(["谨慎", "敏感", "要强", "慢热", "容易共情", "不服输"], 17);
  const hiddenDebt = pickSeed(["害怕亏欠别人", "很难向人求助", "习惯先证明自己", "对失控格外敏感"], 41);
  return {
    ...origin,
    temperament,
    hiddenDebt,
    summary: `${origin.region} / ${origin.city} / ${temperament}`,
  };
}

function makeInitialReality(profile) {
  return {
    finance: clampStat(48 + profile.economy),
    health: clampStat(62 + profile.health),
    family: clampStat(55 + profile.family),
    relation: clampStat(46 + Math.round(profile.family / 2)),
    career: 30,
    education: clampStat(45 + profile.education),
    agency: 42,
    stability: clampStat(50 + Math.round(profile.economy / 2)),
  };
}

function resetReality() {
  state.profile = makeProfile();
  state.reality = makeInitialReality(state.profile);
  state.lifeFragments = [];
}

function realityLevel(value) {
  if (value >= 76) return "高";
  if (value >= 58) return "尚可";
  if (value >= 38) return "紧绷";
  return "危险";
}

function realitySnapshot() {
  const r = state.reality ?? makeInitialReality(state.profile ?? makeProfile());
  return `钱${realityLevel(r.finance)} / 健康${realityLevel(r.health)} / 关系${realityLevel(r.relation)} / 自主${realityLevel(r.agency)}`;
}

function applyRealityEffects(effects = {}) {
  if (!state.reality) resetReality();
  for (const [scoreKey, value] of Object.entries(effects)) {
    const statEffects = realityEffectMap[scoreKey];
    if (!statEffects) continue;
    for (const [statKey, amount] of Object.entries(statEffects)) {
      state.reality[statKey] = clampStat((state.reality[statKey] ?? 50) + amount * value);
    }
  }
}

function currentChapter() {
  const node = activeNode();
  if (state.ended) {
    return {
      kicker: "终局 / 回放",
      summary: state.finalEnding?.body ?? "人生已经归档。",
      facts: state.decisions.slice(-3).map((item) => `${item.age}岁：${item.choice}`),
    };
  }
  if (node) return chapterRealities[node.id];
  const profile = state.profile;
  return {
    kicker: "出生参数",
    summary: `${profile.region}出生。${profile.home}`,
    facts: [profile.school, profile.body, `性格底色：${profile.temperament}；隐藏债务：${profile.hiddenDebt}`],
  };
}

function makeLifeFragment(node, option) {
  const body = optionAftermath[node.id]?.[option.id] ?? option.result;
  return {
    age: node.age,
    title: node.title,
    choice: option.label,
    tag: option.tag,
    body,
    snapshot: realitySnapshot(),
  };
}

function effectSummary(effects = {}) {
  return Object.entries(effects)
    .map(([key, value]) => `${scoreEffectLabels[key] ?? key}${value > 0 ? "+" : ""}${value}`)
    .join(" / ");
}

function renderChapter() {
  const chapter = currentChapter();
  els.chapterKicker.textContent = chapter.kicker;
  els.chapterTitle.textContent = state.ended ? "人生发生过什么" : state.locked ? `${activeNode().age}岁现实背景` : "你的出生不是空白";
  els.chapterSummary.textContent = chapter.summary;
  els.chapterFacts.innerHTML = "";
  for (const fact of chapter.facts) {
    const li = document.createElement("li");
    li.textContent = fact;
    els.chapterFacts.append(li);
  }
}

function renderReality() {
  const profile = state.profile;
  const reality = state.reality;
  els.realityState.textContent = state.ended ? "已归档" : state.locked ? "运行中" : "未锁定";
  els.profileSummary.innerHTML = `
    <strong>${profile.summary}</strong>
    <span>${profile.home}</span>
  `;
  els.lifeStats.innerHTML = "";
  for (const [key, label] of Object.entries(realityStatLabels)) {
    const value = reality[key] ?? 0;
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `
      <span>${label}</span>
      <div class="stat-track" aria-hidden="true"><i style="width: ${value}%"></i></div>
      <strong>${value}</strong>
    `;
    els.lifeStats.append(row);
  }

  els.lifeFragments.innerHTML = "";
  const fragments = state.lifeFragments.slice(0, 4);
  if (!fragments.length) {
    const li = document.createElement("li");
    li.className = "empty-fragment";
    li.textContent = "生活切片尚未生成。选择宿命后，每个节点都会写入真实后果。";
    els.lifeFragments.append(li);
    return;
  }
  for (const item of fragments) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.age}岁 · ${item.title}</span>
      <strong>${item.choice}</strong>
      <p>${item.body}</p>
      <small>${item.snapshot}</small>
    `;
    els.lifeFragments.append(li);
  }
}

function renderFates() {
  els.fateList.className = "fate-list";
  els.fateList.innerHTML = "";
  for (const item of fates) {
    const button = document.createElement("button");
    button.className = "fate-card";
    button.type = "button";
    button.dataset.id = item.id;
    if (item.id === state.selectedId) button.classList.add("selected");
    button.innerHTML = `
      <span class="fate-icon" aria-hidden="true">${iconSvg(item.icon)}</span>
      <span class="fate-copy">
        <strong>${item.name}</strong>
        <span>${item.line}</span>
      </span>
      <span class="fate-odds">选择率<strong>${item.odds}</strong></span>
    `;
    button.addEventListener("click", () => selectFate(item.id));
    els.fateList.append(button);
  }
}

function renderNodeChoices() {
  const node = activeNode();
  els.fateList.className = "fate-list node-list";
  els.fateList.innerHTML = "";

  if (state.ended) {
    const ending = state.finalEnding;
    const archive = document.createElement("article");
    archive.className = "ending-card";
    archive.innerHTML = `
      <span class="node-age">终局档案</span>
      <strong>${ending.title}</strong>
      <p>${ending.body}</p>
      <small>${ending.code}</small>
    `;
    els.fateList.append(archive);
    for (const decision of state.decisions.slice().reverse()) {
      const row = document.createElement("div");
      row.className = "history-row";
      row.innerHTML = `
        <span>${decision.age}岁 · ${decision.title}</span>
        <strong>${decision.choice}</strong>
        <small>${decision.result}</small>
        <p>${decision.lifeText}</p>
        <em>${decision.snapshot}</em>
      `;
      els.fateList.append(row);
    }
    return;
  }

  if (!node) return;
  for (const [index, option] of node.options.entries()) {
    const button = document.createElement("button");
    button.className = "node-card";
    button.type = "button";
    button.dataset.option = option.id;
    button.innerHTML = `
      <span class="node-age">${node.age}岁 / 选项 ${index + 1}</span>
      <strong>${option.label}</strong>
      <p>${option.result}</p>
      <small>${option.tag} · ${effectSummary(option.effects)}</small>
    `;
    button.addEventListener("click", () => chooseNodeOption(option.id));
    els.fateList.append(button);
  }
}

function renderTimeline() {
  els.constraints.innerHTML = "";
  for (const node of lifeNodes) {
    const decision = state.decisions.find((item) => item.nodeId === node.id);
    const isActive = activeNode()?.id === node.id && !state.ended;
    const li = document.createElement("li");
    li.className = decision ? "done" : isActive ? "active" : "pending";
    li.innerHTML = `
      ${lockSvg()}
      <span>
        <b>${node.age}岁 · ${node.title}</b>
        <em>${decision ? decision.choice : isActive ? node.prompt : "等待抵达"}</em>
      </span>
      <strong>${decision ? "已写入" : isActive ? "选择中" : "未到达"}</strong>
    `;
    els.constraints.append(li);
  }

  if (state.ended && state.finalEnding) {
    els.endingPanel.className = "warning-strip ending-strip";
    els.endingPanel.innerHTML = `<strong>${state.finalEnding.code} / ${state.finalEnding.title}</strong><span>${state.finalEnding.body}</span>`;
  } else if (state.locked && activeNode()) {
    els.endingPanel.className = "warning-strip";
    els.endingPanel.textContent = `当前节点：${activeNode().age}岁。选择后不可撤销，结局参数会立即写入。`;
  } else {
    els.endingPanel.className = "warning-strip";
    els.endingPanel.textContent = "警告：所有约束永久生效，无法解除。";
  }
}

function renderLog() {
  els.fateLog.innerHTML = "";
  for (const entry of state.logs) {
    const li = document.createElement("li");
    li.className = entry.critical ? "critical" : "";
    li.textContent = `${entry.t} ${entry.text}`;
    els.fateLog.append(li);
  }
}

function renderUi() {
  const current = fate();
  const node = activeNode();
  els.lifeBar.style.width = `${Math.min(state.life, 100)}%`;
  els.lifeValue.textContent = state.locked ? `${state.age || 0}岁 · ${state.life.toFixed(1)}%` : `${state.life.toFixed(1)}%`;
  els.escapeRate.textContent = `成功率 ${(0.0001 / (1 + state.correction)).toFixed(4)}%`;
  els.rebirthLeft.textContent = `剩余次数 ${state.rebirths} 次`;
  els.selectState.textContent = state.ended ? "已归档" : state.locked ? `节点 ${state.nodeIndex + 1}/${lifeNodes.length}` : "待选择";
  els.runState.textContent = state.ended ? "结局写入" : state.locked ? "节点锁定" : "不可逆";
  els.timelineTitle.textContent = state.ended ? "结局档案" : "人生时间线";
  els.timelineSubtitle.textContent = state.locked ? `已写入 ${state.decisions.length}/${lifeNodes.length} 个节点` : "节点尚未生成";

  if (!state.locked) {
    els.choiceTitle.textContent = "选择你的宿命";
    els.choiceSubtitle.textContent = "选择后将进入人生节点，无法更改";
    els.worldNote.textContent = "你的一生，早已在系统中生成。";
    els.hintText.textContent = "提示：宿命只是底色，真正的结局会被每个节点选择改写。";
    els.lifeWarning.textContent = "警告：无人能抵达 100%，结局会自行抵达你。";
    els.endingText.textContent = "出生分配器等待确认。";
    renderFates();
  } else if (state.ended) {
    els.choiceTitle.textContent = "结局已写入";
    els.choiceSubtitle.textContent = "每一次选择都保留在档案中";
    els.worldNote.textContent = `${state.finalEnding.code}：${state.finalEnding.title}`;
    els.hintText.textContent = "系统提示：重开人生不会删除你已经知道的价格。";
    els.lifeWarning.textContent = state.finalEnding.body;
    els.endingText.textContent = `人生归档完成：${state.finalEnding.title}`;
    renderNodeChoices();
  } else {
    els.choiceTitle.textContent = `${node.age}岁 · ${node.title}`;
    els.choiceSubtitle.textContent = node.prompt;
    els.worldNote.textContent = `当前节点：${node.age}岁。宿命底色：${current.name}。`;
    els.hintText.textContent = `系统提示：本节点的选择将改变结局参数，但不能撤回。`;
    els.lifeWarning.textContent = `警告：${node.prompt}`;
    els.endingText.textContent = `${node.age}岁节点等待选择。`;
    renderNodeChoices();
  }

  els.population.textContent = Math.floor(state.population).toLocaleString("en-US");
  els.chooseBtn.disabled = state.locked;
  els.escapeBtn.disabled = state.ended;
  els.rebirthBtn.disabled = state.rebirths <= 0;
  renderChapter();
  renderReality();
  renderTimeline();
  drawWorld();
}

function selectFate(id) {
  if (state.locked) {
    addLog("更改请求被拒绝：宿命字段只读", true);
    state.correction += 1.3;
    renderUi();
    return;
  }
  state.selectedId = id;
  addLog(`预选宿命：${fate().name}`);
  renderUi();
}

function chooseFate() {
  if (state.locked) return;
  state.locked = true;
  state.nodeIndex = 0;
  state.age = lifeNodes[0].age;
  state.life = lifeNodes[0].progress;
  state.awaitingNode = true;
  const current = fate();
  addScores(current.bias);
  applyRealityEffects(current.bias);
  addLog(`已选择宿命：${current.name}`, true);
  for (const item of current.logs) addLog(item);
  addLog(`现实参数同步：${realitySnapshot()}`);
  addLog(`[${state.age}岁] 节点开启：${activeNode().title}`, true);
  renderUi();
}

function chooseNodeOption(optionId) {
  const node = activeNode();
  if (!state.locked || state.ended || !node) return;
  const option = node.options.find((item) => item.id === optionId);
  if (!option) return;

  addScores(option.effects);
  applyRealityEffects(option.effects);
  const fragment = makeLifeFragment(node, option);
  state.lifeFragments.unshift(fragment);
  state.decisions.push({
    nodeId: node.id,
    age: node.age,
    title: node.title,
    choiceId: option.id,
    choice: option.label,
    result: option.result,
    tag: option.tag,
    lifeText: fragment.body,
    snapshot: fragment.snapshot,
  });
  state.correction += Math.max(0.4, Object.values(option.effects).reduce((sum, value) => sum + Math.abs(value), 0) * 0.18);
  state.resistance = Math.max(0, state.resistance - 2);
  addLog(`[${node.age}岁] 选择：${option.label}`, true);
  addLog(option.result);
  addLog(`[${node.age}岁] 生活切片已写入`);

  if (state.nodeIndex >= lifeNodes.length - 1) {
    finalizeEnding();
  } else {
    state.nodeIndex += 1;
    const next = activeNode();
    state.age = next.age;
    state.life = next.progress;
    addLog(`[${next.age}岁] 节点开启：${next.title}`, true);
  }
  renderUi();
}

function makeEnding() {
  const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1]);
  let dominant = sorted[0]?.[0] ?? "order";
  if (state.scores.health <= -4) dominant = "health";
  if (state.scores.solitude >= 5 && state.scores.belonging <= 0) dominant = "solitude";

  const path = state.decisions.map((item) => item.choiceId).join("-");
  let hash = 17;
  for (const char of `${state.selectedId}-${path}`) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  const code = `E-${state.selectedId.slice(0, 2).toUpperCase()}-${dominant.slice(0, 2).toUpperCase()}-${String(hash).padStart(3, "0")}`;

  const endings = {
    wealth: ["金色牢笼", "你把不安兑换成资产，又把资产兑换成新的不安。最后你拥有很多证明，却很少拥有自己。"],
    fame: ["众声之墓", "很多人记得你的名字，但没人知道你沉默时是谁。名望替你活了一部分人生。"],
    freedom: ["漫长出走", "你一次次离开既定轨道，最后发现出走本身也成了轨道。自由没有救你，只让你清醒地困着。"],
    health: ["病历人生", "身体把每个计划拆成更小的单位。你没有赢过命运，但你学会了用很慢的速度继续。"],
    belonging: ["温顺港湾", "你成为许多人可以停靠的地方。港湾安稳，潮水也从此不再只属于你。"],
    order: ["体制内的静默", "你顺利、体面、低噪地穿过系统。结局没有坍塌，也没有真正打开。"],
    solitude: ["无人回声", "你保住了完整的自己，也失去了很多被打扰的机会。晚年的房间很安静，安静得像审判。"],
    curiosity: ["迟来的觉醒", "你没有停止追问，答案却总是比人生晚一步抵达。你看清了规则，也看清无法退出。"],
    migration: ["远方循环", "你不断抵达新的坐标，每一次都以为会重新开始。后来你明白，随身携带的才是故乡。"],
  };
  const [title, body] = endings[dominant] ?? endings.order;
  const last = state.decisions[state.decisions.length - 1];
  const profile = state.profile;
  const route = state.lifeFragments
    .slice()
    .reverse()
    .map((item) => `${item.age}岁${item.choice}`)
    .join(" -> ");
  return {
    code,
    title,
    body: `${body} 你从${profile.region}出发，带着“${profile.hiddenDebt}”的底层脚本一路运行。最后一个节点里，你选择了“${last.choice}”。现实档案停在：${realitySnapshot()}。`,
    dominant,
    path: state.decisions.map((item) => `${item.age}岁:${item.choice}`).join(" / "),
    route,
  };
}

function finalizeEnding() {
  state.age = 88;
  state.life = 100;
  state.ended = true;
  state.awaitingNode = false;
  state.finalEnding = makeEnding();
  addLog(`结局写入：${state.finalEnding.title}`, true);
  addLog(`结局编号：${state.finalEnding.code}`, true);
}

function struggle() {
  const current = fate();
  if (!state.locked) {
    addLog("未进入人生，挣脱对象尚未生成", true);
    state.correction += 0.4;
    renderUi();
    return;
  }
  if (state.ended) {
    addLog("结局已归档，挣脱请求转入旁注", true);
    renderUi();
    return;
  }
  state.resistance += 7 + Math.random() * 5;
  state.correction += 2.2 + Math.random() * 1.4;
  state.scores.freedom += 0.7;
  state.scores.solitude += 0.4;
  addLog(`尝试挣脱：系统将其归类为 ${current.name} 的节点噪声`, true);
  if (state.resistance > 34) addLog("自由意志峰值过高，已启用命运纠偏", true);
  renderUi();
}

function rebirth() {
  if (state.rebirths <= 0) {
    addLog("重开请求失败：今日配额已用尽", true);
    return;
  }
  state.rebirths -= 1;
  state.locked = false;
  state.ended = false;
  state.awaitingNode = false;
  state.life = 0;
  state.age = 0;
  state.nodeIndex = -1;
  state.resistance = 0;
  state.correction += 0.8;
  state.decisions = [];
  state.scores = { ...initialScores };
  state.finalEnding = null;
  state.seed = (state.seed * 9301 + 49297) % 233280;
  resetReality();
  state.selectedId = fates[state.seed % fates.length].id;
  addLog("重开人生：初始条件重新分配");
  addLog("残留记忆：上一次选择仍影响本次出生", true);
  renderUi();
}

function update(dt) {
  state.elapsed += dt;
  state.tick += dt;
  state.population += 1.75 * dt;
  state.resistance = Math.max(0, state.resistance - dt * 0.42);
  if (state.tick > 1) {
    state.tick = 0;
    updateEarthTime();
    renderUi();
  } else {
    drawWorld();
  }
}

function updateEarthTime() {
  const base = new Date("2026-05-25T20:41:00+08:00");
  base.setDate(base.getDate() + Math.floor((state.age || 0) * 365.25) + Math.floor(state.elapsed * 3));
  const value = `${base.getFullYear()}.${pad(base.getMonth() + 1)}.${pad(base.getDate())} ${pad(base.getHours())}:${pad(base.getMinutes())}:${pad(base.getSeconds())}`;
  els.earthTime.textContent = value;
}

function resizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  els.canvas.width = Math.max(640, Math.floor(rect.width * dpr));
  els.canvas.height = Math.max(420, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawWorld();
}

function drawWorld() {
  const width = els.canvas.clientWidth || 960;
  const height = els.canvas.clientHeight || 640;
  ctx.clearRect(0, 0, width, height);

  if (bg.complete && bg.naturalWidth) {
    const scale = Math.max(width / bg.naturalWidth, height / bg.naturalHeight);
    const drawW = bg.naturalWidth * scale;
    const drawH = bg.naturalHeight * scale;
    ctx.globalAlpha = 0.88;
    ctx.drawImage(bg, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = "#050a0b";
    ctx.fillRect(0, 0, width, height);
  }

  const cx = width / 2;
  const cy = height * 0.49;
  const radius = Math.min(width, height) * 0.225;
  const current = fate();
  const time = state.elapsed * 0.3;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 9; i += 1) {
    const phase = time + i * 0.72;
    const rx = radius * (1.8 + (i % 3) * 0.18);
    const ry = radius * (0.42 + (i % 4) * 0.06);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(phase * 0.16 + i * 0.34);
    ctx.strokeStyle = i % 4 === 0 ? "rgba(241, 98, 77, 0.48)" : "rgba(145, 233, 223, 0.42)";
    ctx.lineWidth = i % 4 === 0 ? 1.2 : 0.85;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  const points = 7;
  for (let i = 0; i < points; i += 1) {
    const angle = time * 0.7 + (i / points) * Math.PI * 2;
    const orbit = radius * (1.48 + (i % 3) * 0.18);
    const x = cx + Math.cos(angle) * orbit;
    const y = cy + Math.sin(angle * 1.7) * radius * 0.62;
    ctx.fillStyle = i === state.seed % points ? current.tone : "rgba(145, 233, 223, 0.88)";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, i === state.seed % points ? 5 : 3, 0, Math.PI * 2);
    ctx.fill();
  }

  if (state.locked) {
    ctx.strokeStyle = state.ended ? "rgba(216, 183, 95, 0.9)" : current.tone;
    ctx.lineWidth = state.ended ? 3 : 2;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    const wobble = Math.sin(time * 4) * 12;
    ctx.moveTo(cx - radius * 1.4, cy + radius * 0.95);
    ctx.bezierCurveTo(cx - radius * 0.4, cy - radius * 0.9 + wobble, cx + radius * 0.4, cy + radius * 1.1 - wobble, cx + radius * 1.45, cy - radius * 0.72);
    ctx.stroke();
  }

  if (state.resistance > 0) {
    const cap = Math.min(0.96, state.resistance / 100);
    ctx.strokeStyle = "rgba(241, 98, 77, 0.78)";
    ctx.lineWidth = 3;
    ctx.shadowColor = "rgba(241, 98, 77, 0.9)";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.33, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * cap);
    ctx.stroke();

    ctx.fillStyle = "rgba(241, 98, 77, 0.08)";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();

  drawNodeTicks(width, height);

  ctx.fillStyle = "rgba(2, 7, 8, 0.25)";
  ctx.fillRect(0, height - 42, width, 42);
  ctx.fillStyle = state.locked ? "rgba(241, 98, 77, 0.84)" : "rgba(145, 233, 223, 0.62)";
  ctx.font = "12px SFMono-Regular, monospace";
  const phase = state.ended ? state.finalEnding.code : state.locked ? `${state.age}Y / NODE-${state.nodeIndex + 1}` : "PENDING";
  ctx.fillText(`WORLDLINE-${String(state.seed).padStart(5, "0")} / ${phase} / ${fate().name}`, 28, height - 18);
}

function drawNodeTicks(width, height) {
  const left = 34;
  const right = width - 34;
  const y = height - 66;
  ctx.save();
  ctx.font = "10px SFMono-Regular, monospace";
  for (const [index, node] of lifeNodes.entries()) {
    const x = left + ((right - left) * index) / (lifeNodes.length - 1);
    const done = state.decisions.some((item) => item.nodeId === node.id);
    const active = index === state.nodeIndex && !state.ended;
    ctx.strokeStyle = done ? "rgba(241, 98, 77, 0.8)" : active ? "rgba(145, 233, 223, 0.9)" : "rgba(122, 170, 166, 0.28)";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    ctx.lineTo(x, y + 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, active ? 4 : 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`${node.age}`, x - 6, y + 22);
  }
  ctx.restore();
}

function frame(now) {
  if (!frame.last) frame.last = now;
  const dt = Math.min(0.05, (now - frame.last) / 1000);
  frame.last = now;
  update(dt);
  requestAnimationFrame(frame);
}

function renderGameToText() {
  const payload = {
    coordinateSystem: "DOM/canvas pixels, origin top-left, x right, y down",
    mode: state.ended ? "ended" : state.locked ? "node-choice" : "selecting-fate",
    selectedFate: fate().name,
    selectedId: state.selectedId,
    locked: state.locked,
    currentAge: state.age,
    currentNode: activeNode() ? { age: activeNode().age, title: activeNode().title, prompt: activeNode().prompt } : null,
    currentChapter: currentChapter(),
    availableChoices: activeNode() && !state.ended ? activeNode().options.map((item) => ({ label: item.label, result: item.result, effects: effectSummary(item.effects) })) : [],
    profile: state.profile ? { summary: state.profile.summary, home: state.profile.home, hiddenDebt: state.profile.hiddenDebt } : null,
    reality: state.reality,
    decisions: state.decisions.map((item) => ({ age: item.age, title: item.title, choice: item.choice, lifeText: item.lifeText, snapshot: item.snapshot })),
    latestLifeFragments: state.lifeFragments.slice(0, 3),
    ending: state.finalEnding,
    lifeProgress: Number(state.life.toFixed(1)),
    resistance: Number(state.resistance.toFixed(1)),
    correction: Number(state.correction.toFixed(1)),
    rebirthsLeft: state.rebirths,
    latestLogs: state.logs.slice(0, 5).map((entry) => entry.text),
  };
  return JSON.stringify(payload);
}

window.render_game_to_text = renderGameToText;
window.advanceTime = (ms) => {
  const steps = Math.max(1, Math.round(ms / (1000 / 60)));
  for (let i = 0; i < steps; i += 1) update(1 / 60);
  renderUi();
};

els.chooseBtn.addEventListener("click", chooseFate);
els.escapeBtn.addEventListener("click", struggle);
els.rebirthBtn.addEventListener("click", rebirth);

window.addEventListener("resize", resizeCanvas);
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (/^[1-6]$/.test(key) && !state.locked) selectFate(fates[Number(key) - 1].id);
  if (/^[1-3]$/.test(key) && state.locked && !state.ended) {
    const option = activeNode()?.options[Number(key) - 1];
    if (option) chooseNodeOption(option.id);
  }
  if (key === "enter" && !state.locked) chooseFate();
  if (key === "enter" && state.locked && !state.ended) {
    const option = activeNode()?.options[0];
    if (option) chooseNodeOption(option.id);
  }
  if (key === "e") struggle();
  if (key === "r") rebirth();
  if (key === "f") {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }
});

resetReality();
addLog(`你出生在 ${state.profile.region}`);
addLog(`性格底色：${state.profile.temperament}`);
addLog(`家庭环境：${state.profile.home}`);
addLog(`教育资源：${state.profile.school}`);
addLog(`健康状况：${state.profile.body}`);
addLog(`预选宿命：${fate().name}`, true);
renderUi();
resizeCanvas();
requestAnimationFrame(frame);
