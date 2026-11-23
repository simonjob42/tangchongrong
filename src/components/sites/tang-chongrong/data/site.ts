import { SERIES, TOTAL_HOURS, TOTAL_SERMONS, TOTAL_TONG } from './sermons';
import type {
  FeaturedCollection,
  Ministry,
  NavItem,
  Quote,
  Theme,
  TimelineEvent,
} from '../types';

export const SITE = {
  name: '唐崇荣中文档案',
  shortName: '唐崇荣档案',
  tagline: '把唐崇荣牧师六十余年的事奉，按系列整理成一份可以随时查阅的讲道档案',
  description: `收录唐崇荣牧师 ${TOTAL_SERMONS} 篇公开讲道与问答，其中 ${TOTAL_TONG} 篇标题署名唐崇荣，涵盖创世记、约翰福音、罗马书、希伯来书等逐卷讲解，以及启示录七间教会、圣经中上帝对人的呼召、归正福音教会主日证道等 ${SERIES.length} 个系列，共约 ${TOTAL_HOURS} 小时。按系列、主题与关键词检索，并附 YouTube 原始视频。`,
  url: 'https://tang.qiaomu.ai',
  author: 'qiaomu',
  email: '',
  github: '',
  youtube: 'https://www.youtube.com/@Gudao200/playlists',
  youtubeChannel: 'https://www.youtube.com/@Gudao200',
  sourceNote:
    '本站讲道目录来自 YouTube 公开频道 @Gudao200 的播放列表，视频版权归唐崇荣牧师、STEMI 与各原始发布机构所有。',
};

export const NAV_LINKS: NavItem[] = [
  { href: '/', label: '首页' },
  { href: '/series', label: '讲道系列' },
  { href: '/archive', label: '全部讲道' },
  { href: '/qa', label: '问答精选' },
  { href: '/stats', label: '数据' },
  { href: '/about', label: '关于' },
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '1940',
    title: '生于厦门鼓浪屿',
    detail:
      '3 月 22 日出生。三岁丧父，母亲陈织娘每日带着孩子祷告一小时——他后来多次说，这是他最早的神学教育。',
  },
  {
    year: '1949',
    title: '移居印尼泗水',
    detail:
      '童年随家迁往印尼。离散者的身份、多语言的环境，后来成为他面向华人、印尼与东南亚多元群体事奉的底色。',
  },
  {
    year: '1957',
    title: '一月九日，归主并献身',
    detail:
      '十七岁在归家途中，理性与信仰达成和解。他自此认定要一生传道，并把这一天当作一切事工的纪念日。',
  },
  {
    year: '1960–1964',
    title: '曼谷东南亚圣经神学院',
    detail:
      '完成神学学士训练，立定改革宗神学立场。毕业后定下三条事奉原则：看需要、看潜力、看影响力。',
  },
  {
    year: '1978',
    title: '创办 STEMI',
    detail:
      '与 Jahja Ling 共同创办唐崇荣国际布道事工（Stephen Tong Evangelistic Ministries International），把布道呼召制度化。',
  },
  {
    year: '1984',
    title: '推动归正运动',
    detail:
      '在印尼与东南亚华人教会中公开推动归正（改革宗）神学，以五个唯独为教会生死防线。',
  },
  {
    year: '1989',
    title: '创立 GRII',
    detail:
      '印尼归正福音教会（Gereja Reformed Injili Indonesia）成立——布道家身份之外，他开始承担建制教会的责任。',
  },
  {
    year: '1993–2008',
    title: '设计弥赛亚大教堂',
    detail:
      '前后十五年审批与设计。他坚持「建筑即神学」：每一条线、每一个空间都在诉说基督论。',
  },
  {
    year: '1996',
    title: '创办 RICI',
    detail:
      '在华盛顿创立改革宗当代基督徒研究院，专门训练基督徒知识分子，把文化使命制度化。',
  },
  {
    year: '2007–2008',
    title: '威斯敏斯特荣誉神学博士',
    detail:
      '在经历学历争议之后，威斯敏斯特神学院颁授荣誉神学博士，为其学术与教会事奉提供外部背书。',
  },
  {
    year: '2020',
    title: '公开声援王怡牧师',
    detail:
      '在政治敏感议题上罕见地公开表态，为被捕的成都秋雨圣约教会王怡牧师发声。',
  },
  {
    year: '2025',
    title: '获颁库伯奖',
    detail:
      'Calvin University 颁授亚伯拉罕·库伯奖（Abraham Kuyper Prize），他是首位获此殊荣的亚洲人。',
  },
  {
    year: '2026',
    title: '八十五岁，仍在讲经',
    detail:
      '持续在新加坡与亚洲各地讲道。「呼召没有退休年龄，只有任务完成」——他的行程本身就是这句话的注脚。',
  },
];

