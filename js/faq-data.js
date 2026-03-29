// FAQ/留言管理数据
const FAQ_DB = {
  'faq1': { type: 'preset', question: '零基础可以加入吗？', answer: '完全可以！我们欢迎所有对表演感兴趣的同学，会在新成员培训中从基础开始。', status: 'preset' },
  'faq2': { type: 'preset', question: '排练时间如何安排？', answer: '固定每周三晚19:00-21:00，演出季会增加额外排练时间，会提前通知。', status: 'preset' },
  
  'msg1': { type: 'message', name: '王小雯', question: '请问排练时间如何安排？', status: 'pending', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'msg2': { type: 'message', name: '匿名同学', question: '男生也可以报名吗？', status: 'pending', avatar: '🙋', bgColor: 'rgba(233,196,106,.15)' },
  'msg3': { type: 'message', name: '陈瑞', question: '编剧部需要写过剧本吗？', status: 'replied', avatar: '👨', bgColor: 'rgba(38,70,83,.08)' },
  'msg4': { type: 'message', name: '黄思勤', question: '什么时候开始招新？', status: 'replied', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'msg5': { type: 'message', name: '周天行', question: '可以只参加演出部吗？', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'msg6': { type: 'message', name: '许靖宇', question: '社团活动频率高吗？', status: 'pending', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' },
  'msg7': { type: 'message', name: '林思语', question: '报名后什么时候通知结果？', status: 'replied', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'msg8': { type: 'message', name: '孙浩然', question: '社团是否有年费？', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'msg9': { type: 'message', name: '易思琪', question: '大二还能加入吗？', status: 'replied', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'msg10': { type: 'message', name: '戴明珠', question: '舞美部负责什么工作？', status: 'pending', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' }
};

// 获取FAQ统计
function getFAQStats() {
  const stats = {
    total: 0,
    pending: 0,
    replied: 0
  };
  
  Object.values(FAQ_DB).forEach(item => {
    if(item.type === 'message') {
      stats.total++;
      if(item.status === 'pending') stats.pending++;
      else if(item.status === 'replied') stats.replied++;
    }
  });
  
  return stats;
}

// 按状态过滤留言
function filterFAQByStatus(status) {
  const messages = Object.entries(FAQ_DB).filter(([id, item]) => item.type === 'message');
  
  if(status === 'all') return messages;
  
  return messages.filter(([id, item]) => item.status === status);
}

// 按名字搜索留言
function searchFAQByName(keyword) {
  const messages = Object.entries(FAQ_DB).filter(([id, item]) => item.type === 'message');
  
  if(!keyword.trim()) return messages;
  
  const lowerKeyword = keyword.toLowerCase();
  return messages.filter(([id, item]) => 
    item.name.toLowerCase().includes(lowerKeyword) ||
    item.question.toLowerCase().includes(lowerKeyword)
  );
}
