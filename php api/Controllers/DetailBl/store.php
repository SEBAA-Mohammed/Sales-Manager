<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO detailBl (article_id , bl_id , qte ) 
                VALUES ('$requestData[article_id]','$requestData[bl_id]','$requestData[qte]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating detailBl: " . $conn->error]);
}

$conn->close();
?>
