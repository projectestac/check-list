<?php

/**
 * File: unitats/index.php
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

$result = [];

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    if (empty($input['comanda']) || empty($input['producte']) || empty($input['num'])) {
        http_response_code(400);
        $result['error'] = 'ERROR: Manquen paràmetres!';
    } else {
        $fields = [];
        $parameters = [];
    
        if (isset($input['id'])) {
            $fields[] = 'id = ?';
            $parameters[] = $input['id'];
        }
    
        if (isset($input['descripcio'])) {
            $fields[] = 'descripcio = ?';
            $parameters[] = $input['descripcio'];
        }

        if (isset($input['problemes'])) {
            $fields[] = 'problemes = ?';
            $parameters[] = $input['problemes'];
        }

        if (isset($input['checks'])) {
            $fields[] = 'checks = ?';
            $parameters[] = $input['checks'];
        }

        $sql = 'UPDATE unitats SET '.implode(', ', $fields).' WHERE comanda = ? AND producte = ? AND num = ?';
        $parameters[] = $input['comanda'];
        $parameters[] = $input['producte'];
        $parameters[] = $input['num'];
    }

} else {

    // Set 'where' conditions based on current request params
    $conditions = [];
    $parameters = [];

    if (!empty($_REQUEST['comanda'])) {
        $conditions[] = 'comanda = ?';
        $parameters[] = $_REQUEST['comanda'];
    }

    if (!empty($_REQUEST['producte'])) {
        $conditions[] = 'producte = ?';
        $parameters[] = $_REQUEST['producte'];
    }

    if (!empty($_REQUEST['num'])) {
        $conditions[] = 'num = ?';
        $parameters[] = $_REQUEST['num'];
    }
    
    // Build and launch query statement
    $sql = 'SELECT * FROM unitats';
    if ($conditions) {
        $sql .= ' WHERE '.implode(' AND ', $conditions);
    }
    $sql .= ' ORDER BY comanda, producte, num';
}

$stmtQuery = $dbConn->prepare($sql);
$stmtQuery->execute($parameters);
    
// Collect results
while ($row = $stmtQuery->fetch()) {    
    extract($row);
    $unitat = array(
        'comanda' => $comanda,
        'producte' => $producte,
        'num' => $num,
        'id' => $id,
        'descripcio' => $descripcio,
        'problemes' => $problemes,
        'checks' => $checks
    );
    array_push($result, $unitat);
}

// Send response
header('Content-Type: application/json;charset=UTF-8');
print(json_encode($result, JSON_OPTIONS));
