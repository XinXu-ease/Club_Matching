/* ═══════════════════════════════════
   NAVIGATION ENGINE
═══════════════════════════════════ */
const history_stack = ['s-welcome'];
let current = 's-welcome';

// screens that hide bottom nav
const NO_NAV = new Set(['s-welcome','s-apply-success']);
// screens with dark status bar
const DARK_SB = new Set(['s-welcome','s-club','s-match-guide','s-match-result','s-manage','s-profile','s-profile-admin']);

// Identity-based screen routing
const IDENTITY_SCREENS = {
  'student': 'nav-match', // shows Match in nav
  'admin': 'nav-manage', // shows Manage in nav
};

function go(id, context = {}){
  if(id === current && !context.clubId) return;
  
  // Update context if provided
  if(context.clubId) currentContext.clubId = context.clubId;
  if(context.activityId) currentContext.activityId = context.activityId;
  if(context.messageTarget) currentContext.messageTarget = context.messageTarget;
  
  // Set default values if needed
  if((id === 's-recruit' || id === 's-msg-detail') && !currentContext.clubId){
    currentContext.clubId = 'drama'; // default to drama club
  }
  
  const from = document.getElementById(current);
  const to   = document.getElementById(id);
  if(!to) return;

  from.classList.remove('active');
  to.classList.remove('slide-back');
  to.classList.add('active');

  history_stack.push(id);
  current = id;
  updateChrome(id);
  updatePageContent(id);
  to.scrollTop = 0;
}

function back(){
  if(history_stack.length <= 1) return;
  history_stack.pop();
  const prev = history_stack[history_stack.length - 1];
  
  const from = document.getElementById(current);
  const to   = document.getElementById(prev);
  if(!to) return;

  from.classList.remove('active');
  to.classList.add('slide-back','active');
  setTimeout(()=>to.classList.remove('slide-back'),50);

  current = prev;
  updateChrome(prev);
  updatePageContent(prev);
}

function navGo(id, navId){
  // clear history to root level
  history_stack.length = 1;
  history_stack[0] = id;
  go(id);
  document.querySelectorAll('.nv').forEach(n=>n.classList.remove('active'));
  document.getElementById(navId)?.classList.add('active');
}

// Update page content based on context
function updatePageContent(id){
  if(id === 's-club' && currentContext.clubId){
    updateClubPage(currentContext.clubId);
  } else if(id === 's-recruit' && currentContext.clubId){
    updateRecruitPage(currentContext.clubId);
  } else if(id === 's-apply' && currentContext.clubId){
    updateApplyPage(currentContext.clubId);
  } else if(id === 's-activity' && currentContext.activityId){
    updateActivityPage(currentContext.activityId);
  } else if(id === 's-msg-detail' && currentContext.messageTarget){
    updateMessagePage(currentContext.messageTarget);
  }
}

