// 主题切换
function toggleTheme() {
    const body = document.body;
    body.setAttribute('data-theme', body.getAttribute('data-theme')==='light'?'dark':'light');
}

// 回到顶部
window.onscroll = function() { toggleBackToTop(); };
function toggleBackToTop() {
    const button = document.getElementById("backToTop");
    (document.body.scrollTop>200 || document.documentElement.scrollTop>200) ? button.style.display="block" : button.style.display="none";
}
function scrollToTop() { window.scrollTo({ top:0, behavior:'smooth' }); }

// 自动生成文章列表
async function loadArticles(filterType=null) {
    const res = await fetch('articles.json');
    const articles = await res.json();
    const container = document.getElementById('articleList');
    container.innerHTML = '';
    articles.forEach(article => {
        if (!filterType || article.type === filterType) {
            const div = document.createElement('article');
            div.innerHTML = `
                <h2><a href="${article.id}.html">${article.title}</a></h2>
                <p>${article.summary}</p>
                <img src="${article.image}" alt="${article.title}">
            `;
            container.appendChild(div);
        }
    });
}