export const THEMES: Theme[] = [
  {
    key: 'theocentrism',
    title: '神中心主义',
    subtitle: '一切答案的起点，是把神放回中心',
    body:
      '唐崇荣把人的问题归结为一个方向的错失：人把自己放在宇宙的中心。因此，教会的问题往往不是方法不够，而是失去了神；当讲台开始服务人的感受，神就离开了讲台。',
    practice: '评价任何教会实践之前，先问：这是以神为中心，还是以人为中心？',
  },
  {
    key: 'truth-goodness-beauty',
    title: '真、善、美的统一',
    subtitle: '人对三者的渴求，都是神形象的迴响',
    body:
      '真理、良善、美不是三个彼此竞争的价值，而是同一位神的三种荣光。他既写系统神学，也作圣诗、弹钢琴、设计教堂——在他的事奉里，这三者从不分离。',
    practice: '判断一件作品：它是否同时服事真、善、美，还是牺牲其余、只取其一？',
  },
  {
    key: 'cultural-mandate',
    title: '整全的文化使命',
    subtitle: '福音不止拯救灵魂，也更新文化',
    body:
      '他反对把信仰私人化。学术、艺术、建筑、音乐都是基督徒应当留下印记的领域；品质本身就是神学立场，劣质的基督教艺术是对神的冒犯。',
    practice: '不要把「传福音」与「文化参与」对立起来——整全的使命包含两者。',
  },
  {
    key: 'reason-revelation',
    title: '理性与启示的辩证',
    subtitle: '理性是好的礼物，但有边界',
    body:
      '他同时批评两种极端：一种说信仰不需要理性，一种说理性足以认识神。启示不排斥理性，而是理性的完成；真正的信仰，是理性在启示的真理中得到安息。',
    practice: '面对质疑：先认同对方理性的部分，再指出理性的边界，最后引入启示。',
  },
  {
    key: 'reformed',
    title: '改革宗正统',
    subtitle: '五个唯独不是历史遗迹，是生死防线',
    body:
      '唯独圣经、唯独信心、唯独恩典、唯独基督、唯独神的荣耀。他以此划出神学边界，也以此批评灵恩运动、自由派神学与以市场为导向的教会增长模式。',
    practice: '合一的基础必须是真理，而不是策略；没有神学共识的合一是假合一。',
  },
  {
    key: 'calling',
    title: '圣召高于一切',
    subtitle: '呼召一旦确认，就优先于一切人的安排',
    body:
      '从年轻时被拦阻仍坚持布道，到八十五岁仍维持跨亚洲的讲道行程，他把自己的一生理解为一个被托付的任务。呼召不因地理、年龄或制度而终止。',
    practice: '面对职业与人生决定，最关键的问题永远是：神是否在这里呼召你？',
  },
];

export const QUOTES: Quote[] = [
  {
    text: '真理不因人的接受而成真，也不因人的拒绝而变假。神是真理的主宰，不是辩论的胜负者。',
    source: '讲道系列',
  },
  {
    text: '一个不思考的信徒，和一个不信的思考者，都是教会的危机。',
    source: '《理性·信仰·真理》相关讲论',
  },
  {
    text: '教会的问题不是缺少方法，而是失去了神。当讲台开始服务人的感受，神就离开了讲台。',
    source: '关于教会与讲台的讲论',
  },
  {
    text: '吸引人来不是问题，让神来才是问题。',
    source: '关于布道与教会增长的讲论',
  },
  {
    text: '不能把烂诗给神唱，就像不能把烂食物献给王。',
    source: '关于基督教艺术与音乐的讲论',
  },
  {
    text: '没有人有权拦阻神的呼召。',
    source: '1966 年被拦阻布道后的回应',
  },
  {
    text: '我祈求活到九十岁，不是为了长寿，是为了完成神给我的任务。',
    source: '近年访谈',
  },
  {
    text: '无神论者早上醒来，感谢……谁呢？',
    source: '护教讲道',
  },
];

