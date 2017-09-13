$().extend('drag', function() {
  var tags = arguments;
  for (var i = 0; i < this.elements.length; i++) {
    addEvent(this.elements[i], 'mousedown', function(ev) {
      if (trim(this.innerHTML).length == 0) {
        preDef(ev);
      };
      var ev = getEvent(ev);
      var _this = this;
      var disX = ev.clientX - _this.offsetLeft;
      var disY = ev.clientY - _this.offsetTop;

      // 自定义拖拽区域
      var flag = false;
      for (var i = 0; i < tags.length; i++) {
        if (getTarget(ev) == tags[i]) {
          flag = true;
          break;
        };
      };
      if (flag) { //点击h2时才移动
        addEvent(document, 'mousemove', move);
        addEvent(document, 'mouseup', up);
      } else {
        removeEvent(document, 'mousemove', move);
        removeEvent(document, 'mouseup', up);
      }

      function move(ev) {
        var ev = getEvent(ev);
        var left = ev.clientX - disX;
        var top = ev.clientY - disY;
        if (left < 0) {
          left = 0;
        } else if (left <= getScroll().left) {
          left = getScroll().left;
        } else if (left > getInner().width + getScroll().left - _this.offsetWidth) {
          left = getInner().width + getScroll().left - _this.offsetWidth;
        }
        if (top < 0) {
          top = 0;
        } else if (top <= getScroll().top) {
          top = getScroll().top;
        } else if (top > getInner().height + getScroll().top - _this.offsetHeight) {
          top = getInner().height + getScroll().top - _this.offsetHeight;
        }
        _this.style.left = left + 'px';
        _this.style.top = top + 'px';
        if (typeof _this.setCapture != 'undefined') { //ie鼠标锁定时触发
          _this.setCapture();
        };
      }

      function up() {
        removeEvent(document, 'mousemove', move);
        removeEvent(document, 'mouseup', up);
        this.onmouseup = null;
        if (typeof _this.releaseCapture != 'undefined') { //ie鼠标释放时触发
          _this.releaseCapture();
        };
      }
    })
  }
  return this;
})
