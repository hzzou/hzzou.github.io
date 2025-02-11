### 记录

* IntersectionObserver做进入视口监控
* /car 是运动的轿车，ThreeJS框架实现
* /olympic 是react-three-fibers实现冰墩墩
* /star 是react-three-fiber实现运动的轿车
* /lazy-img 原生懒加载图片实现
* /house 是react-three-fiber实现3D看房
* /china 是react-three-fiber实现3D中国地图
* /cube 是react-three-fiber实现3D魔方
* /calendar 是使用自己封装的hzlzh-react-ui组件库中的日历组件

### 静态部署配置
* 静态页面只能有一个页面，所以路由是不起作用的
* 纯静态，没有其它文档脚手架参与，则需要建立仓库名为username.github.io (第一段必须是用户名，否则虽然能获取到资源，但页面仍旧404)
* vite获取环境变量还需要vite中自带loadEnv支持，defineConfig由对象变为函数
* 因为gitpages的静态部署文件夹是某分支(比如master分支)下不是root文件夹就是docs文件夹，所以得把打包目录名称改为docs
* 部署到github Pages时，可在.env.production中配置仓库名称(如：VITE_BASE_URL = /react-three-fiber)，以便在vite.config.ts中修改base配置

## 原子化

* npx tailwindcss init只生成tailwind.config.js
* npx tailwindcss init -p 生成tailwind.config.js和postcss.config.js
* 全局引入有bug,tailwind.css文件中包含了那三个文件，但是引入不生效,只能单独引入
* p-2,m-2等这些数字相关的像素是以rem为基准，即根元素设置的字体大小(默认16px)，所以可以在配置文件里面进行更改

## Docker部署
* docker build ./ -t 包名, 打包镜像
* docker rmi 镜像名, 删除镜像
* docker container ls 查看运行的容器
* docker container ps -a/docker ps -a 列出正在运行的和已停止的容器
* docker container create -p 8090:80 镜像名称  //使用镜像创建一个容器,让真实端口8090和容器80端口对应(容器的端口取决于你项目里写的nginx.conf配置文件)
* docker container start 容器id 运行某个容器 
* stop/pause/remove 容器id 容器停止/暂停/移除
* docker exec -it 容器id bash 进入容器的系统
* 若本地部署测试可以，docker部署同样的代码刷新还是404，有可能是nginx配置对相同的端口写了两份配置，可查看所有nginx.conf配置是否对一个端口写了两份配置
* 若要在容器中安装相关工具，比如vim, 先执行apt-get update, 再执行apt-get install vim

