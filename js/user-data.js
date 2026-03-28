// ═══════════════════════════════════
// USER DATA (用户交互数据存储)
// ═══════════════════════════════════

const USER_DATA = {
  // 用户收藏的社团和活动
  likes: {
    'drama': true,      // 校园戏剧社
    'broadcast': true   // 校园广播站
  },
  
  // 用户提交的问题记录
  questions: [],
  
  // 匹配测试相关
  matchAnswers: {}, // { q1: '答案', q2: [...多选], q3: '答案', q4: '答案', customAnswers: {...} }
  matchResult: null, // 匹配结果 { clubs: [{clubId, name, score, reason},...], userProfile: {...}, timestamp }
  matchHistory: [], // 历史测试记录
  
  // 获取用户是否已完成匹配测试
  isMatchCompleted() {
    return this.matchResult !== null && Object.keys(this.matchAnswers).length > 0;
  },
  
  // 保存匹配答案
  saveMatchAnswers(answers) {
    this.matchAnswers = answers;
    this.save();
  },
  
  // 保存匹配结果（包含用户画像）
  saveMatchResult(result) {
    const testResult = {
      ...result,
      answers: this.matchAnswers, // 保存当时的答案
      timestamp: new Date().getTime(),
      testId: 'match_' + new Date().getTime() // 唯一测试ID
    };
    
    this.matchResult = testResult;
    
    // 添加到历史记录
    if(!this.matchHistory) this.matchHistory = [];
    this.matchHistory.push(testResult);
    
    // 只保留最近20条记录
    if(this.matchHistory.length > 20) {
      this.matchHistory = this.matchHistory.slice(-20);
    }
    
    this.save();
  },
  
  // 清除匹配数据（重新测试）
  clearMatchData() {
    this.matchAnswers = {};
    this.matchResult = null;
    this.save();
  },

  // 获取匹配测试历史
  getMatchHistory() {
    return this.matchHistory || [];
  },

  // 切换收藏状态
  toggleLike(id) {
    if(this.likes[id]) {
      delete this.likes[id];
    } else {
      this.likes[id] = true;
    }
    // 保存到localStorage
    this.save();
    return this.likes[id];
  },
  
  // 检查是否收藏
  isLiked(id) {
    return !!this.likes[id];
  },
  
  // 获取所有收藏的社团ID
  getLikedClubs() {
    return Object.keys(this.likes).filter(id => this.likes[id] && CLUBS_DB[id]);
  },
  
  // 获取所有收藏的活动ID
  getLikedActivities() {
    return Object.keys(this.likes).filter(id => this.likes[id] && ACTIVITIES_DB[id]);
  },
  
  // 添加用户提问
  addQuestion(clubId, questionText) {
    const question = {
      clubId: clubId,
      clubName: CLUBS_DB[clubId]?.name || '未知社团',
      emoji: CLUBS_DB[clubId]?.emoji || '❓',
      text: questionText,
      time: new Date().getTime(),
      status: 'pending' // pending: 等待回复, replied: 已回复
    };
    this.questions.unshift(question); // 新问题放在最前面
    this.save();
    return question;
  },
  
  // 获取用户提问
  getQuestions() {
    return this.questions || [];
  },
  
  // 保存到localStorage
  save() {
    const data = {
      likes: this.likes,
      questions: this.questions || [],
      matchAnswers: this.matchAnswers || {},
      matchResult: this.matchResult || null,
      matchHistory: this.matchHistory || []
    };
    localStorage.setItem('clubmatch_user_data', JSON.stringify(data));
  },
  
  // 从localStorage加载
  load() {
    const saved = localStorage.getItem('clubmatch_user_data');
    if(saved) {
      try {
        const data = JSON.parse(saved);
        this.likes = data.likes || {};
        this.questions = []; // 清空提问历史
        this.matchAnswers = data.matchAnswers || {};
        this.matchResult = data.matchResult || null;
        this.matchHistory = data.matchHistory || [];
      } catch(e) {
        console.error('Failed to load user data:', e);
      }
    }
  }
};

// 页面加载时自动加载用户数据
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => USER_DATA.load());
} else {
  USER_DATA.load();
}
