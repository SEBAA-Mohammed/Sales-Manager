<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO caissier (nom , prenom , poste , email , password , admin ) 
                VALUES ('$requestData[nom]','$requestData[prenom]','$requestData[poste]','$requestData[email]','$requestData[password]','$requestData[admin]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating caissier: " . $conn->error]);
}

$conn->close();
?>
