<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$sql = "SELECT * FROM caissier";
$result = $conn->query($sql);

$caissierData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $caissierData[] = $row;
    }
}

$caissierData = $caissierData ? : [];

echo json_encode($caissierData);

$conn->close();
?>