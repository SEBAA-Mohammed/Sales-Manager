<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO modeReglement (mode) VALUES ('$requestData[mode]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating modeReglement: " . $conn->error]);
}

$conn->close();
?>
