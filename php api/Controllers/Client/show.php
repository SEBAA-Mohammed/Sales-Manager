<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM client WHERE id = $id";
    $result = $conn->query($sql);

    $clientData = null; 

    if ($result->num_rows > 0) {
        $clientData = $result->fetch_assoc();
        echo json_encode($clientData);
    } else {
        echo json_encode(['error' => 'Client not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>