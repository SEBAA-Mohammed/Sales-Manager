<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$sql = "SELECT * FROM article";
$result = $conn->query($sql);

$articleData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $articleData[] = $row;
    }
}

$articleData = $articleData ? : [];

echo json_encode($articleData);

$conn->close();
?>