function updateClubPage(clubId){
  const club = DATA.clubs[clubId];
  if(!club) return;
  
  const clubScreen = document.getElementById('s-club');
  if(clubScreen){
    // 更新基础信息
    clubScreen.querySelector('.club-name-lg').textContent = club.name;
    clubScreen.querySelector('.club-slogan').textContent = club.slogan;
    clubScreen.querySelector('.club-hero-emoji').textContent = club.emoji;
    clubScreen.querySelectorAll('.cstat-val')[0].textContent = club.members;
    clubScreen.querySelectorAll('.cstat-val')[1].textContent = club.history;
    clubScreen.querySelectorAll('.cstat-val')[2].textContent = club.events + '次';
    clubScreen.querySelectorAll('.cstat-val')[3].textContent = club.rating;
    
    // 更新详细信息部分
    const infoBlocks = clubScreen.querySelectorAll('.info-block');
    
    // 基础信息
    const basicInfoEl = clubScreen.querySelector('.club-info-basic');
    if(basicInfoEl) {
      basicInfoEl.innerHTML = `
        <div class="ig-item"><div class="ig-lb">成立时间</div><div class="ig-val">${club.founding || '2021年'}</div></div>
        <div class="ig-item"><div class="ig-lb">社团规模</div><div class="ig-val">${club.scale || '100+'}</div></div>
        <div class="ig-item"><div class="ig-lb">时间投入</div><div class="ig-val">${club.timeEnrollment || '每周3小时'}</div></div>
        <div class="ig-item"><div class="ig-lb">加入门槛</div><div class="ig-val">${club.threshold || '零基础'}</div></div>
      `;
    }
    
    // 社团简介
    const descEl = clubScreen.querySelector('.club-description');
    if(descEl) {
      descEl.textContent = club.description;
    }
    
    // 部门信息
    const deptEl = clubScreen.querySelector('.club-departments');
    if(deptEl && club.departments) {
      deptEl.innerHTML = club.departments.map(d => 
        `<div style="background:var(--off);border-radius:12px;padding:12px 14px">
          <div style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px">${d}</div>
        </div>`
      ).join('');
    }
    
    // 标签
    const tagsEl = clubScreen.querySelector('.club-tags');
    if(tagsEl && club.tags) {
      tagsEl.innerHTML = club.tags.map(t => 
        `<div class="mini-tag">${t}</div>`
      ).join('');
    }
    
    // 招新信息
    const recruitEl = clubScreen.querySelector('.club-recruit-info');
    if(recruitEl && club.recruitment) {
      recruitEl.innerHTML = `
        <div class="ig-item"><div class="ig-lb">招新标题</div><div class="ig-val">${club.recruitment.title}</div></div>
        <div class="ig-item"><div class="ig-lb">截止日期</div><div class="ig-val" style="color:var(--coral);font-weight:600">${club.recruitment.deadline}</div></div>
        <div class="ig-item"><div class="ig-lb">开放部门</div><div class="ig-val">${club.recruitment.departments}个</div></div>
        <div class="ig-item"><div class="ig-lb">招募人数</div><div class="ig-val">约${club.recruitment.quota}人</div></div>
      `;
    }
    
    // 更新招新和提问按钮
    const recruitBtns = clubScreen.querySelectorAll('.cta-bar');
    if(recruitBtns.length > 0) {
      const msgBtn = recruitBtns[0].querySelector('[onclick*="message"]');
      const applyBtn = recruitBtns[0].querySelector('[onclick*="apply"]');
      if(msgBtn) msgBtn.onclick = () => guardedAction('message', () => goToClubFromMessage(clubId));
      if(applyBtn) applyBtn.onclick = () => guardedAction('apply', () => go('s-recruit', {clubId: clubId}));
    }
  }
}

function updateRecruitPage(clubId){
  const club = DATA.clubs[clubId];
  if(!club) return;
  
  const recruitScreen = document.getElementById('s-recruit');
  if(recruitScreen && club.recruitment){
    // 更新顶部信息
    const headerEls = recruitScreen.querySelectorAll('.recruit-emoji');
    headerEls.forEach(el => el.textContent = club.emoji);
    
    const orgEls = recruitScreen.querySelectorAll('.recruit-org');
    orgEls.forEach(el => el.textContent = club.name);
    
    // 更新招新公告详情
    const titleEl = recruitScreen.querySelector('div[style*="font-size:18px"]');
    if(titleEl) titleEl.textContent = club.recruitment.title;
    
    // 更新详细信息
    const infoGrids = recruitScreen.querySelectorAll('.info-grid');
    if(infoGrids.length > 0) {
      infoGrids[0].innerHTML = `
        <div class="ig-item"><div class="ig-lb">截止日期</div><div class="ig-val" style="color:var(--coral);font-weight:600">${club.recruitment.deadline}</div></div>
        <div class="ig-item"><div class="ig-lb">招募方向</div><div class="ig-val">${club.recruitment.departments}个部门</div></div>
        <div class="ig-item"><div class="ig-lb">门槛要求</div><div class="ig-val">${club.threshold || '零基础欢迎'}</div></div>
        <div class="ig-item"><div class="ig-lb">招募人数</div><div class="ig-val">约${club.recruitment.quota}人</div></div>
      `;
    }
    
    // 更新开放部门 - 找到包含"开放部门"的 info-block
    const infoBlocks = recruitScreen.querySelectorAll('.info-block');
    let deptBlock = null;
    infoBlocks.forEach(block => {
      const title = block.querySelector('.ib-title');
      if(title && title.textContent.includes('开放部门')) {
        deptBlock = block;
      }
    });
    
    if(deptBlock && club.departments) {
      const deptContainer = deptBlock.querySelector('div[style*="flex-direction:column"]');
      if(deptContainer) {
        deptContainer.innerHTML = club.departments.map(d => 
          `<div style="background:var(--off);border-radius:12px;padding:12px 14px">
            <div style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px">🎯 ${d}</div>
            <div style="font-size:12px;color:var(--text2)">${d}欢迎感兴趣的同学加入</div>
          </div>`
        ).join('');
      }
    }
    
    // 更新按钮
    const ctaBtns = recruitScreen.querySelector('.cta-bar');
    if(ctaBtns) {
      const msgBtn = ctaBtns.querySelector('[onclick*="messageTarget"]') || ctaBtns.querySelector('div:first-child');
      const applyBtn = ctaBtns.querySelector('[onclick*="apply"]') || ctaBtns.querySelector('div:last-child');
      if(msgBtn) msgBtn.onclick = () => guardedAction('message', () => goToClubFromMessage(clubId));
      if(applyBtn) applyBtn.onclick = () => guardedAction('apply', () => go('s-apply'));
    }
  }
}

