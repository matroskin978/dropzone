<?php

require_once 'db.php';
/** @var PDO $db */

$gallery_id = $_GET['id'] ?? 1;

$stmt = $db->prepare("select img from gallery_images where gallery_id = ? order by sort");
$stmt->execute([$gallery_id]);
$images = $stmt->fetchAll();

?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/dropzone/dropzone.min.css">
    <link rel="stylesheet" href="assets/fancybox/fancybox.css">
    <link rel="stylesheet" href="assets/jqueryui/jquery-ui.min.css">
    <link rel="stylesheet" href="assets/main.css">
</head>
<body>

<div class="container my-5">

    <div class="gallery">
        <?php foreach ($images as $image): ?>

            <a href="uploads/<?= $image['img']; ?>" data-fancybox="gallery">
                <img src="uploads/<?= $image['img']; ?>" alt="">
            </a>

        <?php endforeach; ?>
    </div>

</div>

<script src="assets/jquery-3.7.1.min.js"></script>
<script src="assets/dropzone/dropzone.min.js"></script>
<script src="assets/fancybox/fancybox.umd.js"></script>
<script src="assets/jqueryui/jquery-ui.min.js"></script>
<script src="assets/main.js"></script>
</body>
</html>