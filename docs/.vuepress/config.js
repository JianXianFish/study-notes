const sidebar = require('./router/index')
module.exports = {
    title: '🐟 𝗠𝗿𝗙𝗶𝘀𝗵',
    description: '谢谢',
    theme: 'reco',
    themeConfig: {// 主题设置
        displayAllHeaders: true,
        author: 'MrFish',
        nav: [
            {
                text: '首页',
                link: '/',
                icon: 'reco-home'
            },
            {
                text: '学习',
                link: '/study/',
                icon: 'reco-blog'
            }, {
                text: '面试',
                link: '/interview/',
                icon: 'reco-suggestion'
            }
        ],
        subSidebar: 'auto',
        sidebar
    },
    plugins: ['@vuepress/nprogress']
}
