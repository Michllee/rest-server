# Nodejs-简介


## 同步与异步

--------------------------------------------
### 1.同步
同步可以理解为一步接着一步，直达完成当前所有步骤。<br>

举个餐馆订餐的例子：<br>
（1）小明去餐馆排队点餐，队伍排到小明，小明下单，店主接单<br>
（2）厨师做菜，小明依旧在队头等待，店主也在等待。<br>
（3）厨师完成菜品交给店主，店主交给小明，完成此单<br>
（4）店主接下一单。<br>


javascript:
```javascript
console.log("ajax start");
$.ajax({
    url:"//www.baidu.com/api/xxxx",
    type:"post",
    dataType:"json",
    async:false,
    success:function(r){
        console.log("ajax success");
    }
})

console.log("ajax end");
```
![](./ajax-synchronous.jpg)
******************************
### 2.异步
异步理解为完成部分操作后，继续下一项任务，当任务完成后发出通知继续执行第一项任务。<br>

依旧使用小明的例子：<br>
（1）小明去电话餐馆点餐，小明下单，店主接单<br>
（2）小明离开电话（do every thing he want）。店主继续接单，厨师做菜。<br>
（3）厨师完成菜品交给店主，店主电话通知小明，小明取餐。<br>

javascript:
```javascript
console.log("ajax start");
$.ajax({
    url:"//www.baidu.com/api/xxxx",
    type:"post",
    dataType:"json",
    success:function(r){
        console.log("ajax success");
    }
})

console.log("ajax end");
```
![](./ajax-asynchronus.jpg)

从上述两个例子可以基本看出同步相当于一次只专注一件事，异步反而三心二意了。但对计算机而言三心二意可能意味着完成的任务更多。<br>

--------------------------------------

## 异步编程
因为人们的思维习惯处理问题是次序排列的，对于异步可能会不习惯。这个不习惯可能主要体现在代码的处理上，下面直接砍例子吧。<br>
读写文件例子(主要使用nodejs的File System模块)：<br>

```javascript
var fs = require('fs');

/*
 **读取inner.txt中的文件内容写入 outer.txt中
 **使用mkdir,appendFile方法，皆为异步方法。
 */

// 同步写法--------此为错误写法
var globalData;
//创建inner.txt并写入123456789abcdefg\r\n
fs.appendFile('./inner.txt', "123456789abcdefg\r\n", (err) => {
    if (err) throw err;
    console.log('inner添加成功');
});
//读取inner.txt 赋值给globalData
fs.readFile('./inner.txt', (err, data) => {
    if (err) throw err;
    globalData = data;
    console.log("inner读取成功");
});
// 向outer.txt写入globalData（即inner.txt）内容
fs.appendFile('./outer.txt', globalData, (err) => {
    if (err) throw err;
    console.log('outer添加成功');
})


// 异步回调嵌套写法------正确写法。
fs.appendFile('./inner.txt', "123456789abcdefg\r\n", (err) => {
    if (err) throw err;
    console.log('inner添加成功');

    fs.readFile('./inner.txt', (err, data) => {
        if (err) throw err;

        console.log("inner读取成功");
        fs.appendFile('./outer.txt', data, (err) => {
            if (err) throw err;
            console.log('outer添加成功');
        })
    });
});


// 异步Promise写法---解决回调嵌套（此处应有跟简洁写法，我就胡乱试用一下）
var p1 = new Promise((resolve, reject) => {
    fs.appendFile('./inner.txt', "123456789abcdefg\r\n", (err) => {
        if (err) reject();
        resolve();
    });

});

p1.then(() => {
    console.log('inner添加成功');
    return new Promise((resolve, reject) => {
        fs.readFile('./inner.txt', (err, data) => {
            if (err) reject(err);
            resolve(data)

        });
    })
}).then((data) => {
    console.log("inner读取成功");
    return new Promise((resolve, reject) => {
        fs.appendFile('./outer.txt', data, (err) => {
            if (err) reject(err);
            resolve();
        })
    })

}).then(() => {
    console.log('outer添加成功');
});



//函数包裹解决回调嵌套
function f1() {
    fs.appendFile('./inner.txt', "123456789abcdefg\r\n", (err) => {
        if (err) throw err;
        console.log('inner添加成功');

        f2()
    });
}

function f2() {
    fs.readFile('./inner.txt', (err, data) => {
        if (err) throw err;
        console.log("inner读取成功");

        f3(data);

    });

}

function f3(data) {
    fs.appendFile('./outer.txt', data, (err) => {
        if (err) throw err;
        console.log('outer添加成功');
    })
}

f1();


```












