#  **npm**
###  # npm(node package manager) node包管理器
> 
> 
> ######   创建
 1. 新建文件夹
 2. 执行cmd命令
> 
> ######   指令
   查看版本号
```
npm -v
```
   内置模块 
```
 http  url  fs 等
```
  需下载包
```
 bodyparser  express 等
```


 ######   npm管理包方面
 
> ######    下载 <br>
  1、本地（局部）下载<br>
```
安装本地开发依赖    -D --dev
安装本地线上依赖    -S --save
```
 2、 全局下载<br>
```
npm i 包  -g
```
 > ######    卸载 <br>
   1、本地卸载<br>
```
npm uninstall 包  -D / -S
```
 2、 全局卸载<br>
```
npm uninstall 包  -g
```
###   #nodejs
> nodejs --- commonjs规范

```

一个 js 就是一个模块

```
>  commonjs规范

 1、引入
 
```

引入模块：require（）  

注：默认会找 module.exports 抛出的内容

```
2、抛出（两种）

```
module.exports　&&　exports

关系：　exports是module.exports的别名

区别：　＊module.exports　后者会覆盖前者　写入一个对象里则不会被覆盖

　　　　＊exports　不能直接赋值　必须以属性的方式　例：exports.name
```
###   #npm包查找规则

> #####  require（模块标识）

1、 路径

```

./  相对路径    --当前目录

 /  绝对路径    --磁盘目录
 
```

2、包名


```

   （1） 先在当前文件下找，找不到再一层一层向上找直到磁盘目录，再找不到就往（全局配置环境变量NODE_PATH）全局路经查找
          -- npm root -g (查看全局下载包的路径)
          
   （2） 先找对应包名文件夹    有  ->  package.json   在main字段      
                             无  ->  index.js
                             
```
<br><br>
##### 报错： 不是内部外部命令

解决方法：找执行文件所在目录配置全局环境的path下<br><br><br>


###   #git生成公钥和密钥

> gitup支持两种协议：https & ssh

```
1.https: 每次提交代码，都需要输入用户名和密码

2.ssh: 配置公钥和密钥

     --设置忽略文件  （.gitignore）
```


### #设置镜像素


```

国外：  http://registry.npmjs.org /

淘宝：  http://registry.npm.taobao.org 

```


```
设置镜像源地址： config  set  registry

查看镜像源地址： config  get  registry
```

### #下载包步骤


```
1、对应的镜像素查看是否存在执行包

2、把指定的压缩包下载到指定的缓存目录下

3、把压缩包解压到指定目录

   --npm config get cache（查看缓存目录指令）
```


```
设置全局的解压目录

npm config set prefix <绝对路径>

获取全局的解压目录

npm config get prefix <绝对路径>

```

### #发包


```

npm镜像源地址必须是国外的

必须要有package.json文件

新建入口文件               -- 编写功能

npm login                 -- 登录 

npm publish               -- 发布

npm unpublish <包名> --force     （在24 小时内发的包可以删除）

```


### #npm常用的命令

```
 
npm view <包名> versions    查看所有版本号

npm view <包名> version     查看当前版本号

npm search <包名>           查找有没有

```
