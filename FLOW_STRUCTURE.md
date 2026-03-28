# 🎭 ClubMatch 用户流程全景梳理

## 核心定位
一个统一平台，分为**公共浏览层**（所有人可见）和**身份能力层**（根据身份切换）

---

## 📊 三种身份对比

| 维度 | 游客 | 普通用户/新生 | 社团管理员 |
|------|------|-------------|---------|
| **入口** | "先逛逛" | "我是新生" | "我是社团负责人" |
| **可浏览** | ✅ Explore, 社团/活动/招新详情 | ✅ 全部 + 智能匹配 | ✅ 全部 + 管理界面 |
| **可操作** | ❌ 不能收藏/报名/提问 | ✅ 收藏、报名、提问、查看个人记录 | ✅ 编辑主页、发布、查看报名、数据统计 |
| **第二导航栏** | Explore \| Messages \| (无) | Explore \| **Match** \| Messages \| Profile | Explore \| **Manage** \| Messages \| Profile |
| **Profile功能** | 无（游客无账户） | 收藏、报名、浏览记录、提问、身份申请 | 管理的社团、公告、留言、下载报名表 |

---

## 🚀 完整的三条用户路径

### 路径一：游客（浏览-不登录）

```
欢迎页 (s-welcome)
   ↓
【点击"先逛逛"】
   ↓
Explore 首页 (s-explore)
   ├→ 【点击社团卡片】→ 社团主页 (s-club)
   ├→ 【点击活动卡片】→ 活动详情 (s-activity)
   ├→ 【点击招新卡片】→ 招新详情 (s-recruit)
   └→ 【搜索/筛选】→ 搜索结果 (s-search/s-filter)

行为限制：
❌ 点击收藏 → "请先登录"
❌ 点击报名 → "请先登录"
❌ 点击提问 → "请先登录"
❌ 无法看到 Match 导航栏
❌ 无法访问 Profile
❌ 无法切换身份
```

---

### 路径二：新生/普通用户（浏览+参与）

#### **入口与注册**
```
1️⃣ 欢迎页 (s-welcome)
   ↓
【点击"我是新生"】
   ↓
2️⃣ 登录页 (s-login) [如果已有账户]
   或
   注册页 (s-signup) [如果新用户]
   ↓
3️⃣ 进入 Explore (s-explore)
```

#### **核心工作流（一级导航 4 栏）**
```
┌─────────────────────────────────────────────┐
│  Explore  │  Match  │  Messages  │  Profile  │
└─────────────────────────────────────────────┘

📍 【Explore 浏览内容】(s-explore)
   ├→ 【点击某社团】→ 社团主页 (s-club)
   │  ├→ 【点击"收藏"】→ 已收藏 ✅
   │  ├→ 【点击"提问"】→ 消息详情 (s-msg-detail)
   │  └→ 【点击招新公告】→ 招新详情 (s-recruit)
   │
   ├→ 【点击"去匹配"banner】→ Match 匹配 (见下面)
   │
   └→ 【搜索/筛选】→ 搜索结果 (s-search)

🎯 【Match 匹配流程】
   ├→ 匹配引导页 (s-match-guide)
   │  ↓ 【点"开始匹配"】
   │
   ├→ 匹配问答页 (s-match-quiz)
   │  ├→ 第 1 步：兴趣方向选择 (s-match-quiz-1)
   │  ├→ 第 2 步：参与目标选择 (s-match-quiz-2)
   │  ├→ 第 3 步：时间投入选择 (s-match-quiz-3)
   │  ├→ 第 4 步：偏好风格选择 (s-match-quiz-4)
   │  ↓ 【提交】
   │
   └→ 匹配结果页 (s-match-result)
      ├→ 【点"查看主页"】→ 社团主页 (s-club)
      ├→ 【点"收藏"】→ 已收藏 ✅
      ├→ 【点"报名"】→ 报名页 (s-apply)
      └→ 【重新匹配】→ 回到匹配问答 (s-match-quiz)

💬 【Messages 消息中心】(s-messages)
   └→ 【点击某条消息】→ 消息详情 (s-msg-detail)
      ├→ 【查看关联社团】→ 社团主页 (s-club)
      └→ 【回复/提问】→ 留言

👤 【Profile 个人中心】
   ├→ 我的收藏 (s-profile Tab1)
   ├→ 我的报名 (s-profile Tab2)
   ├→ 浏览记录 (s-profile Tab3)
   ├→ 我的提问 (s-profile Tab4)
   └→ 申请管理员身份 (s-profile 底部入口)
      ├→ 【点"申请社团管理员"】→ 认证申请页 (s-auth-apply)
      │  ↓ 【提交】
      └→ 认证进度页 (s-auth-status)
```

