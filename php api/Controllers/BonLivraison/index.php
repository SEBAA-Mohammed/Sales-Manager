<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$sql = "SELECT * FROM bonLivraison";
$result = $conn->query($sql);

$bonLivraisonData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $bonLivraisonData[] = $row;
    }
}

$bonLivraisonData = $bonLivraisonData ? : [];

echo json_encode($bonLivraisonData);

$conn->close();
?>