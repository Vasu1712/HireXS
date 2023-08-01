<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $user = $_POST['name'];
    echo ("Hello from server: $user");
?>