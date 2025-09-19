myblog/                   ← 博客根目录（上传到 GitHub Pages）
│
├─ index.html             ← 首页，显示文章列表、搜索、标签筛选、分页
├─ post.html              ← 文章页面，显示文章正文、多媒体、Giscus 评论
├─ archive.html           ← 文章归档页，按年份/月分类显示文章
│
├─ style.css              ← 样式文件，控制页面布局、颜色、深色模式
├─ script.js              ← 首页和文章页脚本，处理搜索、分页、标签筛选、文章渲染、主题切换
├─ script-archive.js      ← 归档页脚本，处理按年月分类显示文章
├─ articles.json          ← 文章数据文件，存放所有文章内容（文字、图片、YouTube、音乐、标签、日期）
│
├─ images/                ← 图片资源文件夹
│   ├─ sunset.jpg         ← 示例文章图片
│   └─ beach.jpg          ← 示例文章图片
│
└─ music/                 ← 音乐资源文件夹
    └─ song.mp3           ← 示例文章音乐


✅ 功能总结

首页（index.html）：

分页显示文章

搜索文章标题/摘要

标签筛选

浅色/深色模式切换


文章页（post.html）：

多媒体支持：文字、图片、YouTube 视频、音乐

Giscus 评论区


文章归档页（archive.html）：

按年份/月分类

点击标题跳转文章


响应式设计：手机/电脑均适用

GitHub Pages 兼容，无需服务器

扩展性强：可增加标签云、热门文章推荐、分类模块
