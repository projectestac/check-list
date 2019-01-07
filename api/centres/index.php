<?php

/**
 * File: centres/index.php
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

session_start();
if (empty($_SESSION['codi'])) {
    http_response_code(400);
    die('Usuari o contrasenya incorrectes!');
}

$result = [];

// Set-up database connection:
$dbConn = new PDO(
    'mysql:dbname='.DB_NAME.
    ';host='.DB_HOST.
    ';charset='.DB_CHARSET,
    DB_USER, DB_PASSWORD
);

// Set 'where' conditions based on current request params
$conditions = [];
$parameters = [];

if (!empty($_REQUEST['codi'])) {
    $conditions[] = 'codi = ?';
    $parameters[] = $_REQUEST['codi'];
}

if (!empty($_REQUEST['sstt'])) {
    $conditions[] = 'sstt = ?';
    $parameters[] = $_REQUEST['sstt'];
}

if (!empty($_REQUEST['localitat'])) {
    $conditions[] = 'localitat = ?';
    $parameters[] = $_REQUEST['localitat'];
}

// Build and launch query statement
$sql = 'SELECT * FROM centres';
if ($conditions) {
    $sql .= ' WHERE '.implode(' AND ', $conditions);
}
$sql .= ' ORDER BY codi';
$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
$result = [];
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $centre = array(
        'codi' => $codi,
        'centre' => $centre,
        'localitat' => $localitat,
        'sstt' => $sstt
    );
    array_push($result, $centre);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
