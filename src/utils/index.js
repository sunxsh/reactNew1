import { colorArr } from './varbile'
export default class Tools {
  createALabel(path, fileName = '') {
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = path
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(path)
  }
  formatDate($date, $format) { // 这个是自定义的时间号的方法
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, // 月份
        "D+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
      };
      if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    return new Date($date).Format($format);
  }
  delEmptyString(parps) {
    let data = Object.assign(parps);
    Object.keys(parps).forEach((key) => (data[key] === null || data[key] === undefined) && delete data[key]);
    return data;
  }
  findAncestry(data2, nodeId2) {
    let arrRes = [];
    if (data2.length === 0) {
      if (!!nodeId2) {
        arrRes.unshift(data2)
      }
      return arrRes.map(item => item.id);
    }
    let rev = (data, nodeId) => {
      for (let i = 0, length = data.length; i < length; i++) {
        let node = data[i];
        if (node.id === nodeId) {
          arrRes.unshift(node)
          rev(data2, node.pid);
          break;
        }
        else {
          if (!!node.children) {
            rev(node.children, nodeId);
          }
        }
      }
      return arrRes;
    };
    arrRes = rev(data2, nodeId2);
    return arrRes.map(item => item.id);
  }
  getTime(date){
    return new Date(date).getTime();
  }
  getMonthDay(year, month) {
   return new Date(year, month + 1, 0).getDate();
  }
  /**
   * @param {String} val
   * @param {Number} number
   * @return {String} 返回新的值
   */
  overHiddleText(val,number){
    if(val.length>number){
        return val.substring(0,number)+'...';
    }else{
           return val;
    }
  }
  statusColor(status){
     if(status === 'Canceled'){
       return colorArr[1];
     }else if(status === 'Pending'){
      return colorArr[0];
     }else{
      return colorArr[2];
     }
  }
   deepCopy (obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是一个对象
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      // 遍历obj,并且判断是obj的属性才拷贝
      if (obj.hasOwnProperty(key)) {
        // 判断属性值的类型，如果是对象递归调用深拷贝
        newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  }
}
