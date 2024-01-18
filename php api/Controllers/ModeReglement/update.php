<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $mode = $requestData['mode'];

    $sql = "UPDATE modeReglement SET mode = '$mode' WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating modeReglement: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>