$(function(){
var socket;var AssetExchangeRate;var PairsDecimal={};var Loading=1;$(document).ready(function(){$(".closeBt").click(function(){$(".noticeBar").hide();});$(".searchBt").click(function(){search();});$(document).on("click",".favoriteIco",function(){$(this).toggleClass("favorited");if($(this).hasClass("favorited")){var state=1;}else{var state=0;}
var p=$(this).attr("data");fav(p,state)
if($(this).attr("fav")>0){if(state==0){$(this).parent().parent().remove();$(".favorited").each(function(){if($(this).attr("data")==p){$(this).removeClass("favorited");}});}}else{if(state==0){$(".favorited").each(function(){if($(this).attr("fav")==1&&$(this).attr("data")==p){$(this).parent().parent().remove();}
if($(this).attr("data")==p){$(this).removeClass("favorited");}});}else{var dom=$(this).parent().parent().clone();dom.find(".favoriteIco").attr("fav",1);$("#fav_th").after(dom);}}});Connect();charts();var asset_exchange_rate=$("#asset_exchange_rate").val();AssetExchangeRate=$.parseJSON(asset_exchange_rate);var pairs_decimal=$("#pairs_decimal").val();if(pairs_decimal.length>0){PairsDecimal=$.parseJSON(pairs_decimal);}
$(".t_cont span.price[rate]").each(function(){var tr=$(this).parents(".t_cont tr");var last_price=unFormatKKcoin(tr.find(".last_price").text());var rate=tr.find(".price[rate]").attr('rate');tr.find(".price[rate]").text(guzhi(bcmul(last_price,rate)));});$(".hotMarkets span.price[rate]").each(function(){var tr=$(this).parents(".item");var last_price=unFormatKKcoin(tr.find(".last_price").text());var rate=tr.find(".price[rate]").attr('rate');tr.find(".price[rate]").text(guzhi(bcmul(last_price,rate)));});})
function fav(pairs_id,state){$.get("/pairs/fav",{"pairs_id":pairs_id,"state":state},function(data){response(data);});}
function Connect(){try{socket=new WebSocket($("#ws_url").val()+'all@ticker');}catch(e){console.log("ws error");return;}
socket.onopen=sOpen;socket.onerror=sError;socket.onmessage=sMessage;socket.onclose=sClose;}
function sOpen(){console.log('connect success!');if(Loading==1){Loading=0;$("#loading").remove();$(".wrapper").show();}}
function sError(e){console.log("error "+e);}
function sMessage(msg){if(msg==null){console.log('msg is null');return false;}
var i=JSON.parse(msg.data);if(i[0]==undefined){return;}
var last_price=i[7];var change_rate=i[6];var high_price=i[9];var low_price=i[10];var volume=i[8];var pairs=i[0];updateAssetExchangeRate(pairs,last_price);if($(".last_price_"+i[0]).length==0){return false;}
var o=$(".last_price_"+i[0]).first().text();$(".last_price_"+i[0]).html(formatKKcoin(last_price,PairsDecimal[pairs]['price_decimal']));if(last_price<o){$(".last_price_"+i[0]).addClass("red").removeClass("green");}else{$(".last_price_"+i[0]).addClass("green").removeClass("red");}
var tr=$(".last_price_"+i[0]).parents(".t_cont tr");var rate=tr.find(".price[rate]").attr('rate');tr.find(".price[rate]").text(guzhi(bcmul(last_price,rate)));var hot_tr=$(".last_price_"+i[0]).parents(".hotMarkets .item");hot_tr.find(".price[rate]").text(guzhi(bcmul(last_price,rate)));var t=Number(change_rate*100).toFixed(2)+"%";$(".change_rate_"+i[0]).html(t);$(".change_top_"+i[0]).html(t);if(change_rate<0){$(".change_rate_"+i[0]).addClass("red").removeClass("green").removeClass("gray");$(".change_top_"+i[0]).addClass("desc").removeClass("asc");}else{$(".change_rate_"+i[0]).addClass("green").removeClass("red").removeClass("gray");$(".change_top_"+i[0]).addClass("asc").removeClass("desc");}
$(".high_price_"+i[0]).html(formatKKcoin(high_price,PairsDecimal[pairs]['price_decimal']));$(".low_price_"+i[0]).html(formatKKcoin(low_price,PairsDecimal[pairs]['price_decimal']));$(".volume_"+i[0]).html(formatKKcoin(Number(volume).toFixed(2),2));}
function sClose(e){setTimeout(Connect,5000);}
function Send(){}
function Close(){socket.close();}
function search(){var txt=$.trim($(".searchInput").val().toUpperCase());if(txt!=""){$(".t_cont:visible tr:not('.theader')").hide().each(function(){var keyword=$(this).find("td:eq(1)").text().toUpperCase();if(keyword.indexOf(txt)>=0){$(this).show();}});}else{$(".t_cont:visible tr:not('.theader')").show();}}
function updateAssetExchangeRate(pairs,last_price){var pairs_data=pairs.split("_");var base_asset=pairs_data[0];var quote_asset=pairs_data[1];if(AssetExchangeRate[quote_asset]==undefined){AssetExchangeRate[quote_asset]={};}
AssetExchangeRate[quote_asset][base_asset]=last_price;$("span.price[rate][pairs]").each(function(){var span_pairs=$(this).attr("pairs");if(span_pairs.length>0){var span_pairs_data=span_pairs.split("_");var span_rate=againstCNY(span_pairs_data[1]);$(this).attr("rate",span_rate);}});}
function againstCNY(symbol){if(symbol=='bitCNY'){return 1;}
if(is_null(AssetExchangeRate['bitCNY'][symbol])==false){return AssetExchangeRate['bitCNY'][symbol];}
if(symbol=='USC'){ExchangeRate=is_null(ExchangeRate)==true?("#exchange_rate").val():ExchangeRate;return ExchangeRate;}
if(is_null(AssetExchangeRate['BTC'][symbol])==false&&is_null(AssetExchangeRate['bitCNY']['BTC'])==false){return AssetExchangeRate['BTC'][symbol]*AssetExchangeRate['bitCNY']['BTC'];}
if(is_null(AssetExchangeRate['ETH'][symbol])==false&&is_null(AssetExchangeRate['bitCNY']['ETH'])==false){return AssetExchangeRate['ETH'][symbol]*AssetExchangeRate['bitCNY']['ETH'];}
if(is_null(AssetExchangeRate['USC'][symbol])==false&&is_null(AssetExchangeRate['USC']['ETH'])==false&&is_null(AssetExchangeRate['bitCNY']['ETH'])==false){return AssetExchangeRate['USC'][symbol]/AssetExchangeRate['USC']['ETH']*AssetExchangeRate['bitCNY']['ETH'];}
return 0;}
var ExchangeRate="";function guzhi(num){if(is_null(ExchangeRate)==true){ExchangeRate=$("#exchange_rate").val();}
if($("#languageBt").hasClass("cn")){var number=num.toFixed(2);return bccomp(number,0)<=0?"≈￥0.01":("￥"+number);}else{var number=bcdiv(num,ExchangeRate).toFixed(2);return bccomp(number,0)<=0?"≈$0.01":("$"+number);}}
function charts(){var cnt=$("#pincount").val();if(cnt>0){for(var i=0;i<cnt;i++){name="container"+i;chart(name);}}}
function chart(name){var chart=null;var symbol=$("#"+name).attr("data");$.getJSON('/index/klines?symbol='+symbol,function(data){chart=Highcharts.chart(name,{credits:{enabled:false},style:{backgroundColor:"#ebebeb",spacingLeft:0,marginLeft:0,},chart:{zoomType:'x'},title:{text:''},subtitle:{text:document.ontouchstart===undefined?'':''},margin:[0,0,0,0],xAxis:{labels:{enabled:false},visible:false,tickWidth:0,lineWidth:0,lineColor:'#FFFFFF',},yAxis:{labels:{enabled:false},visible:false,gridLineWidth:0,lineColor:'#FFFFFF',},tooltip:{dateTimeLabelFormats:{millisecond:'%H:%M:%S.%L',second:'%H:%M:%S',minute:'%H:%M',hour:'%H:%M',day:'%Y-%m-%d',week:'%m-%d',month:'%Y-%m',year:'%Y'}},legend:{enabled:false},plotOptions:{area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,'#FEFBF5'],[1,Highcharts.Color('#FEFBF5').setOpacity(1).get('rgba')]]},marker:{enabled:false,},lineWidth:1,lineColor:'#F8E9CE',states:{hover:{lineWidth:1}},threshold:null}},series:[{type:'area',name:'',data:data}]});});}


})