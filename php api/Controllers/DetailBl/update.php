<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

if (isset($requestData['id'])) {

    $id = $requestData['id'];
    $qte = $requestData['qte'];
    $article_id = $requestData['article_id'];

    $sql = "UPDATE detailBl SET qte = '$qte', article_id = '$article_id'  WHERE id = $id";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(['error' => 'Error updating detailBl: ' . $conn->error]);
    } 
    } else {
    echo json_encode(['error' => 'ID not found']);
}

$conn->close();
?>