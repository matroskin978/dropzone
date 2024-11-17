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
        // console.log(file);
        // console.log(response);
        let res = JSON.parse(response);
        if (res.status === 'error') {
            this.options.error(file, res.errors);
            /*setTimeout(() => {
                this.removeFile(file);
            }, 3000);*/
        } else {
            galleryImages.append(`
                <li class="gallery-images-thumb ui-state-default rounded-2" data-file="${res.file}" id="${res.file}">
                    <div class="gallery-images-thumb-del" data-file="${res.file}"><i class="fa-solid fa-trash-can btn-tool text-secondary me-1"></i></div>
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
                console.log(fileName);
            }
        }
        file.previewElement.remove();
    },
});
