/**
 * 完整社团数据库
 * 包含每个社团的所有信息
 */
const CLUBS_DB = {
  'drama': {
    id: 'drama',
    name: '校园戏剧社',
    emoji: '🎭',
    slogan: '"让每个人都能登上舞台"',
    category: '🎨 艺术',
    verified: true,
    
    // 统计数据
    members: 156,
    history: '3年',
    events: 12,
    rating: '4.9⭐',
    matchPercent: 87,
    
    // 基本信息
    foundingYear: '2021年10月',
    scale: '150+人',
    timeInvestment: '每周3-5小时',
    meetingTime: '每周三晚19:00',
    threshold: '零基础欢迎',
    
    // 长文本
    description: '校园戏剧社成立于2021年，致力于为热爱表演艺术的同学提供一个探索自我、展示才华的舞台。我们每学期举办两次公开演出，并不定期组织工作坊和观剧活动。无论你是零基础还是有表演经验，都真诚欢迎！',
    
    // 部门
    departments: ['演出部', '编剧部', '舞美部', '宣传部'],
    
    // 标签
    tags: ['🎭 舞台表演', '✍️ 剧本创作', '👥 团队协作', '🏆 年度公演', '低门槛', '表达型'],
    
    // 招新信息
    recruitment: {
      title: '2024秋季招募',
      deadline: '10月25日',
      departments: 4,
      quota: 30,
      intro: '全方向开放',
      departmentDetails: {
        '演出部': '参与舞台表演，零基础可学，热情是最重要的',
        '编剧部': '负责剧本创作与改编，喜欢文字表达即可',
        '舞美部': '舞台设计、道具制作，有设计兴趣优先',
        '宣传部': '负责推文、海报、视频，喜欢新媒体运营'
      },
      process: [
        { step: 1, text: '提交在线报名表', deadline: '10月25日前' },
        { step: 2, text: '参加面试/试训', deadline: '10月27-28日' },
        { step: 3, text: '录取结果通知', deadline: '10月30日' }
      ]
    },
    
    // 活动
    activities: ['《等待戈多》秋季公演', '春季剧本工作坊', '表演基础班', '观剧交流会'],
    
    // 链接颜色
    heroGradient: 'linear-gradient(145deg,#264653,#1B3A44)',
    cardBg: 'rgba(231,111,81,.1)'
  },
  
  'photo': {
    id: 'photo',
    name: '摄影协会',
    emoji: '📸',
    slogan: '"记录生活，展览作品"',
    category: '🎨 艺术',
    verified: true,
    
    members: 89,
    history: '2年',
    events: 8,
    rating: '4.7⭐',
    matchPercent: 72,
    
    foundingYear: '2022年9月',
    scale: '80+人',
    timeInvestment: '每周2-3小时',
    meetingTime: '每周二晚18:30',
    threshold: '零基础欢迎',
    
    description: '摄影协会是一个专注于摄影艺术交流的社团。我们提供专业的摄影技能培训和创意分享平台，从基础构图到后期修图，从人像到风景，我们带你发现生活中的美。每月举办采风活动、作品展览和技术分享会。',
    
    departments: ['技术部', '策划部', '宣传部'],
    
    tags: ['📷 摄影技巧', '🌅 风景采风', '👤 人像拍摄', '✏️ 后期修图', '美学', '创意型'],
    
    recruitment: {
      title: '秋季招新 - 摄影爱好者',
      deadline: '10月20日',
      departments: 3,
      quota: 25,
      intro: '热爱摄影的你',
      departmentDetails: {
        '技术部': '教授摄影技巧和后期修图，有相机优先',
        '策划部': '组织采风活动和摄影展览',
        '宣传部': '负责作品展示和社团宣传'
      },
      process: [
        { step: 1, text: '提交作品集和报名表', deadline: '10月20日前' },
        { step: 2, text: '参加面试/试拍', deadline: '10月22-23日' },
        { step: 3, text: '录取结果通知', deadline: '10月25日' }
      ]
    },
    
    activities: ['秋日人像摄影工作坊', '校园风景采风活动', '修图技巧分享', '摄影展览'],
    
    heroGradient: 'linear-gradient(145deg,rgba(233,196,106,.3),rgba(244,162,97,.2))',
    cardBg: 'rgba(233,196,106,.15)'
  },
  
  'coding': {
    id: 'coding',
    name: '计算机协会',
    emoji: '💻',
    slogan: '"编程改变世界"',
    category: '🔬 学术',
    verified: true,
    
    members: 124,
    history: '4年',
    events: 15,
    rating: '4.8⭐',
    matchPercent: 64,
    
    foundingYear: '2020年3月',
    scale: '120+人',
    timeInvestment: '每周5+小时',
    meetingTime: '每周四晚20:00',
    threshold: '有编程基础或强烈兴趣',
    
    description: '计算机协会是学校最大的技术社团。我们组织编程竞赛、开源项目、技术分享会。无论是Web开发、AI、移动应用还是算法优化，这里都有志同道合的伙伴。我们定期举办hackathon、技术讲座和代码评审会。',
    
    departments: ['算法部', '前端部', '后端部', '运维部'],
    
    tags: ['💻 编程技能', '🏆 竞赛参赛', '🔧 项目实战', '🚀 新技术', '有门槛', '职业', '高投入'],
    
    recruitment: {
      title: '新一届成员招募',
      deadline: '10月22日',
      departments: 4,
      quota: 40,
      intro: '计算机协会秋季招新',
      departmentDetails: {
        '算法部': '专注算法优化和竞赛训练',
        '前端部': '开发Web前端和移动应用',
        '后端部': '负责后端开发和数据库设计',
        '运维部': '系统运维和项目基础设施'
      },
      process: [
        { step: 1, text: '提交报名表和项目代码', deadline: '10月22日前' },
        { step: 2, text: '参加技术笔试/面试', deadline: '10月24-25日' },
        { step: 3, text: '新成员名单公布', deadline: '10月28日' }
      ]
    },
    
    activities: ['ACM编程竞赛集训', '开源项目实战', '技术分享论坛', 'Hackathon活动'],
    
    heroGradient: 'linear-gradient(145deg,rgba(231,111,81,.2),rgba(244,162,97,.15))',
    cardBg: 'rgba(231,111,81,.1)'
  },
  
  'green': {
    id: 'green',
    name: '环保公益社',
    emoji: '🌿',
    slogan: '"守护绿色地球"',
    category: '🌱 公益',
    verified: true,
    
    members: 67,
    history: '1年',
    events: 5,
    rating: '4.6⭐',
    matchPercent: 75,
    
    foundingYear: '2023年10月',
    scale: '65+人',
    timeInvestment: '每周2-4小时',
    meetingTime: '每周六下午14:00',
    threshold: '有公益热心',
    
    description: '环保公益社致力于推动校园可持续发展。我们组织垃圾分类推广、校园绿化、环保讲座和社区志愿服务。每参加一次活动，都在为地球做贡献。我们相信，改变始于行动，每个人都可以成为环保卫士。',
    
    departments: ['宣传部', '项目部', '评估部'],
    
    tags: ['♻️ 垃圾分类', '🌍 环保倡导', '🤝 志愿服务', '🌱 绿色校园', '低门槛', '低投入'],
    
    recruitment: {
      title: '环保公益社招新',
      deadline: '10月28日',
      departments: 3,
      quota: 20,
      intro: '加入我们守护地球',
      departmentDetails: {
        '宣传部': '制作环保宣传海报和推文',
        '项目部': '策划和组织环保志愿活动',
        '评估部': '评估和分析项目效果'
      },
      process: [
        { step: 1, text: '提交志愿服务报名', deadline: '10月28日前' },
        { step: 2, text: '参加面试和志愿活动体验', deadline: '10月29-31日' },
        { step: 3, text: '成员名单确认', deadline: '11月2日' }
      ]
    },
    
    activities: ['校园垃圾分类推广', '绿色宿舍建设项目', '环保知识讲座', '清洁校园活动'],
    
    heroGradient: 'linear-gradient(145deg,rgba(42,157,143,.15),rgba(42,157,143,.08))',
    cardBg: 'rgba(42,157,143,.1)'
  },
  
  'guitar': {
    id: 'guitar',
    name: '吉他社',
    emoji: '🎵',
    slogan: '"弦音绕梦"',
    category: '🎨 艺术',
    verified: false,
    
    members: 45,
    history: '2年',
    events: 6,
    rating: '4.5⭐',
    matchPercent: 68,
    
    foundingYear: '2022年5月',
    scale: '45+人',
    timeInvestment: '每周3小时',
    meetingTime: '每周一、三晚19:00',
    threshold: '零基础可学',
    
    description: '吉他社是音乐爱好者的乐园。我们教授吉他弹奏和音乐理论，从C大调到高级指弹，从《同桌的你》到《演员》，我们的讲师会一步步教你成为吉他手。定期举办小型音乐会、音乐节和弹唱表演会。',
    
    departments: ['教学部', '表演部', '宣传部'],
    
    tags: ['🎸 吉他教学', '🎵 弹唱表演', '🎼 音乐理论', '🎼 乐器', '低门槛', '放松型'],
    
    recruitment: {
      title: '吉他社新学员招募',
      deadline: '10月25日',
      departments: 3,
      quota: 15,
      intro: '招募热爱音乐的你',
      departmentDetails: {
        '教学部': '担任吉他班讲师或助教',
        '表演部': '参与学期汇演和音乐节',
        '宣传部': '负责社团活动宣传'
      },
      process: [
        { step: 1, text: '提交报名表', deadline: '10月25日前' },
        { step: 2, text: '参加面试（弹奏演示/笔试）', deadline: '10月26-27日' },
        { step: 3, text: '录取名单公布', deadline: '10月29日' }
      ]
    },
    
    activities: ['初级吉他班开课', '弹唱表演会', '音乐理论工作坊', '校园音乐节'],
    
    heroGradient: 'linear-gradient(145deg,rgba(233,196,106,.3),rgba(244,162,97,.2))',
    cardBg: 'rgba(233,196,106,.15)'
  },
  
  'broadcast': {
    id: 'broadcast',
    name: '校园广播站',
    emoji: '📻',
    slogan: '"声音传递温暖"',
    category: '💼 职业',
    verified: true,
    
    members: 32,
    history: '5年',
    events: 20,
    rating: '4.9⭐',
    matchPercent: 71,
    
    foundingYear: '2019年9月',
    scale: '30+人',
    timeInvestment: '每周4-6小时',
    meetingTime: '每周一至五 中午12:00',
    threshold: '有播音或编辑经验优先',
    
    description: '校园广播站是学校最具影响力的媒体平台。我们制作校园新闻、主持校园人物故事、播放校园音乐。每天陪伴全校师生。欢迎成为出镜主播或幕后制作人，在这个舞台上展现你的才华。',
    
    departments: ['播音部', '编辑部', '技术部', '外联部'],
    
    tags: ['🎙️ 播音主持', '📝 新闻编辑', '🎧 音乐推荐', '🎬 视频制作', '职业', '传播型'],
    
    recruitment: {
      title: '秋季主播和编辑招募',
      deadline: '10月15日',
      departments: 4,
      quota: 12,
      intro: '校园广播站秋季主播和编辑招募',
      departmentDetails: {
        '播音部': '担任校园广播主播，播读校园新闻和音乐',
        '编辑部': '编写校园新闻稿和节目剧本',
        '技术部': '负责录音、混音和视频制作',
        '外联部': '联系各部门获取新闻素材'
      },
      process: [
        { step: 1, text: '提交报名表和作品', deadline: '10月15日前' },
        { step: 2, text: '参加面试（播音/笔试）', deadline: '10月16-17日' },
        { step: 3, text: '录取名单公布', deadline: '10月19日' }
      ]
    },
    
    activities: ['秋季广播人选拔', '新闻播报节目', '校园人物专访', '音乐推荐栏目'],
    
    heroGradient: 'linear-gradient(145deg,rgba(42,157,143,.2),rgba(38,70,83,.15))',
    cardBg: 'rgba(42,157,143,.1)'
  },
  
  'debate': {
    id: 'debate',
    name: '辩论队',
    emoji: '🏆',
    slogan: '"思辨引领未来"',
    category: '💼 职业',
    verified: true,
    
    members: 28,
    history: '3年',
    events: 10,
    rating: '4.7⭐',
    matchPercent: 55,
    
    foundingYear: '2021年9月',
    scale: '28人',
    timeInvestment: '每周6+小时',
    meetingTime: '每周二、四、六晚20:00',
    threshold: '有辩论经验或强烈兴趣',
    
    description: '校园辩论队参加各类校际辩论赛。我们打造逻辑清晰、表达有力的辩手。通过辩论，你将学会分析问题、说服他人。这是一个充满挑战和成就感的平台，也是锻炼思维和表达的最佳选择。',
    
    departments: [],
    
    tags: ['🗣️ 辩术训练', '🏆 竞赛参赛', '💭 思辨能力', '📢 表达能力', '有门槛', '竞争型', '高投入'],
    
    recruitment: {
      title: '新赛季招募',
      deadline: '10月20日',
      departments: 0,
      quota: 10,
      intro: '辩论队新赛季招募',
      departmentDetails: {
        '统一招募': '不分具体部门，通过面试后统一参加集训'
      },
      process: [
        { step: 1, text: '提交报名表', deadline: '10月20日前' },
        { step: 2, text: '参加辩论面试（现场命题）', deadline: '10月21-22日' },
        { step: 3, text: '新赛手名单公布', deadline: '10月24日' }
      ]
    },
    
    activities: ['校际辩论邀请赛参赛', '辩题研讨工作坊', '内部友谊赛', '辩手训练营'],
    
    heroGradient: 'linear-gradient(145deg,rgba(231,111,81,.2),rgba(244,162,97,.15))',
    cardBg: 'rgba(231,111,81,.1)'
  },
  
  'literature': {
    id: 'literature',
    name: '校园文学社',
    emoji: '📰',
    slogan: '"文字承载梦想"',
    category: '🎨 艺术',
    verified: false,
    
    members: 56,
    history: '2年',
    events: 4,
    rating: '4.6⭐',
    matchPercent: 69,
    
    foundingYear: '2022年10月',
    scale: '55+人',
    timeInvestment: '每周2-3小时',
    meetingTime: '每周五晚18:00',
    threshold: '热爱写作',
    
    description: '校园文学社是文学爱好者的精神家园。我们发布文学作品、组织诗歌朗诵会、出版校园刊物。无论是诗歌、散文还是小说，这里是展现你才华的舞台。我们相信，文字有温度，故事有力量。',
    
    departments: ['创作部', '编辑部', '宣传部'],
    
    tags: ['✍️ 创意写作', '📖 诗歌朗诵', '📚 文学评论', '📰 校园刊物', '低门槛', '创意型'],
    
    recruitment: {
      title: '招新 - 寻找创意作者',
      deadline: '10月25日',
      departments: 3,
      quota: 18,
      intro: '文学社诚招有才华的创意作者',
      departmentDetails: {
        '创作部': '创作诗歌、散文、小说等文学作品',
        '编辑部': '编辑和审校文学社刊物',
        '宣传部': '组织朗诵会和文学活动'
      },
      process: [
        { step: 1, text: '提交报名表和作品', deadline: '10月25日前' },
        { step: 2, text: '参加面试（朗诵/笔试）', deadline: '10月26-27日' },
        { step: 3, text: '新成员名单确认', deadline: '10月30日' }
      ]
    },
    
    activities: ['诗歌朗诵会', '创意写作工作坊', '校园文学刊物出版', '写作技巧讲座'],
    
    heroGradient: 'linear-gradient(145deg,rgba(231,111,81,.2),rgba(244,162,97,.15))',
    cardBg: 'rgba(231,111,81,.1)'
  }
};
