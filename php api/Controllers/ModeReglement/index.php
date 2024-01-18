<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$sql = "SELECT * FROM modeReglement";
$result = $conn->query($sql);

$modeReglementData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $modeReglementData[] = $row;
    }
}

$modeReglementData = $modeReglementData ? : [];

echo json_encode($modeReglementData);

$conn->close();
?>