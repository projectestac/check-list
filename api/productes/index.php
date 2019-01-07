<?php

/**
 * File: productes/index.php
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
$parameters = [];

$sql = 'SELECT * FROM productes ';

if (!empty($_REQUEST['id'])) {
    $sql = 'SELECT * FROM productes WHERE id = ?';
    $parameters[] = $_REQUEST['id'];
} else if (!empty($_REQUEST['comanda'])) {
    $sql = 'SELECT * FROM productes p WHERE p.id IN (SELECT u.producte FROM unitats u WHERE u.comanda = ? GROUP BY u.producte ORDER BY p.id)';
    $parameters[] = $_REQUEST['comanda'];
}

// Build and launch query statement
$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
$result = [];
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $producte = array(
        'id' => $id,
        'descripcio' => $descripcio,
        'checks' => json_decode($checks),
        'since' => $since
    );
    array_push($result, $producte);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
