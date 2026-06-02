const fates = [
  {
    id: "migration",
    name: "迁徙",
    line: "你总在离开，以为下一站会重新开始。",
    odds: "18.7%",
    tone: "#92e8dc",
    icon: "migration",
    bias: { freedom: 1, solitude: 1, belonging: -1 },
    logs: ["户籍坐标进入漂移", "熟人网络稀释", "归属感改为异地结算"],
  },
  {
    id: "wealth",
    name: "财富",
    line: "你用数字抵抗不安，数字也开始指挥你。",
    odds: "17.5%",
    tone: "#d8b75f",
    icon: "wealth",
    bias: { wealth: 2, order: 1, freedom: -1 },
    logs: ["安全感绑定账户余额", "风险厌恶上调", "欲望列表自动续费"],
  },
  {
    id: "fame",
    name: "名望",
    line: "他人的目光会照亮你，也会替你定型。",
    odds: "12.3%",
    tone: "#a8d5cf",
    icon: "fame",
    bias: { fame: 2, solitude: 1 },
    logs: ["自我叙事进入公开频道", "沉默权限下降", "评价系统常驻后台"],
  },
  {
    id: "illness",
    name: "病痛",
    line: "身体不是容器，它会在关键时刻投票。",
    odds: "22.1%",
    tone: "#f1624d",
    icon: "illness",
    bias: { health: -2, solitude: 1, curiosity: 1 },
    logs: ["体力额度降低", "医院地图解锁", "计划表新增不可抗力"],
  },
  {
    id: "solitude",
    name: "孤独",
    line: "你保留了完整的自己，也扩大了回声。",
    odds: "16.4%",
    tone: "#7da29c",
    icon: "solitude",
    bias: { solitude: 2, curiosity: 1, belonging: -1 },
    logs: ["亲密接口降频", "夜间思维增殖", "求助按钮移至二级菜单"],
  },
  {
    id: "freedom",
    name: "自由",
    line: "你选择不被安排，世界便安排你承担后果。",
    odds: "12.0%",
    tone: "#b9c7c0",
    icon: "freedom",
    bias: { freedom: 2, order: -1, solitude: 1 },
    logs: ["路径依赖检测增强", "稳定收益降低", "选择权进入高维护模式"],
  },
];

