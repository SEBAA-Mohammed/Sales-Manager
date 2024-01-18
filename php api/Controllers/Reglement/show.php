<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM reglement WHERE id = $id";
    $result = $conn->query($sql);

    $reglementData = null; 

    if ($result->num_rows > 0) {
        $reglementData = $result->fetch_assoc();
        echo json_encode($reglementData);
    } else {
        echo json_encode(['error' => 'Reglement not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>