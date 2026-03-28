/* ═══════════════════════════════════
   DATA STRUCTURE
═══════════════════════════════════ */
const DATA = {
  clubs: {
    'drama': {
      id:'drama', name:'校园戏剧社', emoji:'🎭', slogan:'"让每个人都能登上舞台"', category:'🎨 艺术', 
      members:156, history:'3年', events:12, rating:'4.9⭐',
      founding:'2021年10月', scale:'150+', timeEnrollment:'每周3-5小时', threshold:'零基础欢迎',
      description:'校园戏剧社致力于为热爱表演艺术的同学提供舞台。我们排演了《等待戈多》、《相见恨晚》等经典作品，参加过校园文化节和多次汇演。无论你是表演爱好者还是幕后工作者，这里都有你的位置。',
      activities:['《等待戈多》秋季公演', '春季剧本工坊', '表演基础班'],
      departments:['演出部', '编剧部', '舞美部', '宣传部'],
      tags:['表演', '创意', '团队合作', '文艺'],
      recruitment:{title:'2024秋季招募', deadline:'10月25日', departments:4, quota:30}
    },
    'photo': {
      id:'photo', name:'摄影协会', emoji:'📸', slogan:'"记录生活，展览作品"', category:'🎨 艺术',
      members:89, history:'2年', events:8, rating:'4.7⭐',
      founding:'2022年9月', scale:'80+', timeEnrollment:'每周2-3小时', threshold:'零基础欢迎',
      description:'摄影协会提供专业的摄影技能培训和创意分享平台。从基础构图到后期修图，我们带你发现生活中的美。每月举办采风活动和作品展览。',
      activities:['秋日人像摄影工作坊', '校园风景采风活动', '修图技巧分享'],
      departments:['技术部', '策划部', '宣传部'],
      tags:['摄影', '艺术', '创意', '技能'],
      recruitment:{title:'秋季招新-摄影爱好者', deadline:'10月20日', departments:3, quota:25}
    },
    'coding': {
      id:'coding', name:'计算机协会', emoji:'💻', slogan:'"编程改变世界"', category:'🔬 学术',
      members:124, history:'4年', events:15, rating:'4.8⭐',
      founding:'2020年3月', scale:'120+', timeEnrollment:'每周5+小时', threshold:'有编程基础或强烈兴趣',
      description:'计算机协会是学校最大的技术社团。我们组织编程竞赛、开源项目、技术分享会。无论是AI、Web开发还是算法优化，这里都有志同道合的伙伴。',
      activities:['ACM编程竞赛集训', '开源项目实战', '技术分享论坛'],
      departments:['算法部', '前端部', '后端部', '运维部'],
      tags:['编程', '技术', '竞赛', '职业'],
      recruitment:{title:'计算机协会新一届成员招募', deadline:'10月22日', departments:4, quota:40}
    },
    'green': {
      id:'green', name:'环保公益社', emoji:'🌿', slogan:'"守护绿色地球"', category:'🌱 公益',
      members:67, history:'1年', events:5, rating:'4.6⭐',
      founding:'2023年10月', scale:'65+', timeEnrollment:'每周2-4小时', threshold:'有公益热心',
      description:'环保公益社致力于推动校园可持续发展。我们组织垃圾分类活动、校园绿化、环保讲座。每参加一次活动，都在为地球做贡献。',
      activities:['校园垃圾分类推广', '绿色宿舍建设项目', '环保知识讲座'],
      departments:['宣传部', '项目部', '评估部'],
      tags:['公益', '环保', '社会责任', '低投入'],
      recruitment:{title:'环保公益社招新', deadline:'10月28日', departments:3, quota:20}
    },
    'guitar': {
      id:'guitar', name:'吉他社', emoji:'🎵', slogan:'"弦音绕梦"', category:'🎨 艺术',
      members:45, history:'2年', events:6, rating:'4.5⭐',
      founding:'2022年5月', scale:'45+', timeEnrollment:'每周3小时', threshold:'零基础可学',
      description:'吉他社教授吉他弹奏和音乐理论。从C调到高级指弹，从《同桌的你》到《演员》，我们的讲师会一步步教你成为吉他手。定期举办小型音乐会。',
      activities:['初级吉他班开课', '弹唱表演会', '音乐理论工坊'],
      departments:['教学部', '表演部', '宣传部'],
      tags:['音乐', '乐器', '才艺', '放松'],
      recruitment:{title:'吉他社新学员招募', deadline:'10月25日', departments:3, quota:15}
    },
    'broadcast': {
      id:'broadcast', name:'校园广播站', emoji:'📻', slogan:'"声音传递温暖"', category:'💼 职业',
      members:32, history:'5年', events:20, rating:'4.9⭐',
      founding:'2019年9月', scale:'30+', timeEnrollment:'每周4-6小时', threshold:'有播音或编辑经验优先',
      description:'校园广播站是学校最具影响力的媒体平台。我们制作校园新闻、主持校园人物故事、播放校园音乐。欢迎成为出镜主播或幕后制作人。',
      activities:['新闻播报节目', '校园人物专访', '音乐推荐栏目'],
      departments:['播音部', '编辑部', '技术部', '外联部'],
      tags:['媒体', '表达', '传播', '职业'],
      recruitment:{title:'校园广播站秋季主播和编辑招募', deadline:'10月15日', departments:4, quota:12}
    },
    'debate': {
      id:'debate', name:'辩论队', emoji:'🏆', slogan:'"思辨引领未来"', category:'💼 职业',
      members:28, history:'3年', events:10, rating:'4.7⭐',
      founding:'2021年9月', scale:'28', timeEnrollment:'每周6+小时', threshold:'有辩论经验或强烈兴趣',
      description:'校园辩论队参加各类校际辩论赛。我们打造逻辑清晰、表达有力的辩手。通过辩论，你将学会分析问题、说服他人。这是一个充满挑战和成就感的平台。',
      activities:['校际辩论邀请赛参赛', '辩题研讨工作坊', '内部友谊赛'],
      departments:['正方组', '反方组', '评委组', '宣传组'],
      tags:['竞赛', '思辨', '表达', '职业'],
      recruitment:{title:'辩论队新赛季招募', deadline:'10月20日', departments:4, quota:10}
    },
    'literature': {
      id:'literature', name:'校园文学社', emoji:'📰', slogan:'"文字承载梦想"', category:'🎨 艺术',
      members:56, history:'2年', events:4, rating:'4.6⭐',
      founding:'2022年10月', scale:'55+', timeEnrollment:'每周2-3小时', threshold:'热爱写作',
      description:'校园文学社是文学爱好者的精神家园。我们发布文学作品、组织诗歌朗诵会、出版校园刊物。无论是诗歌、散文还是小说，这里是展现你才华的舞台。',
      activities:['诗歌朗诵会', '创意写作工坊', '校园文学刊物出版'],
      departments:['创作部', '编辑部', '宣传部'],
      tags:['文学', '写作', '创意', '表达'],
      recruitment:{title:'文学社招新-寻找创意作者', deadline:'10月25日', departments:3, quota:18}
    },
  },
  activities: {
    'a1': {id:'a1', clubId:'drama', name:'《等待戈多》秋季公演', emoji:'🎭', category:'公开演出', free:'免费'},
    'a2': {id:'a2', clubId:'photo', name:'秋日人像摄影工作坊', emoji:'📷', category:'工作坊', free:'有费用'},
    'a3': {id:'a3', clubId:'broadcast', name:'秋季广播人选拔', emoji:'📻', category:'招募', free:'免费'},
    'a4': {id:'a4', clubId:'guitar', name:'吉他初级班开课', emoji:'🎵', category:'教学', free:'有费用'},
  },
  userAuthRequests: {
    // 存储用户的认证申请信息
  },
  user: {
    // 登录状态
    isLoggedIn: true,
    userId: 'user_001',
    userName: '林晓雨',
    email: 'xiaoyulin@university.edu',
    
    // 身份
    identity: 'student', // 'guest'|'student'|'admin', current mode
    adminClubs: ['drama'], // clubs where user is admin
    
    // 认证状态
    authStatus: 'approved', // 'none'|'pending'|'approved'|'rejected'
    authRequestDate: '2024-10-01',
    
    // 权限
    canCollect: true,      // 是否能收藏
    canApply: true,        // 是否能报名
    canMessage: true,      // 是否能提问
    canPublish: true,      // 仅admin:发布招新
    canManage: true,       // 仅admin:管理社团
    
    // 个人数据
    collectedClubs: ['drama', 'broadcast', 'photo'],
    appliedClubs: ['drama'],
    browsingHistory: ['drama', 'photo', 'broadcast'],
  }
};

let currentContext = {
  clubId: null,
  activityId: null,
  messageTarget: null, // which club the message is from
};
