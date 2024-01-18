<?php
const ROOT = __DIR__ . '/../../';
require(ROOT . 'dbConnection.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data)) {
    $sql = "INSERT INTO detailBl (article_id, qte, bl_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    foreach ($data as $detailLine) {
        $stmt->bind_param("iii", $detailLine['article_id'], $detailLine['qte'], $detailLine['bl_id']);
        $stmt->execute();
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'No data received']);
}

$conn->close();

?>
