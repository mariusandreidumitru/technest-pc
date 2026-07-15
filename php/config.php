<?php
// Configurare bază de date
define('DB_HOST', 'localhost');
define('DB_NAME', 'technest_db'); // Numele bazei tale
define('DB_USER', 'technest_user'); // Utilizatorul creat
define('DB_PASS', 'D[JBc?a9AG77U[,p'); // Parola

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Eroare conexiune: " . $e->getMessage());
}
?>