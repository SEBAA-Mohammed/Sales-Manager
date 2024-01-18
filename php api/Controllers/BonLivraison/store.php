<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');


$requestData = json_decode(file_get_contents('php://input'), true);

$sql = "INSERT INTO bonLivraison (date , regle , client_id , caissier_id)
                VALUES ('$requestData[date]','$requestData[regle]','$requestData[client_id]','$requestData[caissier_id]')";

if ($conn->query($sql) !== TRUE) {

    echo json_encode(["error" => "Error creating bonlivraison: " . $conn->error]);
}

$conn->close();
?>
