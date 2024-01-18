<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT * FROM article WHERE id = $id";
    $result = $conn->query($sql);

    $articleData = null; 

    if ($result->num_rows > 0) {
        $articleData = $result->fetch_assoc();
        echo json_encode($articleData);
    } else {
        echo json_encode(['error' => 'Article not found']);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>