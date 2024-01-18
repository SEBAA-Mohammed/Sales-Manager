<?php
const ROOT = __DIR__ . '/../../';

require(ROOT . 'dbConnection.php');

$requestData = json_decode(file_get_contents('php://input'), true);

$email = $requestData['email'];
$password = $requestData['password'];


$sql = "SELECT id, admin FROM caissier WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);

    echo json_encode(array("success" => true, "isAdmin" => $row['admin'], "loginId" => $row['id']));
} else {    
    echo json_encode(array("success" => false, "isAdmin" => false, "loginId" => null));
}

mysqli_close($conn);

?>
