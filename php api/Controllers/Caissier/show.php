<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM caissier WHERE id = $id";
    $result = $conn->query($sql);

    $caissierData = null; 

    if ($result->num_rows > 0) {
        $caissierData = $result->fetch_assoc();
        echo json_encode($caissierData);
    } else {
        echo json_encode(['error' => 'Caissier not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>