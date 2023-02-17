$(function ($) {

            var options = {
                $SlideDuration: 1000,                    //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                //默认持续时间
                $DragOrientation: 1,                    //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $Cols is greater than 1, or parking position is not 0)
				//拖动方向									//[可选]方向拖动滑块，0没有阻力，1水平，2纵，3，默认值为1（注：应为dragorientation美元美元美元playorientation时一般大于1，或停车位置不0相同）
                $AutoPlay: 1,                           //[Optional] Auto play or not, to enable slideshow, this option must be set to greater than 0. Default value is 0. 0: no auto play, 1: continuously, 2: stop at last slide, 4: stop on click, 8: stop on user navigation (by arrow/bullet/thumbnail/drag/arrow key navigation)
                $Idle: 2500,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
				//滑动的间隔
				
                $BulletNavigatorOptions: {              //[Optional] Options to specify and enable navigator or not
                    $Class: $JssorBulletNavigator$,     //[Required] Class to create navigator instance
                    $ChanceToShow: 2,                   //[Required] 0 Never, 1 Mouse Over, 2 Always
                    $Steps: 1,                          //[Optional] Steps to go for each navigation request, default value is 1
                    $Rows: 1,                           //[Optional] Specify lanes to arrange items, default value is 1
                    $SpacingX: 10,                      //[Optional] Horizontal space between each item in pixel, default value is 0
                    $SpacingY: 10,                      //[Optional] Vertical space between each item in pixel, default value is 0
                    $Orientation: 1                     //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
                },

                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,      //[Requried] Class to create arrow navigator instance
                    $ChanceToShow: 2                    //[Required] 0 Never, 1 Mouse Over, 2 Always
                }
            };

            var jssor_slider1 = new $JssorSlider$('slider1_container', options);
            //make sure to clear margin of the slider container element
            jssor_slider1.$Elmt.style.margin = "";

            //#region responsive code begin
            //the following code is to place slider in the center of parent container with no scale
            function ScaleSlider() {

                var containerElement = jssor_slider1.$Elmt.parentNode;
                var containerWidth = containerElement.clientWidth;

                if (containerWidth) {
                    var expectedWidth = Math.min(containerWidth, jssor_slider1.$OriginalWidth());

                    //scale the slider to original height with no change
                    jssor_slider1.$ScaleSize(expectedWidth, jssor_slider1.$OriginalHeight());

                    jssor_slider1.$Elmt.style.left = ((containerWidth - expectedWidth) / 2) + "px";
                }
                else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }

            ScaleSlider();

            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //#endregion responsive code end
        });