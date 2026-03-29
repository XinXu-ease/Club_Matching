// 报名表数据
const APPLICATIONS_DB = {
  'app1': { name: '张晓雨', school: '外国语学院', grade: '大一', position: '宣传部', status: 'pending', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'app2': { name: '李明哲', school: '计算机学院', grade: '大一', position: '演出部', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app3': { name: '刘思远', school: '艺术学院', grade: '大二', position: '舞美部', status: 'approved', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' },
  'app4': { name: '陈瑞', school: '中文系', grade: '大一', position: '编剧部', status: 'pending', avatar: '👨', bgColor: 'rgba(38,70,83,.08)' },
  'app5': { name: '王小雯', school: '新闻系', grade: '大二', position: '宣传部', status: 'approved', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'app6': { name: '赵志远', school: '经管学院', grade: '大一', position: '演出部', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app7': { name: '黄思勤', school: '法学院', grade: '大一', position: '宣传部', status: 'pending', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'app8': { name: '周天行', school: '理学院', grade: '大二', position: '舞美部', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app9': { name: '许靖宇', school: '工程学院', grade: '大一', position: '演出部', status: 'approved', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' },
  'app10': { name: '林思语', school: '外国语学院', grade: '大一', position: '编剧部', status: 'pending', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'app11': { name: '孙浩然', school: '商学院', grade: '大二', position: '宣传部', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app12': { name: '易思琪', school: '医学院', grade: '大一', position: '演出部', status: 'pending', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'app13': { name: '戴明珠', school: '艺术学院', grade: '大二', position: '舞美部', status: 'approved', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' },
  'app14': { name: '何文轩', school: '中文系', grade: '大一', position: '编剧部', status: 'pending', avatar: '👨', bgColor: 'rgba(38,70,83,.08)' },
  'app15': { name: '朱思含', school: '新闻系', grade: '大一', position: '宣传部', status: 'pending', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'app16': { name: '吴思语', school: '经管学院', grade: '大一', position: '演出部', status: 'pending', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'app17': { name: '刘天琪', school: '法学院', grade: '大一', position: '编剧部', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app18': { name: '高思琦', school: '理学院', grade: '大二', position: '宣传部', status: 'pending', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' },
  'app19': { name: '郭子悦', school: '工程学院', grade: '大一', position: '舞美部', status: 'rejected', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app20': { name: '范思彤', school: '外国语学院', grade: '大一', position: '演出部', status: 'pending', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'app21': { name: '沈雨欣', school: '商学院', grade: '大二', position: '编剧部', status: 'pending', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'app22': { name: '曾浩然', school: '医学院', grade: '大一', position: '宣传部', status: 'rejected', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app23': { name: '康思诺', school: '艺术学院', grade: '大一', position: '演出部', status: 'pending', avatar: '👩', bgColor: 'rgba(233,196,106,.15)' },
  'app24': { name: '傅天昊', school: '中文系', grade: '大二', position: '编剧部', status: 'pending', avatar: '👨', bgColor: 'rgba(38,70,83,.08)' },
  'app25': { name: '邵雨萱', school: '新闻系', grade: '大一', position: '宣传部', status: 'pending', avatar: '👩', bgColor: 'rgba(231,111,81,.1)' },
  'app26': { name: '洪子晗', school: '经管学院', grade: '大二', position: '演出部', status: 'pending', avatar: '👨', bgColor: 'rgba(42,157,143,.1)' },
  'app27': { name: '谭思语', school: '法学院', grade: '大一', position: '舞美部', status: 'pending', avatar: '👩', bgColor: 'rgba(244,162,97,.15)' },
  'app28': { name: '华文琦', school: '理学院', grade: '大一', position: '编剧部', status: 'pending', avatar: '👨', bgColor: 'rgba(38,70,83,.08)' }
};

// 获取报名统计
function getApplicationStats() {
  const stats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  };
  
  Object.values(APPLICATIONS_DB).forEach(app => {
    stats.total++;
    if(app.status === 'pending') stats.pending++;
    else if(app.status === 'approved') stats.approved++;
    else if(app.status === 'rejected') stats.rejected++;
  });
  
  return stats;
}

// 按状态过滤报名
function filterApplicationsByStatus(status) {
  if(status === 'all') return Object.entries(APPLICATIONS_DB);
  
  return Object.entries(APPLICATIONS_DB).filter(([id, app]) => app.status === status);
}

// 按名字搜索报名
function searchApplicationsByName(keyword) {
  if(!keyword.trim()) return Object.entries(APPLICATIONS_DB);
  
  const lowerKeyword = keyword.toLowerCase();
  return Object.entries(APPLICATIONS_DB).filter(([id, app]) => 
    app.name.toLowerCase().includes(lowerKeyword) ||
    app.school.toLowerCase().includes(lowerKeyword) ||
    app.position.toLowerCase().includes(lowerKeyword)
  );
}
