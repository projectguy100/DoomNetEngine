<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $query = $_POST["query"];
    $to = "doomnet-official@outlook.com";
    $subject = "New Query Submission";
    $message = "Query: " . $query;
    $headers = "From: doomnet-error@outlook.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully";
    } else {
        echo "Email sending failed";
    }
}
?>
