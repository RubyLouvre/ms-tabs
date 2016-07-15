# ms-tabs
avalon2的切换卡

![tabs](tabs.gif)

##API
```
buttons: [], 字符串数组
panels: [], 字符串数组 , 最好用插槽元素传入
selectedIndex: 默认第几个面板被打开,从0开始  
onSwitch(event, index): 点击切换面板,如果返回false,会阻止切换
```