<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $nom = $requestData['nom'];
    $prenom = $requestData['prenom'];
    $poste = $requestData['poste'];
    $email = $requestData['email'];
    $password = $requestData['password'];
    $admin = $requestData['admin'];

    $sql = "UPDATE caissier 
            SET nom = '$nom',  prenom = '$prenom',  poste = '$poste',  email = '$email', password = '$password', admin = '$admin' 
            WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating caissier: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>