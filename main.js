let galleryErrors = $('#gallery-errors');
let galleryFiles = $('#gallery-files');
let galleryImages = $('.gallery-images');

let galleryDropzone = new Dropzone('div#upload', {
    url: 'https://example.local/dropzone/',
    paramName: 'gallery',
    maxFilesize: 1,
    // maxFiles: 2,
    acceptedFiles: '.jpg, .png',
    dictFileTooBig: 'Максимальный размер файла - 1 Мб',
    dictMaxFilesExceeded: 'Вы не можете загружать больше файлов',
    dictInvalidFileType: 'К загрузке разрешены разрешения: .jpg, .png',
    /*dictDefaultMessage: '<div class="dz-message">Кликните или перетащите фото</div>',
    init: function () {
        $(this.element).html(this.options.dictDefaultMessage);
    },*/
    success: function (file, response) {
        console.log(file);
        console.log(response);
    },
});
