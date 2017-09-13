<?php
  require 'config.php';

  $_pass=sha1($_POST['pass']);
  $query=mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['text']}' AND pass='{$_pass}'")or die('SQL错误');
  
  if (mysql_fetch_array($query,MYSQL_ASSOC)) {
    
  	echo 0;
  }else{
    sleep(3);
  	echo 1;
  }
  mysql_close();
?>