<?php

$date = new DateTime("NOW");
$dateFormat = $date->format("mdYHisu");

$file = "../archiv/" . $dateFormat . ".txt";



if (isset($_POST['x'])) {

        // Security check
        $content = test_input($_POST['x'] . "");

        if (file_exists($file)) {
                unlink($file);
        }

        if (!file_exists($file)) {
                file_put_contents($file, $content);
                chmod($file, 0644);
        }

        if (file_exists($file)) {
                echo "File saved 👍";
        }
}

// Security check
function test_input($data)
{
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
}
