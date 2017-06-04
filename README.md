# pagination
### 自定义分页插件

此控件依赖jquery,包小而简，支持用户自定义配置

<pre><code> 
+  pageNo: 1,		   //可配置当前页 
+  pageSize: 1,	   //当前页显示条数 
+  pageStep: 10,   //当前可见最多页码个数 
+  debug: true,	   //调试true，实际false, 
+  url: "http://127.0.0.1:8020/pagination/test.json", //调用接口url
+  insert: function(data){   //可配置页面插入内容
    var content = "";
    for(var i = 0; i < data.length; i++ ){
      content += "&lt;p>"+data[i].id+" : "+data[i].title+"&lt;/p>"
    }
    $(".text").html(content);
  }
</code></pre>
