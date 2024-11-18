let galleryErrors = $('#gallery-errors');
let galleryFiles = $('#gallery-files');
let galleryImages = $('.gallery-images');

let galleryDropzone = new Dropzone('div#upload', {
    url: 'https://example.local/dropzone/upload.php',
    paramName: 'gallery',
    maxFilesize: 1,
    // maxFiles: 2,
    acceptedFiles: '.jpg, .png',
    addRemoveLinks: true,
    dictFileTooBig: 'Максимальный размер файла - 1 Мб',
    dictMaxFilesExceeded: 'Вы не можете загружать больше файлов',
    dictInvalidFileType: 'К загрузке разрешены разрешения: .jpg, .png',
    success: function (file, response) {
        let res = JSON.parse(response);
        if (res.status === 'error') {
            this.options.error(file, res.errors);
        } else {
            file.previewElement.remove();
            galleryImages.append(`
                <li class="gallery-images-thumb ui-state-default rounded-2" data-fileli="${res.file}" id="${res.file}">
                    <div class="gallery-images-thumb-del" data-file="${res.file}">🗑️</div>
                    <a href="#" data-fancybox="gallery">
                        <img src="uploads/${res.file}" width="160" alt="" data-file="${res.file}">
                    </a>
                    <input type="hidden" name="gallery[]" value="${res.file}" data-file="${res.file}">
                </li>
            `);
        }
    },
    removedfile: function (file) {
        if (file.xhr) {
            let res = JSON.parse(file.xhr.response);
            let fileName = res.file;
            if (fileName) {
                $.ajax({
                    type: 'POST',
                    url: 'https://example.local/dropzone/delete.php',
                    data: {file: fileName},
                    success: function (res) {
                        if (res === 'deleted') {
                            galleryImages.find('[data-fileli="' + fileName + '"]').remove();
                        }
                    },
                });
            }
        }
        file.previewElement.remove();
    },
});

$(function () {

    $('body').on('click', '.gallery-images-thumb-del', function () {
        let $this = $(this);
        let fileName = $this.data('file');
        let parentLi = $this.parent();
        $.ajax({
            type: 'POST',
            url: 'https://example.local/dropzone/delete.php',
            data: {file: fileName},
            beforeSend: function () {
                parentLi.addClass('gallery-image-removing');
            },
            success: function (res) {
                setTimeout(() => {
                    if (res === 'deleted') {
                        parentLi.remove();
                    } else {
                        alert('Error removing');
                        parentLi.removeClass('gallery-image-removing');
                    }
                }, 500);

            },
            error: function () {
                alert('Error');
                parentLi.removeClass('gallery-image-removing');
            },
        });
    });

});