const lifeNodes = [
  {
    id: "childhood",
    age: 6,
    progress: 8,
    title: "第一张排名表",
    prompt: "你坐在教室第三排，第一次发现大人会用分数替小孩命名。",
    options: [
      { id: "hide_mistakes", label: "把错题藏进抽屉", result: "你学会了先处理羞耻，再处理问题。", tag: "低声防御", effects: { order: 2, health: -1, curiosity: -1 } },
      { id: "defend_friend", label: "替被笑的同桌说话", result: "你第一次因为正确的事被罚站。", tag: "过早正义", effects: { belonging: 1, curiosity: 1, order: -1 } },
      { id: "after_school", label: "被送进兴趣班连轴转", result: "你拥有更多技能，也更早知道疲惫可以被夸奖。", tag: "提前加速", effects: { fame: 1, curiosity: 1, health: -1, order: 1 } },
      { id: "silent_corner", label: "假装听不见比较", result: "你在角落里安全了一点，也远了一点。", tag: "角落生存", effects: { solitude: 2, health: 1, belonging: -1 } },
      { id: "private_rules", label: "偷偷写自己的规则", result: "你把世界拆开重装，虽然没人同意。", tag: "私有规则", effects: { freedom: 1, curiosity: 2, order: -1, solitude: 1 } },
    ],
  },
  {
    id: "exam",
    age: 18,
    progress: 24,
    title: "分数后的岔路",
    prompt: "志愿表像一张地图，边界却由分数、学费和家人的沉默画好。",
    options: [
      { id: "family_safe", label: "听家里选保底专业", result: "你换来一张安稳入场券，也把热爱按下静音。", tag: "家庭保底", effects: { order: 2, wealth: 1, belonging: 1, freedom: -2 } },
      { id: "unpopular_dream", label: "押注一个冷门热爱", result: "你把未来押给少数派，代价从开学第一天开始收取。", tag: "少数派梦", effects: { curiosity: 2, freedom: 1, fame: 1, wealth: -2 } },
      { id: "work_first", label: "先去打工攒钱", result: "你比同龄人更早懂账单，也更晚拥有缓冲。", tag: "提前入场", effects: { wealth: 1, migration: 1, health: -1, order: 1 } },
      { id: "follow_love", label: "跟喜欢的人去同一座城", result: "你把地图折成两个人的形状，却忘了城市会把人摊开。", tag: "同城誓言", effects: { belonging: 2, freedom: -1, order: -1, solitude: -1 } },
      { id: "repeat_year", label: "复读一年重新下注", result: "你把十八岁延长十二个月，换一个可能更锋利的自己。", tag: "延迟判决", effects: { order: 1, curiosity: 1, health: -1, solitude: 1 } },
    ],
  },
  {
    id: "work",
    age: 24,
    progress: 36,
    title: "出售白天",
    prompt: "合同写着岗位职责，没写你会把多少情绪留在地铁里。",
    options: [
      { id: "big_company", label: "进大公司熬资历", result: "你得到清晰的梯子，也发现每一级都要用睡眠缴费。", tag: "组织履历", effects: { wealth: 2, fame: 1, order: 1, health: -2 } },
      { id: "civil_exam", label: "回家备考稳定岗位", result: "你把风险关小，把生活装回熟人社会。", tag: "稳定回流", effects: { order: 2, belonging: 1, wealth: 1, freedom: -2 } },
      { id: "startup", label: "和朋友合伙创业", result: "你们用热血抵押现金流，友谊开始接受压力测试。", tag: "合伙赌局", effects: { freedom: 2, curiosity: 1, fame: 1, wealth: -2 } },
      { id: "ordinary_job", label: "做普通工作保护生活", result: "你拒绝把全部人生交给简历，代价是机会也变少。", tag: "低燃生活", effects: { health: 2, order: 1, fame: -1, curiosity: -1 } },
      { id: "drift", label: "去远方短暂漂流", result: "你用陌生城市清空自己，银行卡却记得每一次轻盈。", tag: "短暂漂流", effects: { migration: 2, freedom: 1, solitude: 1, wealth: -1 } },
    ],
  },
  {
    id: "intimacy",
    age: 32,
    progress: 52,
    title: "共享人生权限",
    prompt: "爱、房子、父母和未来计划挤在同一张餐桌上，谁也不肯先离开。",
    options: [
      { id: "mortgage_family", label: "结婚买房，把家搭起来", result: "你有了可落脚的地址，也有了每月准时响起的锁链。", tag: "共同负债", effects: { belonging: 2, order: 2, wealth: -1, freedom: -2 } },
      { id: "break_clean", label: "分开，保留完整自己", result: "你亲手关上一扇温暖的门，换来不被吞没的房间。", tag: "完整撤退", effects: { freedom: 2, solitude: 1, belonging: -1 } },
      { id: "honest_talk", label: "把需求摊开谈判", result: "你们把爱从幻想里拿出来，放到现实里重新定价。", tag: "诚实协议", effects: { curiosity: 1, freedom: 1, belonging: 1, order: -1 } },
      { id: "perform_happy", label: "维持看起来幸福的关系", result: "你们学会对外同步微笑，对内延迟崩塌。", tag: "合照人生", effects: { fame: 1, order: 1, solitude: 2, health: -1 } },
      { id: "parent_home", label: "回到父母身边照应", result: "你重新进入旧家庭的重力场，熟悉也重新变重。", tag: "旧家引力", effects: { belonging: 1, order: 1, solitude: 1, freedom: -1 } },
    ],
  },
  {
    id: "crisis",
    age: 45,
    progress: 70,
    title: "中场系统告警",
    prompt: "体检报告、贷款余额、父母病历和未完成的自己同时刷新。",
    options: [
      { id: "parents_in", label: "把父母接来同住", result: "你让照护变得近一点，也让边界变得薄一点。", tag: "照护同屋", effects: { belonging: 2, order: 1, health: -1, freedom: -1 } },
      { id: "shrink_life", label: "缩小生活偿还债务", result: "你删掉很多愿望，让账单终于不再追着你跑。", tag: "压缩人生", effects: { wealth: 1, order: 2, fame: -1, freedom: -1 } },
      { id: "ask_help", label: "承认崩溃并求助", result: "你第一次把脆弱交出去，发现并非所有人都会利用它。", tag: "求助权限", effects: { health: 2, belonging: 1, fame: -1, order: -1 } },
      { id: "switch_track", label: "跳槽转行，重开半局", result: "你把中年从句号改成冒号，后面仍然很难写。", tag: "半局重开", effects: { freedom: 2, curiosity: 1, wealth: -1, order: -1 } },
      { id: "scroll_numb", label: "用短视频麻醉夜晚", result: "你把每个夜晚切成几十秒，第二天仍然完整压下来。", tag: "碎片麻醉", effects: { solitude: 2, health: -2, order: 1 } },
    ],
  },
  {
    id: "farewell",
    age: 72,
    progress: 92,
    title: "终局前的整理",
    prompt: "你开始处理旧照片、旧号码和那些迟迟没有命名的遗憾。",
    options: [
      { id: "memoir", label: "写一本只给自己看的回忆录", result: "你终于把一生按自己的顺序排了一遍。", tag: "私人史书", effects: { curiosity: 2, fame: 1, solitude: 1 } },
      { id: "divide_assets", label: "把钱提前分给家人", result: "你把控制权交出去，也把多年牵挂换成具体金额。", tag: "提前分配", effects: { belonging: 2, order: 1, wealth: -1 } },
      { id: "sell_travel", label: "卖掉房子去旅行", result: "你用最后的稳定换几张陌生车票。", tag: "晚年出走", effects: { migration: 2, freedom: 2, health: -1 } },
      { id: "apologize", label: "给旧人打电话道歉", result: "有些电话接通了，有些没有，但你不再替沉默找借口。", tag: "迟来修复", effects: { belonging: 1, health: 1, curiosity: 1, solitude: -1 } },
      { id: "no_summary", label: "什么也不总结", result: "你拒绝把人生压缩成一句道理。", tag: "无结论", effects: { order: 1, health: 1, fame: -1, curiosity: -1 } },
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
    summary: "六岁不是开始选择人生，而是开始理解自己在别人眼里的价格。",
    facts: ["奖状贴在墙上，沉默贴在你身上", "老师的表扬会改变饭桌气氛", "你第一次发现委屈需要排队，成绩可以插队"],
  },
  exam: {
    kicker: "教育 / 流动",
    summary: "十八岁看起来像自由的入口，实际上更像一次成本清算。",
    facts: ["志愿代码把热爱、就业和家庭期待压成几行数字", "亲戚把人生讲成投资回报率", "远方不是诗，远方先是押金、车票和无人接你的夜晚"],
  },
  work: {
    kicker: "工作 / 账单",
    summary: "二十四岁以后，生活开始按月结算，梦想如果没有发票就很难报销。",
    facts: ["通勤会重塑性格，绩效会重塑语气", "同事可以一起熬夜，却未必能一起脆弱", "你学会把崩溃藏在已读不回和外卖订单之间"],
  },
  intimacy: {
    kicker: "亲密 / 责任",
    summary: "亲密不是一条单独的支线，它会接管预算、时间、朋友圈和你的自我解释权。",
    facts: ["爱情会让未来具体，也会让失败更难独自承担", "独身不等于自由，但它保留了更多未被协商的夜晚", "很多关系不是不爱了，而是被现实磨到只剩维护成本"],
  },
  crisis: {
    kicker: "中年 / 损耗",
    summary: "中年不是年龄，是多个账单同时要求你证明自己还能运行。",
    facts: ["体检单会说真话，通讯录会变短，贷款不会安慰你", "你开始分不清责任和惯性，只知道都很重", "真正困难的不是选择，而是承认过去那套办法已经不够用了"],
  },
  farewell: {
    kicker: "晚年 / 清算",
    summary: "晚年不是被动等待结局，而是看见那些被你拖延命名的东西终于坐到面前。",
    facts: ["遗憾会变成具体的人名和日期", "物品越来越轻，关系越来越难清点", "你终于明白人生不是一条线，是一堆无法完全解释的后果"],
  },
};

const optionAftermath = {
  childhood: {
    hide_mistakes: "你把错题本夹在最里面，不让任何人先看到你的失败。后来你做事很稳，只是每次出错都会先想自己是不是不配。",
    defend_friend: "罚站时同桌不敢看你，但放学后塞给你半块糖。你记住了：站出来并不总会赢，却会改变两个人的世界。",
    after_school: "周末被切成钢琴、英语和奥数，你比别人多会几样，也更早把疲惫误认成优秀的副作用。",
    silent_corner: "你坐在窗边，把比较声调小。孤独保护了你一部分童年，也让你错过几次本可以被拉住的机会。",
    private_rules: "你在作业本背面画自己的城市和法律。没人批准它们存在，但它们让你第一次觉得世界不是只能照抄。",
  },
  exam: {
    family_safe: "录取通知书让家里松了一口气。你也松了一口气，只是某个晚上突然想起，自己从来没有认真说过想要什么。",
    unpopular_dream: "你填下那个专业时，手心全是汗。开学后你不断解释它有什么用，解释到后来差点忘了自己为什么喜欢。",
    work_first: "你很快学会看工资条、房租和班表。别人讨论社团和恋爱时，你已经知道一个人可以多早变得现实。",
    follow_love: "你们租下很小的房间，用热情抵抗潮湿和账单。后来你发现同城不等于同路，爱也需要资源维持形状。",
    repeat_year: "复读班的灯总是亮到很晚，你把失败重新咽下去。第二年你未必抵达理想，但你更知道自己能忍到哪里。",
  },
  work: {
    big_company: "你拿到工牌那天觉得自己终于上岸。几年后你明白岸也会加班，甚至比水里更擅长让人保持体面。",
    civil_exam: "你回到熟悉街道，买菜阿姨还认得你。稳定是真的，窒息也是真的，它们一起住进你每天的通勤路线。",
    startup: "你们在咖啡店里画商业模式，像画一张逃离地图。第一笔亏损来临时，地图开始折皱，友情也开始出现折痕。",
    ordinary_job: "你开始按时吃饭、睡觉、见朋友。别人说你没野心，你偶尔也怀疑，但身体先替你松了一口气。",
    drift: "你去了海边、边城或某个没人认识你的地方。自由像短租房一样明亮，也像短租房一样随时到期。",
  },
  intimacy: {
    mortgage_family: "钥匙交到你手里时，你们都笑了。后来每个月的还款日也准时到来，提醒幸福和压力签的是同一份合同。",
    break_clean: "分开后你重新拥有完整周末，也重新拥有无人分享的坏消息。自由没有想象中轻，但至少它属于你。",
    honest_talk: "那场谈话很难看，也很有用。你们第一次不是靠猜测维持关系，而是把需求、恐惧和底线摊在桌上。",
    perform_happy: "朋友圈里你们依然很好，亲戚面前也很好。只有回家后的沉默知道，体面有时比争吵更消耗人。",
    parent_home: "你回到熟悉的饭菜和旧房间，也回到那些从小没解决的语气。照应别人时，你发现自己也还没有被照应完。",
  },
  crisis: {
    parents_in: "家里多了一张床、一袋药和很多没说出口的担心。你离亲情更近，也离自己的安静更远。",
    shrink_life: "你取消旅行、卖掉闲置、减少社交。生活变小后终于能喘气，只是你偶尔会想，自己是不是也被一起缩小了。",
    ask_help: "你说出撑不住的那一刻，羞耻先冲上来。可有人真的坐下听你说完，那一点点听见让你活回来一点。",
    switch_track: "新行业不认识你的过去，也不奖励你的年纪。你笨拙地重新开始，像一个带着旧伤的新手。",
    scroll_numb: "短视频替你填满睡前的空洞，算法很温柔，明天很冷。你没有崩溃，只是越来越难被真正唤醒。",
  },
  farewell: {
    memoir: "你写到某一年突然停笔，因为那时的自己实在太难被原谅。过了很久你继续写，语气终于柔和一点。",
    divide_assets: "家人说你想太多，你还是把事情一项项交代清楚。你不是不留恋，只是不想让爱在未来变成争执。",
    sell_travel: "你坐上很慢的车，看窗外从熟悉变陌生。身体不再年轻，但那一刻你确实重新拥有了方向。",
    apologize: "电话接通时你们都老了。道歉没有抹掉过去，却让某个多年卡住的下午终于继续往前走。",
    no_summary: "你没有写墓志铭式的答案。人生太乱，太具体，太不适合被整理成一句漂亮的话。",
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
  els.selectState.textContent = state.ended ? "已归档" : state.locked ? `节点 ${state.nodeIndex + 1}/${lifeNodes.length} · ${activeNode()?.options.length ?? 0}选1` : "待选择";
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
    wealth: ["余额审判", "你把恐惧换成资产，又把资产换成更多需要守住的恐惧。晚年最安静的时刻，你发现数字很忠诚，却从不拥抱你。"],
    fame: ["可见之刑", "你的名字被很多人调用，像一个公共接口。真正的你退到后台，偶尔发出无人订阅的日志。"],
    freedom: ["无锚航线", "你拒绝被固定，于是生活不断要求你重新证明自己能漂浮。自由没有背叛你，它只是从来不负责安顿。"],
    health: ["身体备忘录", "身体替命运保管了所有延期付款。你把人生拆成能承受的小格子，慢慢走完了别人用来奔跑的路。"],
    belonging: ["拥挤港口", "你拥有许多牵挂，也被许多牵挂拥有。那些爱让你没有坠落，也让你很少真正轻盈。"],
    order: ["低噪归档", "你按规则通过了大部分检查点，避免了许多崩塌，也错过了几次可能打开自己的危险。"],
    solitude: ["静音房间", "你守住了边界，也把很多敲门声挡在外面。最终房间很完整，只是完整得没有回声以外的证词。"],
    curiosity: ["迟到的明白", "你不断追问，答案总在下一站才肯出现。到最后你看清了很多规则，也看清看清本身并不等于逃离。"],
    migration: ["随身故乡", "你换过很多地址，每一次都以为能把旧自己落在原地。后来你知道，真正的故乡是你带着走的那套反应。"],
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
  if (/^[1-5]$/.test(key) && state.locked && !state.ended) {
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
