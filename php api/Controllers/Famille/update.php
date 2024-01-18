<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $famille = $requestData['famille'];

    $sql = "UPDATE famille SET famille = '$famille' WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating famille: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>
