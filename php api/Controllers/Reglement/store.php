<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO reglement (date , montant , bl_id , mode_id ) 
                VALUES ('$requestData[date]','$requestData[montant]','$requestData[bl_id]','$requestData[mode_id]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating modeReglement: " . $conn->error]);
}

$conn->close();
?>