function updateApplyPage(clubId){
  const club = DATA.clubs[clubId];
  if(!club) return;
  
  const applyScreen = document.getElementById('s-apply');
  if(applyScreen){
    // 更新用户信息头
    const applyTarget = applyScreen.querySelector('.apply-target');
    if(applyTarget){
      const emoji = applyTarget.querySelector('.apply-target-emoji');
      const name = applyTarget.querySelector('.apply-target-name');
      const sub = applyTarget.querySelector('.apply-target-sub');
      if(emoji) emoji.textContent = club.emoji;
      if(name) name.textContent = club.recruitment.title;
      if(sub) sub.textContent = club.name;
    }
  }
}

function updateActivityPage(activityId){
  const activity = DATA.activities[activityId];
  if(!activity) return;
  
  const actScreen = document.getElementById('s-activity');
  if(actScreen){
    const club = DATA.clubs[activity.clubId];
    // Update hero emoji
    const heroEl = actScreen.querySelector('.act-hero');
    heroEl.textContent = activity.emoji;
    if(activity.clubId === 'drama') heroEl.style.background = 'linear-gradient(145deg,#264653,#1B3A44)';
    else heroEl.style.background = `linear-gradient(145deg, ${['photo','guitar','literature'].includes(activity.clubId) ? 'rgba(233,196,106,.3),rgba(244,162,97,.2)' : 'rgba(42,157,143,.15),rgba(42,157,143,.08)'})`;
    
    // Update tags
    const tags = actScreen.querySelectorAll('.tag');
    if(tags.length >= 2){
      tags[0].textContent = activity.category;
      tags[1].textContent = activity.free === '免费' ? '免费' : '收费';
    }
    
    // Update title and club name
    const titleEls = actScreen.querySelectorAll('div[style*="font-size:22px"]');
    if(titleEls.length > 0){
      titleEls[0].textContent = activity.name;
    }
    
    // Update club link
    const clubLinks = actScreen.querySelectorAll('div[style*="font-size:13px"][style*="color"]');
    if(clubLinks.length > 0){
      clubLinks[0].textContent = club.name + ' ›';
      clubLinks[0].onclick = () => go('s-club', {clubId: activity.clubId});
    }
  }
}

function updateMessagePage(clubId){
  const club = DATA.clubs[clubId];
  if(!club) return;
  
  const msgScreen = document.getElementById('s-msg-detail');
  if(msgScreen){
    msgScreen.querySelector('.msgd-avatar').textContent = club.emoji;
    msgScreen.querySelector('.msgd-name').textContent = club.name;
  }
}

