module.exports = {//左侧列表
    '/study/': [
        {
            title: '学习',
            path: '/study/'
        },
        {
            title: 'js基础知识',
            children: [
                {
                    title: '介绍',
                    path: 'js/'
                },
                {
                    title: 'call与apply的区别与作用',
                    path: 'js/call&apply'
                }
            ]
        },
        {
            title: 'typescript',
            children: [
                {
                    title: '介绍',
                    path: 'typescript/'
                },
                {
                    title: '安装',
                    path: 'typescript/install'
                },
                {
                    title: '语法',
                    path: 'typescript/grammar'
                }
            ]
        },
        {
            title: '前端打包',
            children: [
                {
                    title: '介绍',
                    path: 'pack/'
                },
                {
                    title: 'webpack',
                    path: 'pack/webpack'
                },
                {
                    title: 'rollup',
                    path: 'pack/rollup'
                }
            ]
        }
    ],
    '/interview/': [
        {
            title: '介绍',
            path: '/interview/'
        },
        {
            title: '复习',
            children: [
                {
                    title: '第一部分',
                    path: '/interview/part/1'
                },
                {
                    title: '第二部分',
                    path: '/interview/part/2'
                }
            ]
        }
    ]
}