#### **报名流程**
```
从 Explore / Match / 社团主页
   ↓
【点击"报名" / "立即报名" / "申请"】
   ↓
报名页 (s-apply)
   ├→ 填写表单：姓名、院系、联系方式、兴趣、时间
   ↓ 【提交】
   ↓
报名成功 (s-apply-success)
   ├→ 【查看我的报名】→ Profile (s-profile)
   ├→ 【继续浏览】→ Explore (s-explore)
   └→ 【继续匹配】→ Match (s-match-result)
```

---

### 路径三：社团管理员（发布+运营+数据）

#### **入口与认证**
```
1️⃣ 欢迎页 (s-welcome)
   ↓
【点击"我是社团负责人"】
   ↓
2️⃣ 登录/注册
   ↓
3️⃣ 重定向到认证申请 (s-auth-apply)
   ↓
【填写社团信息+上传证书】
   ↓
【提交】→ 认证进度 (s-auth-status)
   ↓
🔔 【等待审核】
   ├→ 用户可随时查看认证进度 (s-auth-status)
   └→ 认证通过后，自动获得管理权限
   ↓
✅ 获得社团管理员身份
```

#### **核心工作流（一级导航 4 栏）**
```
┌──────────────────────────────────────────┐
│ Explore │ Manage │ Messages │ Profile     │
└──────────────────────────────────────────┘

📍 【依然可以浏览 Explore】
   └→ Explore 首页 (s-explore) - 与新生相同

🏛️ 【Manage 管理台】(s-manage)
   ├→ 🎯 【快捷入口卡片】
   │  ├→ 编辑主页 → (s-edit-club)
   │  ├→ 发布招新 → (s-publish)
   │  ├→ 查看报名 → (s-applications)
   │  └→ 管理留言 → (s-faq)
   │
   └→ 📊 【数据卡片 (可点击查看详情)】
      ├→ 访问量 → 详情
      ├→ 收藏量 → 详情
      ├→ 匹配次数 → 详情
      └→ 报名人数 → 详情

📋 【编辑社团主页】(s-edit-club)
   ├→ 基础信息：logo、名称、定位、成立时间、规模
   ├→ 标签信息：投入、门槛、收获、人群、风格
   ├→ 详细介绍：简介、架构、活动、官方渠道
   ↓ 【保存草稿 / 发布更新】

📢 【发布招新公告】(s-publish)
   ├→ 标题、封面、招募部门
   ├→ 要求、时间、截止日期
   ├→ 人数限制、联系方式
   ↓ 【预览 / 发布】

📋 【查看报名表】(s-applications)
   ├→ 搜索报名人
   ├→ 筛选状态：全部 / 待处理 / 已通过 / 未录取
   ├→ 导出 Excel
   └→ 【点击某人】→ 报名详情 (s-applications-detail)

💬 【管理 FAQ / 留言】(s-faq)
   ├→ 筛选状态：全部 / 待回复 / 已回复
   ├→ 【点击某条】→ 回复详情 (s-faq-detail)
   └→ 【输入回复 + 发送】

📊 【数据统计】(s-stats)
   ├→ 访问量走势图
   ├→ 收藏量统计
   ├→ 匹配触达量
   ├→ 报名转化率卡片
   └→ 图表展示（折线/柱状）

💬 【Messages 消息中心】(s-messages)
   └→ 用户的咨询问题列表
      ├→ 状态：待处理 / 已回复
      └→ 【点击】→ 消息详情 (s-msg-detail)

👤 【Profile - 社团端】(s-profile-admin)
   ├→ 头像、昵称
   ├→ 当前身份：某某社团管理员
   ├→ 认证状态：✅ 已认证
   ├→ 我发布的公告列表
   ├→ 待回复留言数
   ├→ 报名表快速下载
   ├→ 【切换身份】- 如果管理多个社团或有新生身份
   └→ 设置与反馈
```

#### **发布流程示例**
```
管理台 (s-manage)
   ↓
【点击"发布招新"快捷卡】
   ↓
发布招新公告 (s-publish)
   ├→ 填写所有字段
   ├→ 【预览】
   └→ 【发布】
      ↓
公告被推送到 Explore
   ↓
用户在 Explore 看到公告 → 点击进入招新详情 (s-recruit)
   ↓
用户【立即报名】→ 报名页 (s-apply)
   ↓
【提交报名】
   ↓
📬 通知流向社团管理员
   ↓
社团在管理台 (s-manage) - 查看报名表 (s-applications)
   ↓
【点击报名人】→ 查看详情、审核状态
```

---

## 🗺️ 页面清单（按字母序）

### ✅ 已实现
- s-welcome（欢迎页 - 三个入口）
- s-explore（Explore 首页）
- s-club（社团主页）
- s-recruit（招新详情）
- s-activity（活动详情 - 框架）
- s-manage（管理台首页）
- s-edit-club（编辑社团主页）
- s-publish（发布招新公告）
- s-applications（报名表管理）
- s-stats（数据统计）
- s-faq（FAQ/留言管理）
- s-profile（新生 Profile）
- s-profile-admin（社团端 Profile）
- s-settings（设置页）
- s-auth-apply（认证申请页 - 新增）
- s-auth-status（认证进度页 - 新增）
- s-messages（消息列表 - 框架）
- s-msg-detail（消息详情 - 框架）
- s-apply（报名页 - 框架）
- s-apply-success（报名成功 - 框架）

