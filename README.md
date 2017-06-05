# pagination
### 自定义分页插件

#### 说明
1. pagination.min.js是压缩后的核心代码, pagination.js是开发源代码
2. 将pagination.min.js引入项目中，可自定义样式，参考index.html中script配置分页参数

#### 简要
此插件目前依赖jquery开发，包小而简。具有优雅的内部代码，良好的性能体验，且项目全开源，您可以任意获取开源代码进行查看，参考与学习，可以免费的将他用于你的各个项目中
<pre>
<code> 
pageNo: 1,		         //可配置当前页 
pageSize: 1,		         //当前页显示条数 
pageStep: 10,		         //当前可见最多页码个数 
debug: true,		         //调试true，实际false, ( 调试时请将项目放到本地站点下测试 )
url: "test.json",		         //调用接口url
insert: function(data){		         //可配置页面插入内容  data为接口返回数据  
  var content = "";
  for(var i = 0; i < data.length; i++ ){
    content += "&lt;p>"+data[i].id+" : "+data[i].title+"&lt;/p>";
  }
  $(".text").html(content);
}
</code>
</pre>

#### 备注
此插件为个人开发，如有任何问题，欢迎随时提到邮箱yaoli199@163.com，谢谢！
