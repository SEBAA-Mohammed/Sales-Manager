<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO famille (famille) VALUES ('$requestData[famille]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating famille: " . $conn->error]);
}

$conn->close();
?>
