$(function(){$(".headerUserBar li.item").hover(function(){$(this).find(".userItemSon").show();},function(){$(this).find(".userItemSon").hide();});$("#languageBt").hover(function(){$(".languageSwitch").show();},function(){$(".languageSwitch").hide();});});function setLang(lang){setCookie("lang",lang);location.reload();}
function setCookie(name,value){var Days=30;var exp=new Date();exp.setTime(exp.getTime()+Days*24*60*60*1000);document.cookie=name+"="+escape(value)+";path=/;expires="+exp.toGMTString();}
function getCookie(name){var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");if(arr=document.cookie.match(reg)){return unescape(arr[2]);}else{return null;}}
function delCookie(name){var exp=new Date();exp.setTime(exp.getTime()-1);var cval=getCookie(name);if(cval!=null){document.cookie=name+"="+cval+";expires="+exp.toGMTString();}}
function isEmail(str){var reg=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;return reg.test(str);}
function isPass(str){var reg=/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,20}/;return reg.test(str);}
function isEmpty(id){if($(id).val().length==0){$("#error").show();$("#error_show").html(Lang.input_cant_empty);$(id).addClass("error");return true;}else{$("#error").hide();$(id).removeClass("error");return false;}}
function response(data){if(data['msg']!=undefined&&data['msg'].length>0){if(data['code']==undefined){data['code']=0;}
var icon=Number(data['code'])==0?6:2;var time=data['msg'].length<6?2000:4000;layer.msg(data['msg'],{time:time,icon:icon},function(){if(data['url']!=undefined&&data['url'].length>0){window.location.href=data['url'];}});}else{if(data['url']!=undefined&&data['url'].length>0){window.location.href=data['url'];}}}
function isJson(str){try{$.parseJSON(str);}catch(e){return false;}
return true;}
function stopDefault(e){if(e&&e.preventDefault){e.preventDefault();}else{window.event.returnValue=false;}}
function compare_date(min_time,max_time){var min_date=new Date(min_time.replace(/-/g,"/"));var max_date=new Date(max_time.replace(/-/g,"/"));if(min_date>max_date){return-1;}else if(min_date==max_date){return 0}else if(min_date<max_date){return 1;}}
function toUtf8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i);}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}}
return out;}
function rtrim_zero(number){return Number(number).toString();}
function formatKKcoin(number,len){number=number.toString();if(len==undefined||len===null){if(number.indexOf('.')==-1){len=0;}else{len=number.slice(number.indexOf('.')+1).length;}}
return number_format(number,len,",",3);}
function number_format(number,bit,sign,gapnum){number=number||0;bit=!isNaN(bit=Math.abs(bit))?bit:2;sign=sign||",";gapnum=gapnum?gapnum:3;var decimal=".";var negative=number<0?"-":"";var i=parseInt(number=Math.abs(+number||0).toFixed(bit),10)+"";var j=(j=i.length)>gapnum?j%gapnum:0;var rule=eval("/(\\d{"+gapnum+"})(?=\\d)/g");return negative+(j?i.substr(0,j)+sign:"")+i.substr(j).replace(rule,"$1"+sign)+(bit?decimal+Math.abs(number-i).toFixed(bit).slice(2):"");}
function bcadd(a,b){if(a==undefined||a==null){a=0;}
if(b==undefined||b==null){b=0;}
var number_a=numeral(a);var result=number_a.add(b).value();return result;}
function bcsub(a,b){if(a==undefined||a==null){a=0;}
if(b==undefined||b==null){b=0;}
var number_a=numeral(a);var result=number_a.subtract(b).value();return result;}
function bcmul(a,b){if(a==undefined||a==null){a=0;}
if(b==undefined||b==null){b=0;}
var number_a=numeral(a);var result=number_a.multiply(b).value();return result;}
function bcdiv(a,b){if(a==undefined||a==null){a=0;}
if(b==undefined||b==null){return 0;}
var number_a=numeral(a);var result=number_a.divide(b).value();return result;}
function bccomp(a,b){a=Number(a);b=Number(b);if(a>b){return 1;}else if(a<b){return-1;}else{return 0;}}
function showGoogleBlinding(){var index=layer.open({type:1,title:false,shadeClose:true,closeBtn:0,scrollbar:false,shade:0.8,area:'590px',shadeClose:false,content:$('#google_blind_pop')});$("#google_blind_pop .closePopBt,.skipBt").on("click",function(){layer.close(index);});}
function getPercent(a){return bcmul(a,100).toFixed(2)+"%";}
function unFormatKKcoin(str){return str.replace(/,/g,"");}
function is_null(a){if(a==undefined||a==null||a==""){return true;}
return false;}
Date.prototype.format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));}
for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));}}
return fmt;};$.fn.serializeJson=function(){var serializeObj={};var disabled=$(this).find(':disabled');disabled.removeAttr('disabled');var array=this.serializeArray();disabled.attr('disabled','disabled');$(array).each(function(){if(serializeObj[this.name]!=undefined){if($.isArray(serializeObj[this.name])){serializeObj[this.name].push(this.value);}else{serializeObj[this.name]=[serializeObj[this.name],this.value];}}else{serializeObj[this.name]=this.value;}});return serializeObj;};(function($){$.fn.extend({getCurPos:function(){var curCurPos='';var all_range='';if(navigator.userAgent.indexOf("MSIE")>-1){if($(this).get(0).tagName=="TEXTAREA"){all_range=document.body.createTextRange();all_range.moveToElementText($(this).get(0));}else{all_range=$(this).get(0).createTextRange();}
$(this).focus();var cur_range=document.selection.createRange();cur_range.moveEnd('character',-cur_range.text.length)
cur_range.setEndPoint("StartToStart",all_range);curCurPos=cur_range.text.length;}else{$(this).focus();curCurPos=$(this).get(0).selectionStart;}
return curCurPos;},setCurPos:function(start,end){if(navigator.userAgent.indexOf("MSIE")>-1){var all_range='';if($(this).get(0).tagName=="TEXTAREA"){all_range=document.body.createTextRange();all_range.moveToElementText($(this).get(0));}else{all_range=$(this).get(0).createTextRange();}
$(this).focus();all_range.moveStart('character',start);all_range.moveEnd('character',-(all_range.text.length-(end-start)));all_range.select();}else{$(this).focus();$(this).get(0).setSelectionRange(start,end);}},});})(jQuery);