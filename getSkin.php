<?php
  require 'config.php';
  if ($_POST['type']=='all') {	
	  $query=mysql_query("SELECT small_bg,big_bg,bg_text FROM blog_skin LIMIT 0,4")or die('SQL错误');

	  $json='';

	  While(!!$row=mysql_fetch_array($query,MYSQL_ASSOC)) {
	  	$json.=json_encode($row).',';
	  }
	  sleep(2);
	  echo '['.substr($json,0,strlen($json)-1).']';
	}else if($_POST['type']=='main') {
		$query=mysql_query("SELECT big_bg FROM blog_skin WHERE bg_flag=1")or die('SQL错误');
    echo json_encode(mysql_fetch_array($query,MYSQL_ASSOC));
	}elseif ($_POST['type']=='set') {
		mysql_query("UPDATE blog_skin SET bg_flag=0 WHERE bg_flag=1")or die('SQL错误');
		mysql_query("UPDATE blog_skin SET bg_flag=1 WHERE big_bg='{$_POST['big_bg']}'")or die('SQL错误');
		echo mysql_affected_rows();
	}
  mysql_close();
  
?>