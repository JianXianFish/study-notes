const sidebar = require('./router/index')
module.exports = {
    title: '๐ ๐๐ถ๐๐ต ๐๐ผ๐ฑ๐ฒ',
    description: 'โ๐ป ๐โด๐ ๐ถ๐๐๐ถ๐๐ ๐นโฏ๐โฏ๐๐น โด๐ โด๐๐ฝโฏ๐๐, ๐โด๐ ๐๐พ๐๐ ๐โฏ๐โฏ๐ โ๐โด๐ ๐๐.',
    theme: 'reco',
    themeConfig: {// ไธป้ข่ฎพ็ฝฎ
        displayAllHeaders: true,
        author: 'MrFish',
        nav: [
            {
                text: '้ฆ้กต',
                link: '/',
                icon: 'reco-home'
            },
            {
                text: 'ๅญฆไน ',
                link: '/study/',
                icon: 'reco-blog'
            }, {
                text: '้ข่ฏ',
                link: '/interview/',
                icon: 'reco-suggestion'
            }
        ],
        subSidebar: 'auto',
        sidebar
    },
    plugins: ['@vuepress/nprogress']
}
