<?php

/**
 * File: comandes/index.php
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

if (!empty($_REQUEST['id'])) {
    $conditions[] = 'c.id = ?';
    $parameters[] = $_REQUEST['id'];
}

if (!empty($_REQUEST['centre'])) {
    $conditions[] = 'c.centre = ?';
    $parameters[] = $_REQUEST['centre'];
}

if (!empty($_REQUEST['campanya'])) {
    $conditions[] = 'c.campanya = ?';
    $parameters[] = $_REQUEST['campanya'];
}

// Build and launch query statement
$sql = 'SELECT c.*, cn.centre as nomcentre, cn.localitat, cn.sstt FROM comandes c LEFT JOIN centres cn ON (c.centre = cn.codi)';
if ($conditions) {
    $sql .= ' WHERE '.implode(' AND ', $conditions);
}
$sql .= ' ORDER BY c.id';
$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
$result = [];
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $comanda = array(
        'id' => $id,
        'campanya' => $campanya,
        'centre' => $centre,
        'estat' => $estat,
        'inici' => $inici,
        'final' => $final,
        'observacions' => $observacions,
        'nomcentre' => $nomcentre,
        'localitat' => $localitat,
        'sstt' => $sstt
    );
    array_push($result, $comanda);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
