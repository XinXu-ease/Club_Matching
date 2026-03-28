# 社团页面Bug修复说明

## 问题描述
Explore页面中点击任何社团卡片（摄影协会、计算机协会、环保公益社等）都只显示戏剧社的内容。

## 根本原因
1. s-club页面的HTML内容完全硬编码了戏剧社的信息
2. 没有动态加载不同社团的数据
3. 虽然onclick事件传递了正确的clubId，但没有相应的函数来使用这个clubId更新页面内容

## 解决方案

### 1️⃣ 创建完整社团数据库 (`js/clubs-data.js`)
创建了CLUBS_DB对象，为所有8个社团存储完整的信息：
- **基础信息**: id, name, emoji, slogan, category
- **统计数据**: members, history, events, rating, matchPercent
- **详细信息**: foundingYear, scale, timeInvestment, meetingTime, threshold, description
- **组织结构**: departments, tags, activities
- **招新信息**: recruitment (title, deadline, departments, quota, intro)
- **样式**: heroGradient, cardBg

包含的8个社团：
✅ 戏剧社 (drama)
✅ 摄影协会 (photo)
✅ 计算机协会 (coding)
✅ 环保公益社 (green)
✅ 吉他社 (guitar)
✅ 校园广播站 (broadcast)
✅ 辩论队 (debate)
✅ 文学社 (literature)

### 2️⃣ 重写updateClubPage函数
完全重写了updateClubPage函数，现在会根据clubId动态更新：
- 社团名称、slogan、emoji
- 统计数据（成员数、历史、事件数、评分）
- 匹配度百分比
- 基本信息（活动时间、时间投入、加入门槛、规模）
- 标签（根据标签内容自动选择合适的样式）
- 社团简介
- 招新卡片（包括部门信息）
- 英雄背景颜色
- 按钮事件处理

### 3️⃣ 更新updateRecruitPage函数
- 改用CLUBS_DB作为数据源
- 动态更新emoji背景色
- 更新招新标题、截止日期、部门信息、招募人数
- 生成部门卡片列表
- 绑定按钮事件

### 4️⃣ 更新updateApplyPage函数
- 改用CLUBS_DB作为数据源
- 更新apply表单的社团信息头

### 5️⃣ 更新updateMessagePage函数
- 改用CLUBS_DB作为数据源

## 工作流程
现在的完整工作流程：

```
Explore页面
  ↓
点击社团卡片 (例如: 摄影协会)
  ↓
go('s-club', {clubId: 'photo'})
  ↓
updatePageContent('s-club') 
  ↓
updateClubPage('photo')
  ↓
从CLUBS_DB['photo']加载数据
  ↓
动态更新s-club页面所有内容
  
点击"查看招新":
go('s-recruit', {clubId: 'photo'})
  ↓
updateRecruitPage('photo')
  ↓
展示摄影协会的招新页面

点击"提问":
go('s-msg-detail', {messageTarget: 'photo'})
  ↓
updateMessagePage('photo')
  ↓
展示摄影协会的消息页面
```

## 文件修改清单
- ✅ `js/clubs-data.js` - 新创建（包含完整的社团数据库）
- ✅ `clubmatch-full.html` - 已修改（引入clubs-data.js，更新所有update*Page函数）

## 测试方法
1. 打开clubmatch-full.html
2. 在Explore页面点击不同的社团卡片
3. 验证每个社团显示正确的信息（名称、成员数、简介、招新信息等）
4. 点击"查看招新"或"提问"，验证能够跳转到正确社团的页面

## 技术亮点
- ✨ 完全解耦了数据层和视图层
- ✨ 支持快速添加新社团（只需在js/clubs-data.js中添加新条目）
- ✨ 所有页面内容都动态生成，无硬编码
- ✨ 保持了原有的用户界面和交互逻辑
