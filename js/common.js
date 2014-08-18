/**
 * Created by Administrator on 14-7-29.
 */


var console = console || function log(){};
/**
 * 将json转换为Array数组
 */
function json2Array(param){

}

/**
 * 验证手机号码是否正确
 * @param string
 * @return bool
 */
function checkPhone(string){
    if(string == null || string.length != 11){
        return false;
    }
    var reg = new RegExp('^1[3|4|5|6|8|9|7][0-9]{9}$');
    return reg.test(string)
}

/**
 * 跳转到指定的页面,不需要.html后缀
 * @param href
 * @param is_ref 是否回退到当前的页面
 * @param param object
 */
function go(href,is_ref,param){

    if(href.indexOf('.html') < 0){
        var url = href + '.html';
    }else{
        var url = href;
    }

    if(is_ref == undefined || is_ref == null){
        is_ref = false;
    }
    ref = encodeURIComponent(window.location.href);
    if(ref && is_ref){    //如果为真,
            url = url + "?ref="+ref+ '&' + object2UrlParam(param);
    }else{
        if(url.indexOf("?") > -1){
            url = url + "&" + object2UrlParam(param);
        }else{
            url = url + "?" + object2UrlParam(param);
        }

    }

    location.href = url;
}

/**
 * 对像转换为参数字符串
 * @param param
 * @returns {string}
 */
function object2UrlParam(param){
    var url = '';
    for(var v in param){
        url += v + '=' + param[v] + '&';
    }
    return url.substr(0,url.length- 1);
}

function goCar(id){
    go("order_car.html?id="+id,false);
}

/**
 * 获取URL中参数的信息
 * @param url url地址
 * @param name 只返回指定的参数值
 * @return null|object
 */
function getUrlParam(url,name){
    var params = url.substr(url.indexOf("?")+1);
    var param_array = params.split("&");
    var result = {};
    for(var v in param_array){
        var tmp = param_array[v].split("=");
        result[tmp[0]] = tmp[1];
    }
    if(name != undefined){
        return result[name] || null;
    }
    return result;
}


/**
 * 对日期与时间进行格式化
 * @param format
 * @param timestamp
 */
function time_format(format,timestamp){
    if(format == 'Y-m-d'){  //支持只显示日期
        return timestamp2date(timestamp);
    }else if(format == 'Y-m-d H:i:s'){ //支持显示日期与时间
        return timestamp2date(timestamp) + ' ' + timestamp2time(timestamp);
    }else if(format == 'Y-m-d H:i'){    //支持显示日期时间
        return timestamp2date(timestamp) + ' ' + timestamp2time(timestamp,'H:i');
    }
}

/**
 * 将日期类型转换为时间戳
 * @param date
 * @return int 毫秒级
 */
function date2timestamp(date){
    if(date == undefined){
        return 0;
    }
    var timestamp = Date.parse(date);
    return timestamp;
}
/**
 * 时间戳转换成日期字符串
 * @param int timestamp 时间戳为毫秒级
 * @return string
 */
function timestamp2date(timestamp){
    var year,month,day;
    var date = new Date(parseInt(timestamp));
    year = date.getFullYear();
    month = date.getMonth();
    month = month + 1;
    if(month < 10){ //将月份扩充为2位
        month = "0" + month;
    }
    day = date.getDate();
    if(day < 10){
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
}

/**
 * 时间戳转换成Time
 * @param int timestamp 时间戳为毫秒级
 * @param string format
 * @return string
 */
function timestamp2time(timestamp,format){
    var hour,minute,second;
    var date = new Date(parseInt(timestamp));

    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();

    if(format == 'H:i'){
        return hour + ":" + minute;
    }else{
        return hour + ':' + minute + ':' + second;
    }

}

/**
 * 将时间戳换成周几
 * @param int timestamp 时间戳为毫秒级
 * @return int
 */
function timestamp2day(timestamp){
    var day;
    var date =  new Date(parseInt(timestamp));
    day = date.getDay();
    return day;
}

/**
 * 获取限行的时间轴
 * @param selector
 */
function getLimitHtml(selector){
    var width = parseInt($(selector).css('width'));
    var minter = width/24;
    var left = minter * 7;
    var width = minter * 20 - left;
    var html = '<p class="time_bar_yellw"  style="width:'+width+'px;left:'+left+'px;"></p> ';
    return html;
}

/**
 * 获取订单页的时间轴
 * @param selector
 * @param order_time
 * @returns {string}
 */
function getOrderHtml(selector,order_time){
    if(order_time.length == 0){
        return '';
    }
    var width = parseInt($(selector).css('width'));
    var minter = width/24/60;   //精确到分钟
    var start_time = formatTime(order_time.start_time); //获取从00:00到订单开始时间所差的分钟数
    var end_time = formatTime(order_time.end_time);   //获取从00:00到订单结束的所差的分钟数

    var left = minter * start_time;
    var width = (end_time - start_time) * minter;

    var html = '<div style="left: '+left+'px;width:'+width+'px;">' +
        '<span><b>'+order_time.start_time+'</b></span><span><b>'+order_time.end_time+'</b></span></div>';
    return html;
}

var formatTime=function(str)
    {
        if(str == undefined){
            return '';
        }
        var arrTime=str.split(":");
        var minit=arrTime[0]*60+arrTime[1]*1;
        return minit;
    }

/**
 * 获取URL中,指定的参数
 * @param name
 * @returns {*}
 */
function getQueryStringRegExp(name)
{
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
}
/**
 * 获取车牌号最后一位的数字
 * 如果最后一位为字母,则为0
 * @param string number
 * @return int
 */
function getLastNum(number){
    var last_number = number.substr(-1);
    last_number = parseInt(last_number);
    if(isNaN(last_number)){
        last_number = 0;
    }
    return last_number;
}

