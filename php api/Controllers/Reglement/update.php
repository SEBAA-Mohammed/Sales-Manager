<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $date = $requestData['date'];
    $montant = $requestData['montant'];
    $bl_id = $requestData['bl_id'];
    $mode_id = $requestData['mode_id'];

    $sql = "UPDATE reglement 
            SET date = '$date',  montant = '$montant',  bl_id = '$bl_id',  mode_id = '$mode_id' 
            WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating reglement: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>