<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO article (designation , prix_ht , tva , stock , famille_id) 
                VALUES ('$requestData[designation]','$requestData[prix_ht]','$requestData[tva]','$requestData[stock]','$requestData[famille_id]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating article: " . $conn->error]);
}

$conn->close();
?>
