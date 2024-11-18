<?php

if (!empty($_POST['file'])) {
    $file = str_replace('..', '', $_POST['file']);
    $file = __DIR__ . "/uploads/{$file}";
    if (is_file($file)) {
        unlink($file);
        exit('deleted');
    }
}