function updateChrome(id){
  const sb = document.getElementById('statusbar');
  const bn = document.getElementById('bottomnav');
  // status bar
  if(DARK_SB.has(id)){ sb.className='sb-dark'; }
  else { sb.className='sb-light'; }
  // bottom nav
  if(NO_NAV.has(id)){ bn.style.display='none'; }
  else { bn.style.display='flex'; }
  
  // Show/hide nav-match and nav-manage based on current screen
  const adminScreens = ['s-manage','s-edit-club','s-publish','s-applications','s-stats','s-faq','s-profile-admin'];
  const navMatch = document.getElementById('nav-match');
  const navManage = document.getElementById('nav-manage');
  if(adminScreens.includes(id)){
    navMatch.style.display='none';
    navManage.style.display='flex';
  } else {
    navMatch.style.display='flex';
    navManage.style.display='none';
  }
  
  // nav active state
  const navMap = {
    's-explore':'nav-explore','s-search':'nav-explore','s-club':'nav-explore',
    's-activity':'nav-explore','s-recruit':'nav-explore','s-apply':'nav-explore','s-apply-success':'nav-explore',
    's-match-guide':'nav-match','s-match-quiz':'nav-match','s-match-quiz-2':'nav-match','s-match-quiz-3':'nav-match','s-match-quiz-4':'nav-match','s-match-result':'nav-match',
    's-messages':'nav-messages','s-msg-detail':'nav-messages','s-msg-detail-admin':'nav-messages',
    's-profile':'nav-profile','s-settings':'nav-profile','s-profile-admin':'nav-profile',
    's-manage':'nav-manage','s-edit-club':'nav-manage','s-publish':'nav-manage',
    's-applications':'nav-manage','s-stats':'nav-manage','s-faq':'nav-manage',
  };
  const navId = navMap[id];
  document.querySelectorAll('.nv').forEach(n=>n.classList.remove('active'));
  if(navId) document.getElementById(navId)?.classList.add('active');
}

/* ═══════════════════════════════════
   PERMISSION SYSTEM
═══════════════════════════════════ */
function getActionName(action){
  const names = {
    'collect': '收藏社团',
    'apply': '报名参加',
    'message': '发送提问',
    'publish': '发布公告',
    'manage': '管理社团'
  };
  return names[action] || action;
}

function canPerformAction(action){
  const u = DATA.user;
  
  // Not logged in guests can't do anything
  if(!u.isLoggedIn || u.identity === 'guest'){
    return {allowed: false, reason: '请先登录'};
  }
  
  switch(action){
    case 'collect':
      return {allowed: u.canCollect, reason: u.canCollect ? '' : '无法收藏此社团'};
    case 'apply':
      return {allowed: u.canApply, reason: u.canApply ? '' : '无法报名，请检查账户状态'};
    case 'message':
      return {allowed: u.canMessage, reason: u.canMessage ? '' : '无法发送消息'};
    case 'publish':
      return {allowed: u.canPublish && u.identity === 'admin', reason: !u.canPublish ? '权限不足' : '仅管理员可发布'};
    case 'manage':
      return {allowed: u.identity === 'admin', reason: '仅管理员可访问'};
    default:
      return {allowed: false, reason: '未知操作'};
  }
}

function guardedAction(action, callback){
  const check = canPerformAction(action);
  if(!check.allowed){
    toast('🔒 ' + check.reason);
    return false;
  }
  if(callback) callback();
  return true;
}

/* ═══════════════════════════════════
   身份和认证管理
═══════════════════════════════════ */
function handleClubManagerEntry(){
  // 检查用户是否已经是管理员
  if(DATA.user.identity === 'admin' && DATA.user.authStatus === 'approved'){
    // 已认证，直接进入管理台
    go('s-manage');
  } else if(DATA.user.identity === 'admin' && DATA.user.authStatus === 'pending'){
    // 审核中，显示进度
    go('s-auth-status');
  } else {
    // 需要提交认证申请
    DATA.user.identity = 'admin'; // 标记尝试申请管理员
    go('s-auth-apply');
  }
}

function saveAuthRequest(){
  // 从表单中获取数据
  const form = document.getElementById('s-auth-apply')?.querySelector('form') || {};
  const inputs = document.getElementById('s-auth-apply')?.querySelectorAll('input, textarea, select') || [];
  
  const authData = {
    clubName: inputs[0]?.value || '校园戏剧社',
    position: inputs[1]?.value || '主席',
    phone: inputs[4]?.value || '',
    description: inputs[5]?.value || '',
    submitTime: new Date().toLocaleString('zh-CN'),
  };
  
  // 保存到 DATA 中
  DATA.userAuthRequests[DATA.user.userId] = authData;
  
  // 设置认证状态为 pending
  DATA.user.authStatus = 'pending';
  
  // 显示成功提示
  toast('✅ 申请已提交');
  
  // 跳转到进度页
  setTimeout(() => go('s-auth-status'), 800);
}

