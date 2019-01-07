<?php

if(empty($_REQUEST['exp'])) {
  die('Heu d\'introduir un valor per al paràmetre "exp"');
}

$exp = $_REQUEST['exp'];
echo('<pre>');
echo('Expressió: "'.$exp.'"<br>');
echo('SHA256: "'.hash('sha256', $exp).'"');
echo('</pre>');
