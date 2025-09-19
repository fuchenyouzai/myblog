fetch('articles.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('archive-list');
    data.sort((a,b)=>new Date(b.date)-new Date(a.date));

    const archive = {};
    data.forEach(item=>{
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth()+1;
      if(!archive[year]) archive[year]={};
      if(!archive[year][month]) archive[year][month]=[];
      archive[year][month].push(item);
    });

    for(const year of Object.keys(archive).sort((a,b)=>b-a)){
      const yearDiv = document.createElement('div');
      yearDiv.innerHTML=`<h3>${year} 年</h3>`;
      for(const month of Object.keys(archive[year]).sort((a,b)=>b-a)){
        const monthDiv = document.createElement('div');
        monthDiv.innerHTML=`<h4>📅 ${month} 月</h4>`;
        const ul = document.createElement('ul');
        archive[year][month].forEach(item=>{
          const li = document.createElement('li');
          li.innerHTML=`<a href="post.html?article=${item.id}">${item.title}</a> <small>${item.date}</small>`;
          ul.appendChild(li);
        });
        monthDiv.appendChild(ul);
        yearDiv.appendChild(monthDiv);
      }
      container.appendChild(yearDiv);
    }
  })
  .catch(err=>console.error('加载文章数据失败', err));

// 主题切换
const toggleBtnArchive=document.getElementById('theme-toggle');
toggleBtnArchive.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme','dark');
  } else {
    localStorage.setItem('theme','light');
  }
});
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark-mode');