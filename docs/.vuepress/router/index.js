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
                    title: 'js基础知识',
                    children: [
                        {
                            title: '前言',
                            path: '/interview/part/js/'
                        },
                        {
                            title: '第一部分',
                            path: '/interview/part/js/1'
                        },
                        {
                            title: '第二部分',
                            path: '/interview/part/js/2'
                        },
                        {
                            title: '第三部分',
                            path: '/interview/part/js/3'
                        },
                        {
                            title: '第四部分',
                            path: '/interview/part/js/4'
                        }
                    ]
                },
                {
                    title: 'Web API',
                    children: [
                        {
                            title: '前言',
                            path: '/interview/part/webApi/'
                        },
                        {
                            title: 'DOM操作',
                            path: '/interview/part/webApi/1'
                        },
                        {
                            title: 'BOM操作',
                            path: '/interview/part/webApi/2'
                        },
                        {
                            title: '事件',
                            path: '/interview/part/webApi/3'
                        },
                        {
                            title: 'ajax',
                            path: '/interview/part/webApi/4'
                        },
                        {
                            title: '存储',
                            path: '/interview/part/webApi/5'
                        }
                    ]
                },
                {
                    title: '开发环境',
                    children: [
                        {
                            title: '前言',
                            path: '/interview/part/development/'
                        },
                        {
                            title: '开发与调试',
                            path: '/interview/part/development/1'
                        },
                        {
                            title: 'webpack 和 babel',
                            path: '/interview/part/development/2'
                        }
                    ]
                }
            ]
        }
    ]
}
