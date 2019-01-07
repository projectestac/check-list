<?php

/**
 * File: login/index.php
 * 
 * Linted with PHP_CodeSniffer (http://pear.php.net/package/PHP_CodeSniffer/)
 * against PEAR standards (https://pear.php.net/manual/en/standards.sample.php)
 * with phpcbf
 * 
 * PHP Version 7
 * 
 * @category Service
 * @package  Api
 * @author   Francesc Busquets <francesc@gmail.com>
 * @license  https://www.tldrlegal.com/l/eupl-1.1 EUPL-1.1
 * @link     https://github.com/projectestac/checklist
 */

require_once '../config.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();
    if(isset($_GET['clear']))
        $_SESSION['codi']=null;
    else if(!empty($_SESSION['codi']))
        $response = array('codi' => $_SESSION['codi']);
}
else if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    die('Bad request');
}
else {
    // Set-up database connection:
    $dbConn = new PDO(
        'mysql:dbname='.DB_NAME.
        ';host='.DB_HOST.
        ';charset='.DB_CHARSET,
        DB_USER, DB_PASSWORD
    );

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);
    
    if (empty($input['codi']) || empty($input['pwd'])) {
        http_response_code(400);
        die('Manquen paràmetres!');
    }
    
    $codi = $input['codi'];
    $pwd = hash('sha256', $input['pwd']);
    $result = false;
    
    $sql = 'SELECT pwd FROM centres WHERE codi = ?';
    $stmtQuery = $dbConn->prepare($sql);
    $stmtQuery->execute(array($codi));
    while ($row=$stmtQuery->fetch()) {
        if ($row['pwd'] === $pwd) {
            $result = true;
            break;
        }
    }
    
    if (!$result) {
        http_response_code(400);
        die('Usuari o contrasenya incorrectes!');
    }

    // Save result in session
    session_start();
    $_SESSION['codi'] = $codi;
    $response = array('codi' => $codi);
}

header('Content-Type: application/json;charset=UTF-8');
header('Cache-Control: no-cache');
print(json_encode($response, JSON_OPTIONS));