### 🔄 需要完善
- s-login（登录页 - 缺失）
- s-signup（注册页 - 缺失）
- s-search（搜索结果页 - 缺失）
- s-filter（筛选结果页 - 缺失）
- s-match-guide（匹配引导页 - 缺失）
- s-match-quiz（匹配问答父页面 - 缺失）
- s-match-quiz-1~4（四步匹配问题 - 缺失）
- s-match-result（匹配结果页 - 缺失）
- s-activity（活动详情 - 需完善）
- s-messages（消息列表 - 需完善）

---

## 🎯 关键设计要点

### 1. 三个身份的导航栏差异
```
游客：        Explore  |  (无 Match/Manage)  |  (无 Messages/Profile)
新生：        Explore  |  Match  |  Messages  |  Profile
管理员：      Explore  |  Manage  |  Messages  |  Profile
```

### 2. 权限限制位置
```
游客 点击【收藏】→ 弹窗："请先登录"
游客 点击【报名】→ 弹窗："请先登录"
游客 点击【提问】→ 弹窗："请先登录"
游客 无法进入 Match 或 Profile
```

### 3. 身份切换
```
新生身份通过 Profile 底部 → 【申请社团管理员】
           ↓
    s-auth-apply（填写申请）
           ↓
    s-auth-status（查看进度）
           ↓
    审核通过后，Profile 显示切换身份按钮
```

### 4. 一页多身份模式
例如 s-club 社团主页：
- 游客看到：只读模式，无编辑按钮
- 新生看到：只读模式 + 收藏/提问/报名按钮
- 如果是社团管理员且管理此社团：只读 + 右上角【编辑】按钮 → s-edit-club

---

## 📱 底部导航栏设计

### 游客模式
```
游客无需登录，只显示：
回到首页（返回欢迎或 Explore）
```

### 新生模式
```
┌────────────────────────────────────┐
│ 🔍 Explore │ ⚡ Match │ 💬 Messages │ 👤 Profile │
└────────────────────────────────────┘
```

### 社团管理员模式
```
┌────────────────────────────────────┐
│ 🔍 Explore │ 🏛️ Manage │ 💬 Messages │ 👤 Profile │
└────────────────────────────────────┘
```

---

## 🔐 Permission 系统映射

```javascript
// 在 guardedAction() 中调用
if (user.identity === 'guest') {
  action === 'collect' ? ❌ 询问登录
  action === 'apply' ? ❌ 询问登录
  action === 'message' ? ❌ 询问登录
  
  访问 Match ? ❌ 无此导航
  访问 Profile ? ❌ 无此选项
}

if (user.identity === 'student') {
  action === 'collect' ? ✅ 允许
  action === 'apply' ? ✅ 允许
  action === 'message' ? ✅ 允许
  action === 'publish' ? ❌ 仅管理员
  action === 'manage' ? ❌ 仅管理员
  
  导航栏 Match ? ✅ 显示
  Profile ? ✅ 显示
}

if (user.identity === 'admin') {
  action === 'collect' ? ✅ 允许
  action === 'apply' ? ✅ 允许
  action === 'message' ? ✅ 允许
  action === 'publish' ? ✅ 允许
  action === 'manage' ? ✅ 允许
  
  导航栏 Manage ? ✅ 显示（替代 Match）
  Profile ? ✅ 显示
  所有社团管理功能 ? ✅ 允许
}
```

---

## 📋 总结表

| 需求 | 游客 | 新生 | 管理员 |
|------|------|------|--------|
| 浏览社团 | ✅ | ✅ | ✅ |
| 浏览活动 | ✅ | ✅ | ✅ |
| 浏览招新 | ✅ | ✅ | ✅ |
| 做智能匹配 | ❌ | ✅ | ✅ |
| 收藏社团 | ❌ | ✅ | ✅ |
| 报名加入 | ❌ | ✅ | ✅ |
| 发送提问 | ❌ | ✅ | ✅ |
| 编辑社团主页 | ❌ | ❌ | ✅ |
| 发布招新公告 | ❌ | ❌ | ✅ |
| 查看报名表 | ❌ | ❌ | ✅ |
| 回复用户留言 | ❌ | ❌ | ✅ |
| 查看数据统计 | ❌ | ❌ | ✅ |
| 下载报名表 | ❌ | ❌ | ✅ |
| 申请管理员 | ❌ | ✅ | ❌ |
| Profile | ❌ | ✅ | ✅ |
| Match 导航 | ❌ | ✅ | ❌ |
| Manage 导航 | ❌ | ❌ | ✅ |
