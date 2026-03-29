// 管理员消息数据 - 广播社
const MESSAGES_MANAGER_DB = [
  {
    id: 'msg1',
    type: 'message',
    from: '系统通知',
    title: '回复：零基础可以加入吗？',
    targetUser: '王小雯',
    timestamp: '今天 14:32',
    icon: '📝',
    status: 'sent', // sent, draft
    category: 'reply',
    conversation: [
      { role: 'user', text: '我想加入广播站，但零基础可以报名吗？需要多少时间投入呢？', time: '今天 10:15' },
      { role: 'admin', text: '完全可以！我们特别欢迎零基础的同学💪 热情比经验重要得多。固定每周一至五中午12:00集中，其他时间很灵活。新成员会有完整的培训过程哦～', time: '今天 14:32' }
    ]
  },
  {
    id: 'msg2',
    type: 'announcement',
    from: '校园广播站',
    title: '关注我们的公众号',
    timestamp: '昨天 09:15',
    icon: '📱',
    status: 'sent',
    category: 'official',
    conversation: [
      { role: 'admin', text: '想了解更多广播站资讯？关注我们的微信公众号【校园之声】，获取最新招新信息、节目推荐和精选主播故事！订阅号ID：gz_voice2024', time: '昨天 09:15' }
    ]
  },
  {
    id: 'msg3',
    type: 'message',
    from: '系统通知',
    title: '回复：招新还需要什么其他条件吗？',
    targetUser: '陈思语',
    timestamp: '昨天 16:48',
    icon: '💬',
    status: 'sent',
    category: 'reply',
    conversation: [
      { role: 'user', text: '请问招新还需要什么其他条件吗？', time: '昨天 14:20' },
      { role: 'admin', text: '没有其他硬性要求啦！只要你对播音、编辑或视频制作感兴趣就欢迎报名。我们会在面试中进一步了解你。如果有任何疑问，欢迎扫码加我们的答疑群～', time: '昨天 16:48' }
    ]
  }
];

// 按类型获取消息
function getManagerMessagesByType(type) {
  return MESSAGES_MANAGER_DB.filter(msg => msg.category === type);
}

// 获取所有已发送消息
function getManagerMessagesSent() {
  return MESSAGES_MANAGER_DB.filter(msg => msg.status === 'sent');
}

// 获取草稿消息
function getManagerMessagesDraft() {
  return MESSAGES_MANAGER_DB.filter(msg => msg.status === 'draft');
}
