<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$sql = "SELECT * FROM reglement";
$result = $conn->query($sql);

$reglementData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reglementData[] = $row;
    }
}

$reglementData = $reglementData ? : [];

echo json_encode($reglementData);

$conn->close();
?>