## 项目开发中！！！！！未完成！！！！！！！！！！

### 遇到的问题：
    1. 
        - 问题：图片上传
        - 解决：new formData 再塞入
    2.  
        - 问题：图片使用formdata传输,但axios会的默认模式会造成formdata数据丢失
        - 解决：设置 headers:{"Content-Type": "multipart/form-data"}才能成功发送
    3.  
        - 问题：服务端接收formdata并读取数据
        - 解决：在node服务器端 使用multiparty处理formdata数据 并将文件保存到服务器
    4.  
        - 问题：服务器保存图片后返回图片地址
        - 解决：将get请求字符串+？+图片相对路径(files.'append的id+[0]'.path)拼接
    5.  
        - 问题：通过图片地址get图片
        - 解决：在服务器get请求req.query获取图片相对路径 还需要用path处理成绝对路径 才能用sendFile()
    6.  
        - 问题：行文过程中删除图片如何删除相应记录 并删除图片
        - 解决：用Map在上传时保存 这样删除时就可以对应key来删除记录 再将url替换关键部分 发起get请求以删除图片
    7.  
        - 问题：接收文章数据报错
        - 解决：将上一条的Map数据 item取出到一个数组 在发送后端
    8. 
        - 问题：数据保存失败
        - 解决：multiparty模块的fields里数据无法直接拿出 拿出后是数组 需要[0]取出 否则瞪眼瞎找不到问题(没错，说的就是我自己)