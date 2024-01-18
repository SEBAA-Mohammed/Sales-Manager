<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $nom = $requestData['nom'];
    $prenom = $requestData['prenom'];
    $adresse = $requestData['adresse'];
    $ville = $requestData['ville'];

    $sql = "UPDATE client 
            SET nom = '$nom',  prenom = '$prenom',  adresse = '$adresse',  ville = '$ville' 
            WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating client: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>