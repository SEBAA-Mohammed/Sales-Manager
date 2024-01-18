<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM modeReglement WHERE id = $id";
    $result = $conn->query($sql);

    $modeReglementData = null; 

    if ($result->num_rows > 0) {
        $modeReglementData = $result->fetch_assoc();
        echo json_encode($modeReglementData);
    } else {
        echo json_encode(['error' => 'ModeReglement not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>