function loadAuthData(){
  // 从保存的数据中恢复表单内容
  const authData = DATA.userAuthRequests[DATA.user.userId];
  if(authData && document.getElementById('s-auth-apply')){
    const inputs = document.getElementById('s-auth-apply')?.querySelectorAll('input, textarea, select');
    if(inputs[0]) inputs[0].value = authData.clubName || '';
    if(inputs[1]) inputs[1].value = authData.position || '';
    if(inputs[4]) inputs[4].value = authData.phone || '';
    if(inputs[5]) inputs[5].value = authData.description || '';
  }
}

/* ═══════════════════════════════════
   社团页面和消息管理
═══════════════════════════════════ */
function goToClubFromRecruit(clubId){
  // 从招新详情页跳转到社团主页
  currentContext.clubId = clubId;
  go('s-club', {clubId: clubId});
}

function goToClubFromMessage(clubId){
  // 从提问页跳转到社团主页
  currentContext.messageTarget = clubId;
  currentContext.clubId = clubId;
  go('s-msg-detail', {clubId: clubId});
}

/* ═══════════════════════════════════
   TOAST
═══════════════════════════════════ */
let toastTimer;
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2000);
}

/* ═══════════════════════════════════
   MICRO INTERACTIONS
═══════════════════════════════════ */
function toggleOpt(el){
  el.classList.toggle('on');
}
function switchQuiz(questionNum, el){
  el.closest('.option-list').querySelectorAll('.opt').forEach(o=>o.classList.remove('on'));
  el.classList.add('on');
}
function toggleFilter(el){
  el.closest('.filter-row, [style]').querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('on'));
  el.classList.add('on');
}
function toggleRtab(el){
  el.closest('.result-tabs').querySelectorAll('.rtab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}
function switchCtab(el){
  el.closest('.club-tabs').querySelectorAll('.ctab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}
function switchPtab(el, containerId, showId){
  el.closest('.profile-tabs').querySelectorAll('.ptab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  const container = document.getElementById(containerId);
  container.querySelectorAll('[id^="ptab-"]').forEach(d=>d.style.display='none');
  document.getElementById(showId).style.display='block';
}

// Filter clubs by category
function filterByCategory(category, el){
  // Update chip states
  document.querySelectorAll('#category-filter .chip').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');
  
  // Get hscroll container
  const hscroll = document.querySelector('.sec .hscroll');
  if(!hscroll) return;
  
  // Filter all club cards in the hscroll
  hscroll.querySelectorAll('.club-card-h').forEach(card => {
    const clubName = card.querySelector('.cch-name').textContent;
    const clubId = Object.values(DATA.clubs).find(c => c.name === clubName)?.id;
    
    if(!clubId) return;
    const club = DATA.clubs[clubId];
    
    if(category === null || club.category === category){
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ═══════════════════════════════════
   PERMISSION CHECKS
═══════════════════════════════════ */

// Check if user can perform action
function canPerformAction(action){
  const u = DATA.user;
  
  // 游客模式检查
  if(!u.isLoggedIn || u.identity === 'guest'){
    return {allowed: false, reason: '请先登录来' + getActionName(action)};
  }
  
  switch(action){
    case 'collect':
      return {allowed: u.canCollect, reason: u.canCollect ? '' : '您暂无收藏权限'};
    case 'apply':
      return {allowed: u.canApply, reason: u.canApply ? '' : '您暂无报名权限'};
    case 'message':
      return {allowed: u.canMessage, reason: u.canMessage ? '' : '您暂无提问权限'};
    case 'publish':
      return {allowed: u.canPublish && u.identity === 'admin', reason: !u.canPublish ? '仅管理员可发布' : ''};
    case 'manage':
      return {allowed: u.canManage && u.identity === 'admin', reason: !u.canManage ? '仅管理员可管理' : ''};
    default:
      return {allowed: true, reason: ''};
  }
}

function getActionName(action){
  const names = {
    'collect': '收藏社团',
    'apply': '提交报名',
    'message': '提问咨询',
    'publish': '发布公告',
    'manage': '管理社团'
  };
  return names[action] || action;
}

// Guarded action wrapper
function guardedAction(action, callback){
  const check = canPerformAction(action);
  if(!check.allowed){
    toast('🔒 ' + check.reason);
    return false;
  }
  callback && callback();
  return true;
}
