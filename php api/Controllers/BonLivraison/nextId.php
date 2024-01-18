<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$query = "SHOW TABLE STATUS LIKE 'bonLivraison'";
$result = $conn->query($query);

if ($result) {
    $row = $result->fetch_assoc();

    $nextId = $row['Auto_increment'];

    echo json_encode(['next_id' => $nextId]);
} else {
    echo json_encode(['error' => 'Failed to fetch next ID']);
}

$conn->close();
?>
