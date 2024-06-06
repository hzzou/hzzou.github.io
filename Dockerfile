
# 指定base镜像(在什么镜像上工作, 即需要什么环境)
FROM nginx
# 复制到镜像的/usr/share/nginx/html/或相关目录下
# 需要和nginx.conf里面的root对应
COPY  docs/  /app/docs/
# 必须要覆盖conf.d/default.conf,因为里面写了端口80的配置
# 若不想覆盖则可以更改nginx.conf使用其他端口
#COPY  nginx.conf /etc/nginx/conf.d/nginx.conf
COPY  nginx.conf /etc/nginx/conf.d/default.conf

