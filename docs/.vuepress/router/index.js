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
