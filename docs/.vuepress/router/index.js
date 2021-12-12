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
                    title: '设计模式',
                    path: 'js/designPattern'
                },
                {
                    title: 'call与apply的区别与作用',
                    path: 'js/call&apply'
                },
                {
                    title: '宏任务和微任务',
                    path: 'js/Macro&MicroTasks'
                }
            ]
        },
        {
            title: 'vue',
            children: [
                {
                    title: '介绍',
                    path: 'vue/'
                },
                {
                    title: '性能优化',
                    path: 'vue/optimize'
                },
                {
                    title: '+Typescript 开发',
                    children: [
                        {
                            title: '+Typescript 开发',
                            path: 'vue/withTypescript/'
                        },
                        {
                            title: 'vue-class-component',
                            path: 'vue/withTypescript/vueClassComponent'
                        },
                        {
                            title: 'vue-property-decorator',
                            path: 'vue/withTypescript/vuePropertyDecorator'
                        }
                    ]
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
            title: 'http',
            children: [
                {
                    title: '介绍',
                    path: 'http/'
                },
                {
                    title: '从输入url到回车后发生了什么',
                    path: 'http/urlToEnter'
                },
                {
                    title: 'HTTP缓存',
                    path: 'http/cache'
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
                    title: '模块化规范',
                    path: 'pack/modularity'
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
                    title: 'css',
                    children: [
                        {
                            title: '前言',
                            path: '/interview/part/css/'
                        },
                        {
                            title: '盒子模型',
                            path: '/interview/part/css/1'
                        },
                        {
                            title: '布局',
                            path: '/interview/part/css/2'
                        },
                        {
                            title: 'css预处理器',
                            path: '/interview/part/css/3'
                        }
                    ]
                },
                {
                    title: 'js基础知识',
                    children: [
                        {
                            title: '前言',
                            path: '/interview/part/js/'
                        },
                        {
                            title: '数据类型',
                            path: '/interview/part/js/1'
                        },
                        {
                            title: '原型和原型链',
                            path: '/interview/part/js/2'
                        },
                        {
                            title: '作用域和闭包',
                            path: '/interview/part/js/3'
                        },
                        {
                            title: '同步异步的区别',
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
                },
                {
                    title: '运行环境',
                    children: [
                        {
                            title: '前言',
                            path: '/interview/part/runtime/'
                        },
                        {
                            title: '页面加载过程',
                            path: '/interview/part/runtime/1'
                        },
                        {
                            title: '性能优化',
                            path: '/interview/part/runtime/2'
                        },
                        {
                            title: '节流（Throttle） 和 防抖（Debounce）',
                            path: '/interview/part/runtime/3'
                        },
                        {
                            title: '安全',
                            path: '/interview/part/runtime/4'
                        }
                    ]
                },
                {
                    title: '面试题',
                    path: '/interview/part/problem/'
                }
            ]
        },
        {
            title: '总结',
            path: '/interview/summary/summary'
        }
    ]
}
