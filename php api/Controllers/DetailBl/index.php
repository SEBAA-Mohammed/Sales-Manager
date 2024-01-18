<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $sql = "SELECT d.id,d.bl_id,d.qte,a.designation,a.prix_ht,a.tva 
    FROM detailBl AS d JOIN article AS a 
    WHERE bl_id = $id 
    AND d.article_id = a.id";
    $result = $conn->query($sql);

    $detailBlData = []; 

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $detailBlData[] = $row;
        }

        $detailBlData = $detailBlData ? : [];

        echo json_encode($detailBlData);
    }
} else {
    echo json_encode(['error' => 'ID not provided']);
}

$conn->close();
?>