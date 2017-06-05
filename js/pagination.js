/*
 * Descreiption: 分页插件
 * Email: yaoli199@163.com
 * Version: 0.0.2
 * Author: Dolores
 * Date: 2017-06-04
 */
(function($) {
	$.fn.pageTemplate = function(opts){
		var htmlTmp = "<div class='pageHtml'></div>";
		var pageTmp = "<div id='pagination'></div>";
		var _temp = htmlTmp + pageTmp
		$(this).append(_temp);
		var optsDefault = {pageNo:1, pageSize:10};
		opts = opts ? opts : optsDefault;
		if(!opts.pageStep){
			opts.pageStep = optsDefault.pageStep;
		}
		return this.each(function() {
	      	ajaxData(opts);
	    });
		function ajaxData(opts){
			$.ajax({
		        url: opts.url,
		        data:{ "pageNo" : opts.pageNo,"pageSize": opts.pageSize },
		        type:"get",
		        dataType:"JSON",
		        success: function(data){
		        	var totalPage = opts.debug? (data.data.length % opts.pageSize ? (data.data.length / opts.pageSize)+1 : (data.data.length / opts.pageSize)):data.totalPage;
		        	var data = data.data.slice((opts.pageNo-1)*opts.pageSize,opts.pageNo*opts.pageSize);
		        	pagination(opts.pageNo,totalPage);
		        	opts = opts.insert ? opts.insert(data) : insert(data);
		        },error: function(data){
					console.log(data);
		        }
		    })
		}
		function insert(data){	//插入html
			var content = "";
			for(var i = 0; i < data.length; i++ ){
				content += "<li>"+data[i].id+" : "+data[i].title+"</li>"
			}
			$(".pageHtml").html(content);
		}
		function pagination(pageNo,totalPage){
			var content = "";
			if(totalPage > 1 ){
				content += "<a"+(pageNo == 1? " class='page_gray'":" data-page='"+(pageNo-1)+"'")+" href='javascript:;'>&laquo;</a>";  //左箭头
				for(var i = 1 ; i <= totalPage ; i++){
					if(totalPage>=opts.pageStep){
						var leftPage = pageNo - 1;
						var rightPage = totalPage - pageNo;
						if( leftPage > 10 && rightPage > 10 ){
							if( i == 3 || i == (totalPage-2) ) {
								content += "<span>...</span>";
							}else if( i == 1 || i == 2 || i == totalPage || i == totalPage-1 || i == pageNo || i == pageNo-1 || i == pageNo+1){
								content += "<a "+(i==pageNo? "class='selected'":"data-page='"+i+"'")+" href='javascript:;'>"+i+"</a>";
							}
						}else if( leftPage < rightPage ){
							if( pageNo < 5 ){
								if( i <= 5 || i == totalPage-1 || i == totalPage ){
									content += "<a "+(i==pageNo? "class='selected'":"data-page='"+i+"'")+" href='javascript:;'>"+i+"</a>";
								}else if( i == 6 ){
									content += "<span>...</span>";
								}
							}else {
								if( i == 1 || i == 2 || i == 3 || i == pageNo-1 || i == pageNo || i == pageNo+1 || i == totalPage-1 || i == totalPage ){
									content += "<a "+(i==pageNo? "class='selected'":"data-page='"+i+"'")+" href='javascript:;'>"+i+"</a>";
								}else if( i == 4 || i == totalPage-2 ){
									content += "<span>...</span>";
								}
							}
						}else if( leftPage >= rightPage ){
							if( pageNo > totalPage - 4 ) {
								if( i == 1 || i == 2 || i >= totalPage-4 ) {
									content += "<a "+(i==pageNo? "class='selected'":"data-page='"+i+"'")+" href='javascript:;'>"+i+"</a>";
								}else if( i == 3 ){
									content += "<span>...</span>";
								}
							}else{
								if( i == 1 || i == 2 || i == pageNo-1 || i == pageNo || i == pageNo+1 || i == totalPage-2 || i == totalPage-1 || i == totalPage+1 ){
									content += "<a "+(i==pageNo? "class='selected'":"data-page='"+i+"'")+" href='javascript:;'>"+i+"</a>";
								}else if( i == 3 || i == pageNo+2 ){
									content += "<span>...</span>";
								}
							}
						}
					}else{
						content += "<a "+(i==pageNo? "class='selected'":"data-page='"+i+"'")+" href='javascript:;'>"+i+"</a>";
					}
				}
				content += "<a"+(pageNo == totalPage? " class='page_gray'":" data-page='"+(pageNo+1)+"'")+" href='javascript:;'>&raquo;</a>";  //右箭头
			}
			$("#pagination").html(content);
			//click event
			$("#pagination").children("a[data-page]").on("click",function(){
				pageNo = $(this).attr('data-page');
				opts.pageNo = parseInt(pageNo);
				ajaxData(opts);
			})
		}
	}
})(jQuery);