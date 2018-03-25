///alert和conform弹出框插件
window.popup=function(params){
	params = params || {};
	var defaults = {
		type: 'alert',//alert confirm
		title: '',
		text: '',
		alertBtnText: '确定',
		alertBtnFuc:function(){},
		confirmButtonText: '确定',
		confirmButtonFuc:function(){},
		confirmCancelText: '取消',
		confirmCancelFuc:function(){}
	};
	var type=params.type?params.type:defaults.type,
		title=params.title?params.title:defaults.title,
		text=params.text?params.text:defaults.text,
		alertBtnText=params.alertBtnText?params.alertBtnText:defaults.alertBtnText,
		alertBtnFuc=params.alertBtnFuc?params.alertBtnFuc:defaults.alertBtnFuc,
		confirmButtonText=params.confirmButtonText?params.confirmButtonText:defaults.confirmButtonText,
		confirmButtonFuc=params.confirmButtonFuc?params.confirmButtonFuc:defaults.confirmButtonFuc,
		confirmCancelText=params.confirmCancelText?params.confirmCancelText:defaults.confirmCancelText,
		confirmCancelFuc=params.confirmCancelFuc?params.confirmCancelFuc:defaults.confirmCancelFuc;
	var html="";
	if(text == ""){
		alert("请填写弹出框提示文字");
		return;
	}
	if(type == "alert"){
		html='<div id="popup"><div class="popBox"><h2 class="title">'+title+'</h2><div class="text">'+text+'</div><div class="btns"><a href="javascript:void(0)" class="submit">'+alertBtnText+'</a></div></div></div>';
		$("body").append(html);
		if(alertBtnFuc != ""){
			$(document).on("click","#popup .submit",function(){
				alertBtnFuc();
			})
		}
	}else if(type == "confirm"){
		html='<div id="popup"><div class="popBox"><h2 class="title">'+title+'</h2><div class="text">'+text+'</div><div class="btns"><a href="javascript:void(0)" class="submit">'+confirmButtonText+'</a><a href="javascript:void(0)" class="cancel">'+confirmCancelText+'</a></div></div></div>';
		$("body").append(html);
		if(confirmButtonFuc != ""){
			$(document).on("click","#popup .submit",function(){
				confirmButtonFuc();
			})
		}
		if(confirmCancelFuc != ""){
			$(document).on("click","#popup .cancel",function(){
				confirmCancelFuc();
			})
		}
	}
	if(title == ""){
		$("#popup .title").remove();
	}
	$(document).on("click","#popup .btns a",function(){
		$("#popup").remove();
	})
	$("#popup").on("touchmove",function(e){
		e.stopPropagation();
		e.preventDefault();
	})
}
/*popup使用方法
popup({
	text: '',//---------------------------弹出框提示文字**必填
	type: "confirm",//--------------------弹出框样式alert confirm**选填，默认alert
	title: '',//--------------------------弹出框标题**选填(蒙牛项目不写)
	confirmButtonText: '确定',//-----------confirm确认按钮的文字
	confirmButtonFuc:function(){...},//---confirm确认按钮执行的方法
	confirmCancelText: '取消',//-----------confirm取消按钮的文字
	confirmCancelFuc:function(){...}//----confirm取消按钮执行的方法
})
*/

function cue(msg,time){
	if(!msg){return}
	var t=time?time:1500;//如没传入时间默认为1500
	var html='<div id="cue"><span>'+msg+'</span></div>';
	$("body").append(html);
	setTimeout(function(){
		$("#cue").remove();
	},t)
}
/*cue使用方法
cue('修改成功！',//-----提示文字**必填
	2000//------------多长时间后消失**选填，默认1500
)
*/

/*下拉加载*/
window.dropLoad=function(params){
	params = params || {};
	var defaults = {
		obj:"window",
		fuc:function(){}
	};
	var obj=params.obj?params.obj:defaults.obj,
		fuc=params.fuc?params.fuc:defaults.fuc,
		flag=true;
	var scrollBox=$(obj),
		scrollCon=$(obj).children();
		if(obj==defaults.obj){
			scrollBox=$(window);
			scrollCon=$(document);
		}
	scrollBox.scroll(function(){
		var top=scrollBox.scrollTop();
		var boxH=scrollBox.height();
		var conH=scrollCon.height();
		console.log(top+"+"+boxH+"+"+conH);
		if(top+boxH>=conH){
			flag=false;
			fuc();
			setTimeout(function(){
				flag=true;
			},1000)
		}
	})
}
/*dropLoad使用方法
dropLoad({
	obj:".box",//--需要下拉加载的外部容器
	fuc:function(){
		f()//------下拉到底部后执行的方法
	}
})
*/
