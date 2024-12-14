<?php

require_once 'db.php';
/** @var PDO $db */

function get_file_extension(string $filename): string
{
    return pathinfo($filename, PATHINFO_EXTENSION);
}

if (!isset($_FILES['gallery']) || $_FILES['gallery']['error']) {
    http_response_code(400);
}

$ext = get_file_extension($_FILES['gallery']['name']);
if (!in_array($ext, ['jpg', 'png'])) {
    http_response_code(400);
    exit('Invalid extension');
}

$file_name = md5($_FILES['gallery']['name'] . uniqid('', true)) . ".$ext";
if (move_uploaded_file($_FILES['gallery']['tmp_name'], "uploads/$file_name")) {
    $stmt = $db->prepare("insert into gallery_images (img) values (?)");
    $stmt->execute([$file_name]);
    exit(json_encode(['status' => 'success', 'file' => $file_name]));
} else {
    http_response_code(400);
    exit('Error uploading');
}
