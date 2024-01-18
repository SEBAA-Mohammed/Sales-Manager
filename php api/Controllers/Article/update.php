<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $designation = $requestData['designation'];
    $prix_ht = $requestData['prix_ht'];
    $tva = $requestData['tva'];
    $stock = $requestData['stock'];
    $famille_id = $requestData['famille_id'];

    $sql = "UPDATE article 
            SET designation = '$designation',  prix_ht = '$prix_ht',  tva = '$tva',  stock = '$stock', famille_id = '$famille_id' 
            WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating article: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>