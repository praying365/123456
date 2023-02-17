$(function(){
	
	$('#fullpage').fullpage({
		anchors: ['1', '2', '3', '4','5'],
		menu: '#pagefull',
		
		


//		controlArrowColor:red,
		
//		图片上下小点位置
//		navigation:true,
		
    	css3:true,
    	
//  	字体随着窗口的变化而变化
    	resize:true,
    	
    	autoScrolling:true,
    	
//  	左右滑动是否循环
    	loopHorizontal:true,
    	
//  	滚动速度
    	scrollingSpeed:700,
    	
//  	图片左右小点位置
    	slidesNavigation:true
    	

//		上下来回滚动
//  	continuousVertical:true
//  	css3： true


    });
    
    setInterval(function(){
    	$.fn.fullpage.moveSlideRight();
//  	$.fn.fullpage.fadingEffect(true);
    },4000)
})
