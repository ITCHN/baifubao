$(function(){
	var url="http://www.eduoautoweb.com/client/http/public.php";
	var op = $("#list");
	//默认显示全部车辆
	fillHTML(url,{'item':'searchStationsByOrder','type':''});
	op.change(function() { //下拉列表框选项改变事件
        var selected = $("#list option:selected");
		var value=selected.val();
		if (value=="all") {
			var param={'item':'searchStationsByOrder','type':''};
		}else{
			var param={'item':'searchStationsByOrder','type':'has_order'};
		}	
		fillHTML(url,param);
		});
//填充HTML页面代码
	function fillHTML(URL,Param){
    	var url=URL;
    	var param=Param;
    	$.getJSON(url,param,function(data){
		 	$(".main_index").empty();
		 	var strhtml="";
		 	if(data.errno == 2000){ 
		 	 	car=0;
		 	 	if(data.content.length!=0){
				 		$.each(data.content, function(k,v){
						$.each(v.cars,function(kk,vv){
							car++;   
							if((car-1)%3==0||car==1){  //每3辆分组
								if(car==1){
									strhtml += '<div class="pagedemo _current" id="p'+car+'" >';
									}else{
										var index=(car-1)/3+1;
										strhtml += '<div class="pagedemo" id="p'+index+'" style="display:none;" >';
									}
							}
							strhtml += '<div class="main_car" >';
							strhtml += '<img src="'+vv.car_img+'">';		
							strhtml += '<div class="information">';
				            strhtml += '<ul>';
							strhtml += '<li><span>'+ vv.name +'</span></li>';
				            strhtml += ' <li ><p>'+ v.name+'</p></li>';
				            strhtml += '</ul>';
				            strhtml += '</div>'; 
				           	strhtml +='<div class="car_time"></div>';
				            <!-- 时间轴 start  -->          
							strhtml +='<div class="time_bar">';
							if(vv.orderTime.length != 0){
				                    $.each(vv.orderTime,function(ordk,ordv){
				                        $.each(ordv,function(kkk,vvv){
				                        	strhtml += getOrderHtml('.main_index',vvv);
				                        });
				                        return false;
				                    });
				                }
							strhtml +='</div>';
							<!-- 时间轴 end --> 
							strhtml +='</div>';
							if(car%3==0){
								strhtml +='</div>';
							}
						});
					});
				$(".main_index").html(strhtml);
				$("#pullUp").show();
				};
			};
		});
    };
})