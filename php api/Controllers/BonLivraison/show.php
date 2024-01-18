<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM bonLivraison WHERE id = $id";
    $result = $conn->query($sql);

    $bonLivraisonData = null; 

    if ($result->num_rows > 0) {
        $bonLivraisonData = $result->fetch_assoc();
        echo json_encode($bonLivraisonData);
    } else {
        echo json_encode(['error' => 'BonLivraison not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>