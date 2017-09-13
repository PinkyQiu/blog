// 设置cookie
function setCookie(name, value, expires, path, domain, secure) {
  var cookieName = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  if (expires instanceof Date) {
    cookieName += ';expires' + expires;
  };
  if (path) {
    cookieName += ';path' + path;
  };
  if (domain) {
    cookieName += ';domain' + domain;
  };
  if (secure) {
    cookieName += ';secure';
  };
  document.cookie = cookieName;
}

//获取cookie
function getCookie(name) {
  var cookieName = encodeURIComponent(name) + '=';
  var cookieStart = document.cookie.indexOf(cookieName);
  var cookieValue=null;
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart);
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length;
    };
    cookieValue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
  };
  return cookieValue;
}

//过期时间
function setCookieDate(day) {
  var date = null;
  if (typeof day == 'number' && day > 0) {
    date = new Date();
    date.setDate(date.getDate() + day);
  } else {
    throw new Error('您传递是天数不合法，请传递数字');
  }
  return date;
}

