let galleryErrors = $('#gallery-errors');
let galleryFiles = $('#gallery-files');
let galleryImages = $('.gallery-images');

if ($('#upload').length) {
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
            file.previewElement.remove();
            galleryImages.append(`
                <li class="gallery-images-thumb ui-state-default rounded-2" data-fileli="${res.file}" id="${res.file}">
                    <div class="gallery-images-thumb-del" data-file="${res.file}">🗑️</div>
                    <a href="uploads/${res.file}" data-fancybox="gallery">
                        <img src="uploads/${res.file}" width="160" alt="" data-file="${res.file}">
                    </a>
                    <input type="hidden" name="gallery[]" value="${res.file}" data-file="${res.file}">
                </li>
            `);
        }
    });
}

Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

$(function () {

    $('#sortable').sortable({
        placeholder: "ui-state-highlight",
        opacity: 0.5
    });


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

    $('.ajax-form').on('submit', function (e) {
        e.preventDefault();
        let form = $(this);
        let btn = form.find('button[type=submit]');
        let btnText = btn.text();

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            beforeSend: function () {
                btn.prop('disabled', true).text('Sending...');
            },
            success: function (res) {
                res = JSON.parse(res);
                if (res.status === 'success') {
                    alert('OK');
                    if (res.redirect) {
                        window.location = res.redirect;
                    }
                }
            },
            error: function () {
                alert('Error');
            },
            complete: function () {
                btn.prop('disabled', false).text(btnText);
            },
        });
    });

});