export const MINISTRIES: Ministry[] = [
  {
    name: 'STEMI',
    full: 'Stephen Tong Evangelistic Ministries International',
    founded: '1978',
    role: '布道事工',
    description:
      '唐崇荣国际布道事工，负责全球布道大会、神剧制作与媒体出版。据其统计，累计参与布道会者以千万计。',
  },
  {
    name: 'GRII',
    full: 'Gereja Reformed Injili Indonesia',
    founded: '1989',
    role: '教会建制',
    description:
      '印尼归正福音教会，从雅加达的一间教会发展为遍布印尼多城的改革宗教会网络。',
  },
  {
    name: 'RICI',
    full: 'Reformed Institute for Christianity and the 21st Century',
    founded: '1996',
    role: '教育与研究',
    description:
      '改革宗当代基督徒研究院，在美国华盛顿创立，训练基督徒知识分子与神学研究者。',
  },
  {
    name: '弥赛亚大教堂',
    full: 'Reformed Millennium Center · Messiah Cathedral',
    founded: '1993–2008',
    role: '建筑与美学',
    description:
      '由唐崇荣亲自设计的教会建筑群，历时十五年审批与设计落成。他把建筑本身视为一份神学宣言。',
  },
];

export const READING_GUIDE = [
  {
    step: '一',
    title: '从一卷书开始',
    description:
      '如果你刚接触唐牧师的讲道，建议从约翰福音或罗马书的第一讲进入。逐卷讲解最能呈现他的释经方法与论证节奏。',
  },
  {
    step: '二',
    title: '顺着系列听',
    description:
      '每个系列都有内在的论证线索。按集数顺序收听，比零散跳听更容易把握整卷书的结构与神学主题。',
  },
  {
    step: '三',
    title: '带着问题查问答',
    description:
      '问答精选收录了信仰生活中最实际的疑难：婴儿洗、异端分辨、圣灵充满、苦难、传福音。可以用搜索直接找到相关回答。',
  },
];

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    title: '初识唐崇荣',
    description: '六篇适合第一次收听的讲道：从人的困境、罪与盼望，进入基督信仰的核心。',
    slugs: [
      'zui-shi-shenme-001',
      'zui-shi-shenme-002',
      'zui-shi-shenme-003',
      'ji-du-panwang-002',
      'weishime-fuyin-001',
      'peilinghui-SGPqW0AVNUM',
    ],
  },
  {
    title: '逐卷读经',
    description: '约翰福音、罗马书、雅各书的开篇，进入他逐节讲解的释经现场。',
    slugs: [
      'yuehan-fuyin-001',
      'luomashu-001',
      'yage-shu-001',
      'yuehan-fuyin-002',
      'luomashu-002',
      'yage-shu-002',
    ],
  },
  {
    title: '信仰与生活',
    description: '关于教育、婚姻、情感与生命价值的实践神学。',
    slugs: [
      'fumu-shisbiao-001',
      'hunyin-jiating-001',
      'ganqing-shenghua-001',
      'rensheng-kuiqian-001',
      'shengming-jiazhi-001',
      'xinyang-neihan-001',
    ],
  },
];

export const SEARCH_SUGGESTIONS = [
  '圣灵',
  '恩典',
  '信心',
  '祷告',
  '苦难',
  '复活',
  '罪',
  '婚姻',
  '教育',
  '十字架',
  '神的旨意',
  '事奉',
];

export const ABOUT_NOTE = [
  '本站是一个独立整理的非官方档案，不是唐崇荣牧师或其机构（STEMI、GRII、RICI）的官方网站。',
  '讲道视频与音频的版权归原讲员及原发布机构所有；本站只整理公开的目录信息、时长与链接。',
  '人物小传、神学主题与语录部分综合自公开著作、讲道与访谈，属于第三方整理，可能存在误差，引用时请回到原始出处。',
  '若你是版权持有人，希望某条内容被更正或移除，请通过页脚的方式联系。',
];
