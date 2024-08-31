<?php
// Configuration de la base de données intégrée dans db.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'calcul');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

// Classe pour gérer la connexion à la base de données
class Database {
    private $db;

    public function __construct() {
        $this->db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if ($this->db->connect_error) {
            throw new Exception("Connexion échouée : " . $this->db->connect_error);
        }
    }

    public function getConnexion() {
        return $this->db;
    }

    public function __destruct() {
        if ($this->db) {
            $this->db->close();
        }
    }
}
?>


