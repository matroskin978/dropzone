<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="dropzone/dropzone.min.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>

<div class="container my-5">

    <form action="" method="post">

        <input type="text" class="form-control" name="gallery">

        <div id="upload" class="upload">
            <div class="dz-message">Кликните или перетащите фото</div>
        </div>
        <div id="gallery-errors"></div>
        <div id="gallery-files"></div>
        <ul class="gallery-images clearfix" id="sortable"></ul>

        <button type="submit" class="btn btn-warning">Save</button>

    </form>
    
</div>

<script src="jquery-3.7.1.min.js"></script>
<script src="dropzone/dropzone.min.js"></script>
<script src="main.js"></script>
</body>
</html>
