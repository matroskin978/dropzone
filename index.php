<?php

require_once 'db.php';
/** @var PDO $db */

if ($_POST) {

    $gallery_title = $_POST['gallery_title'];
    $gallery = $_POST['gallery'];

    $stmt = $db->prepare("insert into galleries (title) values (?)");
    $stmt->execute([$gallery_title]);
    $gallery_id = $db->lastInsertId();

    $i = 1;
    foreach ($gallery as $item) {
        $stmt = $db->prepare("update gallery_images set gallery_id = ?, sort = ? where gallery_id = 0 and img = ?");
        $stmt->execute([$gallery_id, $i, $item]);
        $i++;
    }

    exit(json_encode(['status' => 'success', 'redirect' => 'index.php']));

}

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
    <link rel="stylesheet" href="assets/jqueryui/jquery-ui.min.css">
    <link rel="stylesheet" href="assets/fancybox/fancybox.css" />
    <link rel="stylesheet" href="assets/main.css">
</head>
<body>

<div class="container my-5">

    <form action="index.php" method="post" class="ajax-form">

        <input type="text" class="form-control" name="gallery_title">

        <div id="upload" class="upload">
            <div class="dz-message">Кликните или перетащите фото</div>
        </div>
        <div id="gallery-errors"></div>
        <div id="gallery-files"></div>
        <ul class="gallery-images clearfix" id="sortable"></ul>

        <button type="submit" class="btn btn-warning">Save</button>

    </form>
    
</div>

<script src="assets/jquery-3.7.1.min.js"></script>
<script src="assets/dropzone/dropzone.min.js"></script>
<script src="assets/jqueryui/jquery-ui.min.js"></script>
<script src="assets/fancybox/fancybox.umd.js"></script>
<script src="assets/main.js"></script>
</body>
</html>
