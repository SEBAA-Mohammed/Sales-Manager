<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM famille WHERE id = $id";
    $result = $conn->query($sql);

    $familleData = null; 

    if ($result->num_rows > 0) {
        $familleData = $result->fetch_assoc();
        echo json_encode($familleData);
    } else {
        echo json_encode(['error' => 'Famille not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>