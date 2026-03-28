// ═══════════════════════════════════
// ACTIVITIES DATABASE (活动数据库)
// ═══════════════════════════════════

const ACTIVITIES_DB = {
  'a1': {
    id: 'a1',
    clubId: 'drama',
    name: '《等待戈多》秋季公演',
    emoji: '🎭',
    category: '公开演出',
    free: '免费',
    heroGradient: 'linear-gradient(145deg,#264653,#1B3A44)',
    
    time: '10月20日 19:00',
    date: '2024年10月20日',
    startTime: '19:00',
    endTime: '21:00',
    venue: '校大礼堂',
    duration: '约2小时',
    
    intro: '贝克特经典荒诞派名作《等待戈多》，由我社核心成员历经三个月排练呈现。本次演出将加入现代视觉设计元素，带来全新的观演体验。欢迎全体同学观看！',
    
    details: [
      { label: '演出类型', value: '话剧' },
      { label: '演出时长', value: '约120分钟' },
      { label: '最大容纳', value: '800人' },
      { label: '导演', value: '李明' }
    ],
    
    highlights: [
      '经典荒诞派作品',
      '专业核心成员演出',
      '现代视觉设计',
      '全校免费观看'
    ]
  },
  
  'a2': {
    id: 'a2',
    clubId: 'photo',
    name: '秋日人像摄影工作坊',
    emoji: '📷',
    category: '工作坊',
    free: '有费用',
    heroGradient: 'linear-gradient(135deg,rgba(233,196,106,.3),rgba(244,162,97,.2))',
    
    time: '10月22日 14:00',
    date: '2024年10月22日',
    startTime: '14:00',
    endTime: '17:30',
    venue: '艺术楼101摄影室',
    duration: '3.5小时',
    price: '¥50/人',
    
    intro: '深秋人像摄影工作坊。学习秋日户外人像摄影的核心技巧，包括光线运用、构图、表情引导等。无需单反相机，手机摄影也欢迎！讲师为校摄影协会金牌导师。',
    
    details: [
      { label: '参与方式', value: '室内讲座 + 户外实践' },
      { label: '人数限制', value: '30人（先报先得）' },
      { label: '设备要求', value: '自带相机或手机即可' },
      { label: '讲师', value: '王晓雨（摄协主席）' }
    ],
    
    highlights: [
      '秋日采风实地拍摄',
      '零基础入门指导',
      '包含样片修图教学',
      '课后免费分享所有范例照片'
    ]
  },
  
  'a3': {
    id: 'a3',
    clubId: 'broadcast',
    name: '秋季广播人选拔',
    emoji: '📻',
    category: '招募',
    free: '免费',
    heroGradient: 'linear-gradient(145deg,rgba(42,157,143,.15),rgba(42,157,143,.08))',
    
    time: '10月24日 19:00',
    date: '2024年10月24日',
    startTime: '19:00',
    endTime: '20:30',
    venue: '综合楼602广播室',
    duration: '约1.5小时',
    
    intro: '广播站2024年秋季播音员、策划、技术岗位选拔。欢迎有好嗓子、热情服务、对广播感兴趣的同学报名参加。报名即赠送精美台历一份！',
    
    details: [
      { label: '招募岗位', value: '播音员/策划/技术/编辑' },
      { label: '选拔方式', value: '现场试镜 + 才艺展示' },
      { label: '参选者数', value: '约50-60人' },
      { label: '录取比例', value: '约30%' }
    ],
    
    highlights: [
      '发展你的主播风采',
      '0基础可参加 - 我们会培训',
      '参与校内电台运营',
      '报名送精美礼物'
    ]
  },
  
  'a4': {
    id: 'a4',
    clubId: 'guitar',
    name: '吉他初级班开课',
    emoji: '🎵',
    category: '教学',
    free: '有费用',
    heroGradient: 'linear-gradient(135deg,rgba(233,196,106,.3),rgba(244,162,97,.2))',
    
    time: '10月28日 19:00',
    date: '2024年10月28日',
    startTime: '19:00',
    endTime: '20:30',
    venue: '音乐楼306教室',
    duration: '共8周，每周1.5小时',
    price: '¥200/人（8周课程）',
    
    intro: '零基础吉他初级班正式开课！由吉他社资深讲师全程指导。从基础乐理、指法练习、和弦转换，到学会弹唱自己喜欢的歌曲，一步步让你成为吉他手。',
    
    details: [
      { label: '课程时长', value: '8周共12小时' },
      { label: '班级人数', value: '最多15人小班教学' },
      { label: '教学内容', value: '从零开始到日常弹唱' },
      { label: '讲师', value: '张浩天（吉他社主席）' }
    ],
    
    highlights: [
      '从零基础到能弹唱',
      '小班制教学 - 充分照顾',
      '提供学习资料和弦谱',
      '结课可参加社团演出'
    ]
  }
};
