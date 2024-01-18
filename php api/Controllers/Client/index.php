<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$sql = "SELECT * FROM client";
$result = $conn->query($sql);

$clientData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $clientData[] = $row;
    }
}

$clientData = $clientData ? : [];

echo json_encode($clientData);

$conn->close();
?>