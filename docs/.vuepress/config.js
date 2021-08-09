const sidebar = require('./router/index')
module.exports = {
    title: '🐟 𝗙𝗶𝘀𝗵 𝗖𝗼𝗱𝗲',
    description: 'ℐ𝒻 𝓎ℴ𝓊 𝒶𝓁𝓌𝒶𝓎𝓈 𝒹ℯ𝓅ℯ𝓃𝒹 ℴ𝓃 ℴ𝓉𝒽ℯ𝓇𝓈, 𝓎ℴ𝓊 𝓌𝒾𝓁𝓁 𝓃ℯ𝓋ℯ𝓇 ℊ𝓇ℴ𝓌 𝓊𝓅.',
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
