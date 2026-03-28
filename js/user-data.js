// ═══════════════════════════════════
// USER DATA (用户交互数据存储)
// ═══════════════════════════════════

const USER_DATA = {
  // 用户收藏的社团
  likes: {
    'drama': true,      // 校园戏剧社
    'broadcast': true   // 校园广播站
  },
  
  // 更新收藏状态
  toggleLike(clubId) {
    if(this.likes[clubId]) {
      delete this.likes[clubId];
    } else {
      this.likes[clubId] = true;
    }
    // 保存到localStorage
    this.save();
    return this.likes[clubId];
  },
  
  // 检查是否收藏
  isLiked(clubId) {
    return !!this.likes[clubId];
  },
  
  // 获取所有收藏的社团ID
  getLikedClubs() {
    return Object.keys(this.likes).filter(clubId => this.likes[clubId]);
  },
  
  // 保存到localStorage
  save() {
    localStorage.setItem('clubmatch_user_data', JSON.stringify(this.likes));
  },
  
  // 从localStorage加载
  load() {
    const saved = localStorage.getItem('clubmatch_user_data');
    if(saved) {
      try {
        this.likes = JSON.parse(saved);
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
