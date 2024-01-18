<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO client (nom , prenom , adresse , ville ) 
                VALUES ('$requestData[nom]','$requestData[prenom]','$requestData[adresse]','$requestData[ville]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating client: " . $conn->error]);
}

$conn->close();
?>
