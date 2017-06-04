$(function(){
	getList(2,5);
})

function pageTemplate(){
	this.pageNo;
	this.pageSize;

	function getList(){
		$.ajax({
	        url:"http://10.0.22.203:8020/83/pagination/test.json",
	        data:{ "pageNo" : this.pageNo,"pageSize": this.pageSize },
	        type:"get",
	        dataType:"JSON",
	        success: function(data){
	        	var totalPage = data.data.length % pageSize ? (data.data.length / pageSize)+1 : (data.data.length / pageSize);
	        	paginations(this.pageNo,totalPage);
	
	        	insert(data.data.slice((this.pageNo-1)*this.pageSize,this.pageNo*this.pageSize));
	
	        },error: function(data){
	
	        }
	    })
	}

	function insert(data){
		var content = "";
		for(var i = 0; i < data.length; i++ ){
			content += "<li>"+data[i].id+" : "+data[i].title+"</li>"
		}
		$(".text").append(content);
	}

	function paginations(pageNo,totalPage){
	//	var totalPage = 100;  //总页数
	//	var pageNo = 20;		//当前页数
		var content = "";
		if(totalPage > 1 ){
			content += "<a "+(pageNo == 1? "class='page_gray'":"")+" href='"+(pageNo == 1? "javascript:;":"data-page='page'")+"'>&laquo;</a>";  //有效左侧
	
			for(var i = 1 ; i <= totalPage ; i++){
				if(totalPage>=10){
					var leftPage = pageNo - 1;
					var rightPage = totalPage - pageNo;
					if( leftPage > 10 && rightPage > 10 ){
						if( i == 3 || i == (totalPage-2) ) {
							content += "<span>...</span>";
						}else if( i == 1 || i == 2 || i == totalPage || i == totalPage-1 || i == pageNo || i == pageNo-1 || i == pageNo+1){
							content += "<a "+(i==pageNo? "class='selected'":"")+" href='javascript:;'>"+i+"</a>";
						}
					}else if( leftPage < rightPage ){
						if( ( pageNo < 6 && i <= 5 ) || ( i == totalPage || i == totalPage - 1 ) ){
							content += "<a "+(i==pageNo? "class='selected'":"")+" href='javascript:;'>"+i+"</a>";
						}else if( i == 6 ){
							content += "<span>...</span>";
						}
					}else if( leftPage > rightPage ){
						if( ( pageNo > 5 && i > 5 ) || ( i==1 || i==2 ) ){
							content += "<a "+(i==pageNo? "class='selected'":"")+" href='javascript:;'>"+i+"</a>";
						}else if(i == 3 ){
							content += "<span>...</span>";
						}
					}
				}else{
					content += "<a "+(i==pageNo? "class='selected'":"")+" href='javascript:;'>"+i+"</a>";
				}
			}
	
			if(pageNo == totalPage){
				content += "<a class='page_gray' href='javascript:;'>&raquo;</a>";	//无效左侧
			}else{
				content += "<a href='javascript:;'>&raquo;</a>";  //有效左侧
			}
		}
		$("#pagination").append(content);
	}

}
