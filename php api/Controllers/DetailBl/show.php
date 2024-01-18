<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM detailBl WHERE id = $id";
    $result = $conn->query($sql);

    $detailBlData = null; 

    if ($result->num_rows > 0) {
        $detailBlData = $result->fetch_assoc();
        echo json_encode($detailBlData);
    } else {
        echo json_encode(['error' => 'DetailBl not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>