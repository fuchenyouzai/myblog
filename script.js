let articlesData = []; 
let currentPage = 1; 
const pageSize = 5; 
let activeTag = ""; 

fetch('articles.json')
  .then(res => res.json())
  .then(data => {
    articlesData = data.sort((a,b)=>new Date(b.date)-new Date(a.date));
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');

    if(articleId){
      renderArticle(articleId);
    } else {
      renderTags();
      renderPage(currentPage, articlesData);

      const searchBox = document.getElementById('search-box');
      searchBox.addEventListener('input', ()=>{
        const query = searchBox.value.toLowerCase();
        const filtered = articlesData.filter(a=>
          (a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query)) &&
          (activeTag === "" || a.tags.includes(activeTag))
        );
        currentPage = 1;
        renderPage(currentPage, filtered);
      });
    }
  })
  .catch(err=>console.error('加载文章数据失败',err));

function renderArticle(id){
  const article = articlesData.find(a=>a.id===id);
  if(!article) return;
  document.title = article.title;
  const container = document.querySelector('.article-content');
  const h2 = document.createElement('h2');
  h2.textContent = article.title;
  container.appendChild(h2);

  article.content.forEach(block=>{
    let el;
    switch(block.type){
      case "text":
        el=document.createElement('p');
        el.innerHTML=block.value.replace(/\n/g,"<br>");
        break;
      case "image":
        el=document.createElement('img');
        el.src=block.value;
        el.alt=block.alt||"";
        break;
      case "youtube":
        el=document.createElement('iframe');
        el.width="560";
        el.height="315";
        el.src=`https://www.youtube.com/embed/${block.value}`;
        el.frameBorder="0";
        el.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        el.allowFullscreen=true;
        break;
      case "music":
        el=document.createElement('audio');
        el.controls=true;
        const source=document.createElement('source');
        source.src=block.value;
        source.type="audio/mpeg";
        el.appendChild(source);
        break;
    }
    container.appendChild(el);
  });
}

function renderTags(){
  const tagsContainer = document.getElementById('tags-container');
  const allTags = new Set();
  articlesData.forEach(a=>a.tags.forEach(t=>allTags.add(t)));
  allTags.forEach(tag=>{
    const btn = document.createElement('button');
    btn.textContent = tag;
    btn.style.margin = "0 5px 5px 0";
    btn.addEventListener('click', ()=>{
      activeTag = (activeTag===tag)?"":tag;
      currentPage = 1;
      const query = document.getElementById('search-box').value.toLowerCase();
      const filtered = articlesData.filter(a=>
        (a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query)) &&
        (activeTag === "" || a.tags.includes(activeTag))
      );
      renderPage(currentPage, filtered);
    });
    tagsContainer.appendChild(btn);
  });
}

function renderPage(page, listData){
  const list = document.querySelector('.article-list');
  const pagination = document.getElementById('pagination');
  list.innerHTML = "";
  pagination.innerHTML = "";

  const totalPages = Math.ceil(listData.length / pageSize);
  const start = (page-1)*pageSize;
  const end = start + pageSize;
  const pageItems = listData.slice(start, end);

  pageItems.forEach(item=>{
    const li = document.createElement('li');
    li.innerHTML=`<a href="post.html?article=${item.id}">${item.title}</a>
                  <p>${item.excerpt}</p>
                  <small>${item.date}</small>`;
    list.appendChild(li);
  });

  for(let i=1;i<=totalPages;i++){
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.style.margin="0 5px";
    if(i===page) btn.disabled=true;
    btn.addEventListener('click', ()=>{
      currentPage = i;
      renderPage(currentPage, listData);
    });
    pagination.appendChild(btn);
  }
}

// 主题切换
const toggleBtn=document.getElementById('theme-toggle
toggleBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('theme','dark');
  } else {
    localStorage.setItem('theme','light');
  }
});
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark-mode');