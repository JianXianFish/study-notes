module.exports = {//左侧列表
    '/study/': [
        {
            title: '学习',
            path: '/study/'
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
        }
    ],
    '/interview/': [{
        title: '面试',
        children: [
            {
                title: '测试4',
                path: 'test01'
            }
        ]
    }]
}
