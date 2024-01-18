<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$sql = "SELECT * FROM famille";
$result = $conn->query($sql);

$familleData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $familleData[] = $row;
    }
}

$familleData = $familleData ? : [];

echo json_encode($familleData);

$conn->close();
?>