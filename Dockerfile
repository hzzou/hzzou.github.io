
# 指定base镜像(在什么镜像上工作, 即需要什么环境)
FROM nginx
# 复制到镜像的/usr/share/nginx/html/目录下
# 需要和nginx.conf里面的root对应
COPY  docs/  /usr/share/nginx/html/
COPY  nginx.conf /etc/nginx/conf.d/default.conf

