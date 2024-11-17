<?php

function get_file_extension(string $filename): string
{
    return pathinfo($filename, PATHINFO_EXTENSION);
}

if (!isset($_FILES['gallery']) || $_FILES['gallery']['error']) {
    exit(json_encode(['status' => 'error', 'errors' => 'No file or filer upload error']));
}

$ext = get_file_extension($_FILES['gallery']['name']);
if (!in_array($ext, ['jpeg', 'png'])) {
    exit(json_encode(['status' => 'error', 'errors' => 'Invalid extension']));
}

$file_name = md5($_FILES['gallery']['name'] . uniqid('', true)) . ".$ext";
if (move_uploaded_file($_FILES['gallery']['tmp_name'], "uploads/$file_name")) {
    exit(json_encode(['status' => 'success', 'file' => $file_name]));
} else {
    exit(json_encode(['status' => 'error', 'errors' => 'Error uploading']));
}


