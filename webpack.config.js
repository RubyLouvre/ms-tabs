var webpack = require('webpack')

var path = require('path')
var node_modules = path.resolve(__dirname, 'node_modules')

function heredoc(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
            replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}
var api = heredoc(function () {
    /*
    avalon的切换卡组件
    buttons: [], 字符串数组
    panels: [], 字符串数组 , 最好用插槽元素传入
    selectedIndex: 默认第几个面板被打开,从0开始  
    onSwitch(event, index): 点击切换面板,如果返回false,会阻止切换
     
     使用
     兼容IE6-8
     ```
     <wbr ms-widget="[{is:'ms-tabs'}, @config]"/>
     <wbr :widget="[{is:'ms-tabs'}, @config]"/>
     ```
     只支持现代浏览器(IE9+)
     ```
     <ms-tabs ms-widget="@config">
     </ms-tabs>
     <ms-tabs :widget="@config">
     </ms-tabs>
     ```   
     */
})
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var cssExtractor = new ExtractTextPlugin('/[name].css')

module.exports = {
    entry: {
        index: './main'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
       // libraryTarget: 'umd',
       // library: 'avalon'
    }, //页面引用的文件
    plugins: [
        new webpack.BannerPlugin('切换卡 by 司徒正美\n' + api)
    ],
    module: {
        loaders: [
            //http://react-china.org/t/webpack-extracttextplugin-autoprefixer/1922/4
            // https://github.com/b82/webpack-basic-starter/blob/master/webpack.config.js 
            {test: /\.html$/, loader: 'raw!html-minify'},
            {test: /\.scss$/, loader: cssExtractor.extract( 'css!sass')},
            {test: /\.(ttf|eot|svg|woff2?)((\?|#)[^\'\"]+)?$/, loader: 'file-loader?name=[name].[ext]'}

        ]
    },
    'html-minify-loader': {
        empty: true, // KEEP empty attributes
        cdata: true, // KEEP CDATA from scripts
        comments: true, // KEEP comments
        dom: {// options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
            lowerCaseAttributeNames: false, // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
        }
    },
    plugins: [
        cssExtractor,
        new webpack.ProvidePlugin({
            $: 'jquery', //加载$全局
            'window.avalon':'avalon2' //加载 avalon 全局 [******这里必须强制 window.avalon]
        }),
    ], 
    resolve: {
        alias: {
            'jquery': path.resolve(__dirname, 'app/_lib/jQuery-3.0.0.js'),
            'avalon':path.resolve(node_modules,'avalon2/dist/avalon.js')//这里就可以改成avalon.modern
        },
        
        extensions: ['.js', '', '.css']
    }
}

