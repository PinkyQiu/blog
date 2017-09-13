$(function() {
  // 个人中心下拉列表
  $('.right').hover(function() {
    $(this).css('background', 'url(./img/top.ico) no-repeat 76px 10px');
    $('.list').show().animate({
      t: 20,
      step: 10,
      mul: {
        o: 100,
        h: 120
      }
    });
  }, function() {
    $(this).css('background', 'url(./img/btm.ico) no-repeat 76px 10px');
    $('.list').animate({
      t: 20,
      step: 10,
      mul: {
        o: 0,
        h: 0
      },
      fn: function() {
        $('.list').hide();
      }
    });
  })

  //锁屏
  var screen = $('#screen');
  // 登录框
  var login = $('#login');
  login.center(250, 166).resize(function() {
    if (login.css('display') == 'block') {
      screen.lock();
    };
  })

  $('.header-login').click(function() {
    login.center(250, 166).show();
    screen.lock().animate({
      attr: 'o',
      target: 70,
      t: 30,
      step: 10
    });
  })


  $('#login .close').click(function() {
      login.hide();
      screen.animate({
        attr: 'o',
        target: 0,
        t: 30,
        step: 10,
        fn: function() {
          screen.unlock();
        }
      })
    })
    // 注册框
  var reg = $('#reg');
  reg.center(480, 510).resize(function() {
    if (login.css('display') == 'block') {
      screen.lock();
    };
  })

  $('.header-reg').click(function() {
    reg.center(480, 510).show();
    screen.lock().animate({
      attr: 'o',
      target: 70,
      t: 30,
      step: 10
    });
  })
  $('#reg .close').click(function() {
    reg.hide();
    screen.animate({
      attr: 'o',
      target: 0,
      t: 30,
      step: 10,
      fn: function() {
        screen.unlock();
      }
    })
  })

  //登录拖拽
  login.drag($('#login h2').first());
  //注册拖拽
  reg.drag($('#reg h2').first());

  //分享框
  var innerHeight = getInner().height;
  var shareHeight = parseInt(getStyle($('#share').first(), 'height'));
  var centerHeight = (innerHeight - shareHeight) / 2;

  // 滚动条滚动
  $('#share').css('top', centerHeight + getScroll().top + 'px');

  $(window).bind('scroll', function() {
    $('#share').css('top', centerHeight + getScroll().top + 'px');

  })

  $('#share').hover(function() {
    $(this).animate({
      'attr': 'x',
      'target': 0,
      'start': -200
    })
  }, function() {
    $(this).animate({
      'attr': 'x',
      'target': -200,
      'start': 0
    })
  })

  // 滑块移动
  $('.nav .about li').hover(function() {
    var target = $(this).first().offsetLeft;
    var current = $('.nav .nav-bg').first().offsetLeft;
    $('.nav .nav-bg').animate({
      attr: 'x',
      start: current,
      target: target + 13,
      t: 10,
      fn: function() {
        $('.nav .white').animate({
          attr: 'x',
          start: current,
          target: -target
        })
      }
    })
  }, function() {
    var current = $('.nav .nav-bg').first().offsetLeft;
    $('.nav .nav-bg').animate({
      attr: 'x',
      start: current,
      target: 20,
      fn: function() {
        $('.nav .white').animate({
          attr: 'x',
          start: current,
          target: 0
        })
      }
    })
  })

  $('.sidebar h2').toggle(function() {
    $(this).next().animate({
      mul: {
        h: 0,
        o: 0
      }
    });
  }, function() {
    $(this).next().animate({
      mul: {
        h: 140,
        o: 100
      }
    });
  })

  //初始化表单操作
  $('form').eq(1).first().reset();


  var userTips = $('.form-right .tips');
  var userError = $('.form-right .error');
  var userYes = $('.form-right .yes');
  var userZhan = $('.form-right .zhanyong');


  function userErrorShow(target) {
    userTips.hide();
    userError.hide();
    userYes.hide();
    userZhan.hide();
    if (target) {
      $('.form-right .' + target).show();
    }
  }
  // 表单验证
  $('form').eq(1).form('user').bind('focus', function() {
    userErrorShow('tips');
  }).bind('blur', function() {
    if (trim($(this).value()) == '') {
      userErrorShow();
    } else if (!/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))) {
      userErrorShow('error');
    } else if (!checkUser()) {
      userErrorShow('zhanyong');
    }else {
      userErrorShow('yes');
    }
  });

  function checkUser() {
    var flag=true;
    ajax({
      method: 'post',
      url: 'isUser.php',
      async: false,
      data: $('form').eq(1).serialize(),
      success: function(text) {       
        if (text == 1) {
          userErrorShow('zhanyong');       
          flag=false;
        }else{
          flag=true;
        }
      }
    })
    return flag;
  }

  var pwdSafe = $('.form-right .safe');
  var pwdError1 = $('.form-right .error1');
  var pwdYes1 = $('.form-right .yes1');
  var pwdSafe1 = $('.form-right .safe1');
  var pwdSafe2 = $('.form-right .safe2');
  var pwdSafe3 = $('.form-right .safe3');
  var pwdSafe4 = $('.form-right .safe4');
  var pwdSafe5 = $('.form-right .safe5');
  var pwdSafe6 = $('.form-right .safe6');
  var pwdSafe7 = $('.form-right .safe7');
  var pwdSafe8 = $('.form-right .safe8');

  function pwdErrorShow(target) {
    pwdSafe.hide();
    pwdError1.hide();
    pwdYes1.hide();
    pwdSafe1.hide();
    pwdSafe2.hide();
    pwdSafe3.hide();
    pwdSafe4.hide();
    pwdSafe5.hide();
    pwdSafe6.hide();
    pwdSafe7.hide();
    pwdSafe8.hide();
    if (target) {
      $('.form-right .' + target).show();
    }
  }

  //密码验证
  var pwdIsOk = false;
  $('form').eq(1).form('password').bind('focus', function() {
    pwdErrorShow('safe')
  }).bind('blur', function() {
    if (trim($(this).value()) == '') {
      pwdErrorShow()
    } else if (checkPass()) {
      pwdErrorShow('yes1')
      pwdIsOk = true;
    } else {
      pwdErrorShow('error1')
      pwdIsOk = false;
    }
  });
  //密码强度验证,
  $('form').eq(1).form('password').bind('keyup', function() {
    checkPass()
  })

  function keyupHandle() {}

  // 密码验证函数
  function checkPass() {
    if (pwdIsOk) return true
    var value = trim($('form').eq(1).form('password').value());
    var value_length = value.length;
    var code_length = getCodeLength(value);
    // 第一种，6-20个字符
    if (value_length >= 6 && value_length <= 20) {
      pwdErrorShow('safe1');
    } else {
      pwdErrorShow('safe');
    }
    // 第二种，字母或数字或非空
    if (value_length > 0 && !/\s/.test(value)) {
      pwdErrorShow('safe2')
    } else {
      pwdErrorShow('safe')
    }
    // 符合第一和第二种情况
    if (value_length >= 6 && value_length <= 20 && !/\s/.test(value)) {
      pwdErrorShow('safe3')
    }
    if (code_length >= 2) {
      pwdErrorShow('safe4')
    };
    // 三种都满足
    if (isPwdPassed(value)) {
      pwdErrorShow('safe5')
    }
    // 等级为高
    if (value_length >= 10 && code_length >= 3) {
      pwdErrorShow('safe6')
    } else if (value_length >= 8 && code_length >= 2) {
      pwdErrorShow('safe7')
    } else if (value_length >= 1) {
      pwdErrorShow('safe8')
    };
    return isPwdPassed();
  }

  function getCodeLength(value) {
    var codeLength = 0;
    // 第三种的验证，大小写，数字，非空任意两种混拼
    if (/[\d]/.test(value)) {
      codeLength++;
    };
    if (/[a-z]/.test(value)) {
      codeLength++;
    };
    if (/[A-Z]/.test(value)) {
      codeLength++;
    };
    if (/[^\w]/.test(value)) {
      codeLength++;
    };
    return codeLength
  }

  function isPwdPassed() {
    var value = trim($('form').eq(1).form('password').value());
    var value_length = value.length;
    var code_length = getCodeLength(value);
    if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
      return true;
    } else {
      return false;
    }
  }

  // 密码确认
  var psAgain = $('.form-right .again');
  var psNo = $('.form-right .no');
  var psYes2 = $('.form-right .yes2');

  function passErrorShow(target) {
    psAgain.hide();
    psNo.hide();
    psYes2.hide();
    if (target) {
      $('.form-right .' + target).show();
    }
  }
  $('form').eq(1).form('pass').bind('focus', function() {
    passErrorShow('again');
  }).bind('blur', function() {
    if (trim($(this).value()) == '') {
      passErrorShow();
    } else if (checkPassAgain()) {
      passErrorShow('yes2');

    } else {
      passErrorShow('no');
    }
  });

  function checkPassAgain() {
    if (trim($('form').eq(1).form('pass').value()) == trim($('form').eq(1).form('password').value())) {
      return true;
    };
  }


  //提问
  $('form .ques').bind('change', function() {
    if (checkQues()) {
      $('.form-right .select').hide();
    };
  })

  function checkQues() {
    if ($('form .ques').value() != 0) {
      return true;
    };
  }




  // 回答
  var ansAnsag=$('.form-right .ansag');
  var ansAns=$('.form-right .ans');
  var ansYes3=$('.form-right .yes3');
  function answerErrorShow(target) {
    ansAnsag.hide();
    ansAns.hide();
    ansYes3.hide();
    if (target) {
      $('.form-right .' + target).show();
    }
  }

  $('form').eq(1).form('answer').bind('focus', function() {
    answerErrorShow('ansag');
  }).bind('blur', function() {
    if (trim($(this).value()) == '') {
      answerErrorShow();
    } else if (checkAns()) {
      answerErrorShow('yes3');
    } else {
      answerErrorShow('ans');
    }
  });

  function checkAns() {
    if (trim($('form').eq(1).form('answer').value()).length >= 2 && trim($('form').eq(1).form('answer').value()).length <= 32) {
      return true;
    };
  }



  // 电子邮件
  var emailList=$('.form-right .email-list');
  var emailE=$('.form-right .email');
  var emailYes4=$('.form-right .yes4');
  var emailNo=$('.form-right .emailno');

  function emailErrorShow(target) {
    emailList.hide();
    emailE.hide();
    emailYes4.hide();
    emailNo.hide();
    if (target) {
      $('.form-right .' + target).show();
    }
  }

  $('form').eq(1).form('email').bind('focus', function() {
    if ($(this).value().indexOf('@') == -1) {
      emailErrorShow('email-list');
    }
    //光标移入显示邮箱
    emailErrorShow('email');
  }).bind('blur', function() {
    //光标移出显示邮箱
    emailErrorShow();
    if (trim($(this).value()) == '') {
      emailErrorShow();

    } else if (checkEmail()) {
      emailErrorShow('yes4');
    } else {
      emailErrorShow('emailno');
    }
  });

  function checkEmail() {
    if (/^[\w\.\-]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(1).form('email').value()))) {
      return true;
    };
  }



  // 电子邮件补全系统键入
  var emailListLi=$('.form-right .email-list li');
  $('form').eq(1).form('email').bind('keyup', function(event) {
    if ($(this).value().indexOf('@') == -1) {
      emailList.show();
      $('.form-right .email-list span').html($(this).value());
    } else {
      emailList.hide();
    }


    emailListLi.css('background', 'none');
    emailListLi.css('color', '#666');
    // 键盘下键
    if (event.keyCode == 40) {
      if (this.index == undefined || this.index >= emailListLi.length() - 1) {
        this.index = 0;
      } else {
        this.index++;
      }

      emailListLi.eq(this.index).css('background', '#e5edf2');
      emailListLi.eq(this.index).css('color', '#369');

    };

    // 键盘上键
    if (event.keyCode == 38) {
      if (this.index == undefined || this.index <= 0) {
        this.index = emailListLi.length() - 1;
      } else {
        this.index--;
      }

      emailListLi.eq(this.index).css('background', '#e5edf2');
      emailListLi.eq(this.index).css('color', '#369');

    };



    // 键盘确认
    if (event.keyCode == 13) {
      $(this).value(emailListLi.eq(this.index).text());
      emailList.hide();
      this.index = undefined;
    };
  })


  // 电子邮件补全系统点击获取

  emailListLi.bind('mousedown', function() {
    $('form').eq(1).form('email').value($(this).text());
  })


  // 电子邮件补全系统移入移出效果
  emailListLi.hover(function() {
    $(this).css('background', '#e5edf2');
    $(this).css('color', '#369');
  }, function() {
    $(this).css('background', 'none');
    $(this).css('color', '#666');
  })

  // 年月日
  var year = $('form').eq(1).form('year');
  var month = $('form').eq(1).form('month');
  var day = $('form').eq(1).form('day');

  var day30 = [4, 6, 9, 11];
  var day31 = [1, 3, 5, 7, 8, 10, 12];

  // 注入年
  for (var i = 1960; i <= 2017; i++) {
    year.first().add(new Option(i, i), undefined);
  };

  // 注入月
  for (var i = 1; i <= 12; i++) {
    month.first().add(new Option(i, i), undefined);
  };


  year.bind('change', select_day);
  month.bind('change', select_day);
  day.bind('change', function() {
    if (checkBirthday()) {
      $('.form-right .select1').hide();
    };
  });

  function checkBirthday() {
    if (year.value() != 0 && month.value() != 0 && day.value() != 0) {
      return true;
    }
  }

  function select_day() {
    if (year.value() != 0 && month.value() != 0) {

      // 清理之前的注入
      day.first().options.length = 1;

      //不确定的日
      var cur_date = 0;

      //注入日
      if (inArray(day31, parseInt(month.value()))) {
        cur_date = 31;
      } else if (inArray(day30, parseInt(month.value()))) {
        cur_date = 30;
      } else {
        if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0) {
          cur_date = 29;
        } else {
          cur_date = 28;
        }
      }

      for (var i = 1; i <= cur_date; i++) {
        day.first().add(new Option(i, i), undefined);
      };

    } else {

      // 清理之前的注入
      day.first().options.length = 1;

    }
  }

  //备注
  var formTips=$('form').eq(1).form('tips');
  var formRightNum=$('.form-right .num');
  var formRightStrong=$('.form-right .num strong');

  formTips.bind('keyup', checkTips);
  formTips.bind('paste', function() { //粘贴事件会在内容粘贴到文本框之前触发
    setTimeout(checkTips, 50);
  });

  // 清尾
  $('.form-right .num .clean').click(function() {
    formTips.value(formTips.value().substring(0, 200));
    checkTips();
  })


  function checkTips() {
    var num = 200 - formTips.value().length;
    if (num >= 0) {
      formRightNum.eq(0).show();
      formRightStrong.eq(0).html(num);
      formRightNum.eq(1).hide();
      return true;
    } else {
      formRightNum.eq(1).show();
      formRightStrong.eq(1).html(Math.abs(num));
      formRightNum.eq(0).hide();
      return false;
    };
  }



  //提交
  $('.form-right .finish').click(function() {
    var flag = true;
    // 验证用户名是否空白
    if ((!checkUser())||(!/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value())))) {
      userError.show();
      flag = false;
    };

    // 验证密码是否空白
    if (!isPwdPassed()) {
      pwdError1.show();
      flag = false;
    };

    // 确认密码是否空白
    if (!checkPassAgain()) {
      psNo.show();
      flag = false;
    };

    // 提问
    if (!checkQues()) {
      $('.form-right .select').show();

      flag = false;
    };

    // 回答
    if (!checkAns()) {
      ansAns.show();

      flag = false;
    };

    // 电子邮件
    if (!checkEmail()) {
      emailNo.show();

      flag = false;
    };

    // 年月日
    if (!checkBirthday()) {
      $('.form-right .select1').show();

      flag = false;
    };

    // 备注
    if (!checkTips()) {

      flag = false;
    };

    if (flag) {
      var _this=this; 
      $('#loading').show().center(240, 40).html('正在注册，请稍后');
      _this.disabled=true;
      $(_this).css('backgroundPosition','right');
      ajax({
        method: 'post',
        url: 'add.php',
        async: true,
        data: $('form').eq(1).serialize(),
        success: function(text) {
          if (text == 1) {
            $('#loading').hide();
            $('#success').show().center(240, 40).html('注册成功，请登录');
            setTimeout(function() {
              $('#success').hide();
              reg.hide();
              userYes.hide();
              pwdYes1.hide();
              psYes2.hide();
              ansYes3.hide();
              emailYes4.hide();
              formRightStrong.eq(0).html(200);
              $('form').eq(1).first().reset();
              _this.disabled=false;
              $(_this).css('backgroundPosition','left');
              screen.animate({
                attr: 'o',
                target: 0,
                t: 30,
                step: 10,
                fn: function() {
                  screen.unlock();
                }
              })
            }, 1500)
          };
        }
      })
    };
  })

  //登录验证
  $('form').eq(0).form('sub').click(function() {
    if (/[\w]{2,20}/.test(trim($('form').eq(0).form('text').value()))&&($('form').eq(0).form('pass').value().length>=6)) {     
      $('#login .info').hide();
      $('#loading').show().center(240, 40).html('正在登陆，请稍后');
      var _this=this;
      _this.disabled=true;
      $(_this).css('backgroundPosition','right'); 
      ajax({
        method: 'post',
        url: 'isLogin.php',
        async: true,
        data: $('form').eq(0).serialize(),
        success: function(text) {
          $('#loading').hide();         
          if (text==1) {
            $('#login .info').show().html('用户名或密码不正确');
          }else{
            $('#login .info').hide();
            $('#success').show().center(240, 40).html('登录成功，请稍后');
            setCookie('user',trim($('form').eq(0).form('text').value()));
            setTimeout(function() {
              $('#success').hide();
              $('form').eq(0).first().reset();
              login.hide();
              screen.animate({
                attr: 'o',
                target: 0,
                t: 30,
                step: 10,
                fn: function() {
                  screen.unlock();
                }
              })
          $('.header .header-login .login').css('display','none');
          $('.header .header-reg .reg').css('display','none');
          $('.header .successInfo').css('display','block').html(getCookie('user')+',您好');
            }, 1500)
          }
          _this.disabled=false;
          $(_this).css('backgroundPosition','left');
          
          
        }
      }) 
    }else{
      $('#login .info').show();
    }
  })

  

  //轮播器初始化
  // bannerImg.hide();
  // bannerImg.eq(0).show();
  var bannerImg=$('#banner img');
  var bannerLi=$('#banner ul li');
  bannerImg.opacity(0);
  bannerImg.eq(0).opacity(100);
  bannerLi.eq(0).css('color', '#333');
  $('#banner strong').html(bannerImg.eq(0).attr('alt'));

  // 轮播计数器
  var banner_index = 1;
  //自动轮播器
  var banner_timer = setInterval(banner_fn, 2000);
  //1为左右滚动，2为上下滚动
  var banner_type = 2;
  //手动轮播器
  bannerLi.hover(function() {
    clearInterval(banner_timer);

    if ($(this).css('color') != 'rgb(51,51,51)' && $(this).css('color') != '#333') {
      banner(this, banner_index == 0 ? bannerLi.length() - 1 : banner_index - 1);
    };
  }, function() {
    banner_index = $(this).index() + 1;
    banner_timer = setInterval(banner_fn, 2000);
  })

  function banner(obj, prev) {

    bannerLi.css('color', '#999');
    $(obj).css('color', '#333');
    $('#banner strong').html(bannerImg.eq($(obj).index()).attr('alt'));

    if (banner_type == 1) {
      bannerImg.eq(prev).animate({
        attr: 'o',
        target: 0,
        step: 10,
        t: 50
      }).css('zIndex', 1);
      bannerImg.eq($(obj).index()).animate({
        attr: 'o',
        target: 100,
        step: 10,
        t: 30
      }).css('zIndex', 2);
    } else if (banner_type == 2) {
      bannerImg.eq(prev).animate({
        attr: 'y',
        target: 600,
        step: 5,
        t: 30
      }).css('zIndex', 1).opacity(100);
      bannerImg.eq($(obj).index()).animate({
        attr: 'y',
        target: 0,
        step: 5,
        t: 30
      }).css('top', '-600px').css('zIndex', 2).opacity(100);
    };
  }

  function banner_fn() {
    if (banner_index >= bannerLi.length()) {
      banner_index = 0;
    };
    banner(bannerLi.eq(banner_index).first(), banner_index == 0 ? bannerLi.length() - 1 : banner_index - 1);
    banner_index++;
  }


  // 延迟加载
  var photoImg = $('#photo .photo-list img');
  var imgTimer = null;
  photoImg.opacity(0);
  $(window).bind('scroll', function() {
    if (imgTimer) {
      clearTimeout(imgTimer)
    }
    imgTimer = setTimeout(function() {
      for (var i = 0; i < photoImg.length(); i++) {
        var _this = photoImg.get(i);
        if (getInner().height + getScroll().top >= offsetTop(_this)) {
          $(_this).attr('src', $(_this).attr('xsrc')).animate({
            attr: 'o',
            target: 100,
            t: 50
          });
        }
      };

    }, 100)
  })

  // 图片弹窗
  var photoBig = $('#photoBig');
  var photoBigImg=$('#photoBig .bigList img');
  photoBig.center(404, 434).resize(function() {
    if (photoBig.css('display') == 'block') {
      screen.lock();
    };
  })

  photoImg.click(function() {
    photoBig.center(404, 434).show();
    screen.lock().animate({
      attr: 'o',
      target: 70,
      t: 30,
      step: 10
    });

    var tempImg = new Image(); //创建一个临时区域存放图片

    $(tempImg).bind('load', function() {
      photoBigImg.attr('src', tempImg.src).animate({
        attr: 'o',
        target: 100
      }).css('width', '400px').css('height', '400px').css('top', 0).css('left', 0).opacity(0);
    })

    tempImg.src = $(this).attr('xsrc'); //ie要把这个放在后面才有效

    // 加载某一张图时上一张和下一张也加载完成
    var children = this.parentNode;
    preNext(children);

  })
  $('#photoBig .close').click(function() {
    photoBig.hide();
    screen.animate({
      attr: 'o',
      target: 0,
      t: 30,
      step: 10,
      fn: function() {
        screen.unlock();
      }
    })

    photoBigImg.css('src', './img/load.png').css('top', '160px').css('left', '160px');
  })

  //登录拖拽
  photoBig.drag($('#photoBig h2').first());


  //图片鼠标滑过
  var photoBigSLeft=$('#photoBig .bigList .sLeft');
  var photoBigSL=$('#photoBig .bigList .sl');
  var photoBigSRight=$('#photoBig .bigList .sRight');
  var photoBigSR=$('#photoBig .bigList .sr');
  photoBigSLeft.hover(function() {
    photoBigSL.animate({
      attr: 'o',
      target: 50,
      t: 50
    })
  }, function() {
    photoBigSL.animate({
      attr: 'o',
      target: 0,
      t: 50
    })
  })

  photoBigSRight.hover(function() {
    photoBigSR.animate({
      attr: 'o',
      target: 50,
      t: 50
    })
  }, function() {
    photoBigSR.animate({
      attr: 'o',
      target: 0,
      t: 50
    })
  })

  //图片上一张
  photoBigSLeft.click(function() {
    photoBigImg.css('src', './img/load.png').css('top', '160px').css('left', '160px');
    var currentImg = new Image();
    $(currentImg).bind('load', function() {
      photoBigImg.attr('src', currentImg.src).animate({
        attr: 'o',
        target: 100,
        t: 50
      }).opacity(0).css('width', '400px').css('height', '400px').css('top', 0).css('left', 0);
    })

    currentImg.src = $(this).attr('src');

    var children = photoImg.get(prevIndex(photoBigImg.attr('index'), $('#photo .photo-list').first())).parentNode;
    preNext(children);
  })

  //图片下一张
  photoBigSRight.click(function() {
    photoBigImg.css('src', './img/load.png').css('top', '160px').css('left', '160px');
    var currentImg = new Image();
    $(currentImg).bind('load', function() {
      photoBigImg.attr('src', $(this).attr('src')).animate({
        attr: 'o',
        target: 100,
        t: 50
      }).opacity(0).css('width', '400px').css('height', '400px').css('top', 0).css('left', 0);
    });
    currentImg.src = $(this).attr('src');

    var children = photoImg.get(nextIndex(photoBigImg.attr('index'), $('#photo .photo-list').first())).parentNode;
    preNext(children);
  })


  function preNext(children) {
    var prev = prevIndex($(children).index(), children.parentNode);
    var next = nextIndex($(children).index(), children.parentNode);
    var prevImg = new Image();
    var nextImg = new Image();
    prevImg.src = photoImg.eq(prev).attr('bigsrc');
    nextImg.src = photoImg.eq(next).attr('bigsrc');

    photoBigSLeft.attr('src', prevImg.src);
    photoBigSRight.attr('src', nextImg.src);
    photoBigImg.attr('index', $(children).index());

    $('#photoBig .bigList .index').html(parseInt($(children).index()) + 1 + '/' + photoImg.length());

  }

  //发表弹窗
  var blog = $('#blog');
  blog.center(550, 410).resize(function() {
    if (blog.css('display') == 'block') {
      screen.lock();
    };
  })

  $('.header .list .passage').click(function() {
    blog.center(550, 410).show();
    screen.lock().animate({
      attr: 'o',
      target: 70,
      t: 30,
      step: 10
    });
  })
  $('#blog .close').click(function() {
    blog.hide();
    screen.animate({
      attr: 'o',
      target: 0,
      t: 30,
      step: 10,
      fn: function() {
        screen.unlock();
      }
    })
  })

  //博客拖拽
  blog.drag($('#blog h2').first());

  $('form').eq(2).form('submit').click(function() {
    if (trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0) {
      $('#blog .blog-form .info').show();
    }else{
      var _this=this;
      $('#blog .blog-form .info').hide(); 
      $('#loading').show().center(240, 40).html('正在发表博文，请稍后');
      _this.disabled=true;
      $(_this).css('backgroundPosition','right');
      ajax({
        method: 'post',
        url: 'addBlog.php',
        async: true,
        data: $('form').eq(2).serialize(),
        success: function(text) {
          if (text == 1) {
            $('#loading').hide();
            $('#success').show().html('发表成功,请稍后...').center(240, 40);
            setTimeout(function() {
              $('#success').hide();
              $('#blog').hide();
              $('form').eq(2).first().reset();
              _this.disabled=false;
              $(_this).css('backgroundPosition','left');
              screen.animate({
                attr: 'o',
                target: 0,
                t: 30,
                step: 10,
                fn: function() {
                  screen.unlock();
                  $('#main .index').html('<span class="load"></span>');
                  $('#main .index .load').show();
                  ajax({
                    method: 'get',
                    url: 'getBlog.php',
                    async: true,
                    data: {},
                    success: function(text) {
                      $('#main .index .load').hide();
                      var json=JSON.parse(text);
                      var html='';
                      for (var i = 0; i < json.length; i++) {
                        html+='<div class="content"><h2><span>'+json[i].date+'</span>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
                      };
                      $('#main .index').html(html);
                      for (var i = 0; i < json.length; i++) {
                        $('#main .index .content').eq(i).animate({
                          attr:'o',
                          target:100,
                          t:50
                        })
                      }
                    } 
                  })
                }
              })
            }, 1500)
          };
        }
      })
    }
  })

  // 博客
  $('#main .index').html('<span class="load"></span>');
  $('#main .index .load').show();
  ajax({
    method: 'get',
    url: 'getBlog.php',
    async: true,
    data: {},
    success: function(text) {
      $('#main .index .load').hide();
      var json=JSON.parse(text);
      var html='';
      for (var i = 0; i < json.length; i++) {
        html+='<div class="content"><h2><span>'+json[i].date+'</span>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
      };
      $('#main .index').html(html);
      for (var i = 0; i < json.length; i++) {
        $('#main .index .content').eq(i).animate({
          attr:'o',
          target:100,
          t:50
        })
      }
    } 
  })


  
  // 换肤
  var skin = $('#skin');
  skin.center(525, 490).resize(function() {
    if (skin.css('display') == 'block') {
      screen.lock();
    };
  })

  $('.header .list .changeSkin').click(function() {
    skin.center(525, 490).show();
    screen.lock().animate({
      attr: 'o',
      target: 70,
      t: 30,
      step: 10
    });
    $('#skin .skinBg .skinList').html('<span class="load"></span>');
    ajax({
      method: 'post',
      url: 'getSkin.php',
      async: true,
      data: {
        'type':'all'
      },
      success: function(text) {
        var json=JSON.parse(text);
        var html='';
        for (var i = 0; i < json.length; i++) {
          html+= '<li>'
            +'<img src="./img/'+json[i].small_bg+'" bigsrc="'+json[i].big_bg+'">'
            +'<div class="skin">'+ json[i].bg_text +'</div>'
          +'</li>'
        };
        $('#skin .skinBg .skinList').html(html).opacity(0).animate({
          attr:'o',
          target:100,
          t:30
        });

        $('#skin .skinBg .skinList img').click(function() {
          $('body').css('background','url(./img/'+$(this).attr('bigsrc')+')');
          ajax({
            method: 'post',
            url: 'getSkin.php',
            async: true,
            data: {
              'type': 'set',
              'big_bg':$(this).attr('bigsrc')
            },
            success: function(text) {
              $('#success').show().center(240, 40).html('换肤成功');
              setTimeout(function() {
                $('#success').hide();
                skin.hide();
                screen.unlock();

              },1500);
            }
          })
        })
      }
    })
  })
  $('#skin .close').click(function() {
    skin.hide();
    screen.animate({
      attr: 'o',
      target: 0,
      t: 30,
      step: 10,
      fn: function() {
        screen.unlock();
      }
    })
  })

  //博客拖拽
  skin.drag($('#skin h2').first());


  //默认显示背景样式
    ajax({
      method: 'post',
      url: 'getSkin.php',
      async: true,
      data: {
        'type': 'main'
      },
      success: function(text) {
        var json=JSON.parse(text);
        $('body').css('background','url(./img/'+json.big_bg+')');

      }
    })

  
  



})
