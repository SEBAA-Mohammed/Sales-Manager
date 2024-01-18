<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $date = $requestData['date'];
    $regle = $requestData['regle'];
    $client_id = $requestData['client_id'];
    $caissier_id = $requestData['caissier_id'];

    $sql = "UPDATE bonLivraison 
            SET date = '$date',  regle = '$regle',  client_id = '$client_id',  caissier_id = '$caissier_id'
            WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating bonLivraison: ' . $conn->error]);
        } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>