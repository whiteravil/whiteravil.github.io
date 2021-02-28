export default function fileUpload() {
    const fileElements = Array.from(document.querySelectorAll('.js-file-upload'));

    function returnFileSize(number) {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number > 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number > 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    }

    const fileCardTemplate = (name, size, imageTag) => `
        <div class="file-card__inner">
            <div class="file-card__image-container">
                ${imageTag}
            </div>
        </div>
        <div class="file-card__name">${name}</div>
        <div class="file-card__close">
            <svg width="10" height="10" aria-hidden="true" class="icon-filecard-close">
                <use xlink:href="#filecard-close" />
            </svg>
        </div>
       
    `;

    fileElements.forEach(element => {
        const fileLabels = Array.from(element.querySelectorAll('.js-file-upload-label'));
        const filesList = element.querySelector('.js-file-upload-files');
        const dropzone = element.querySelector('.js-file-upload-dropzone');
        const action = element.querySelector('.js-file-upload-action');
        const dropzoneInitialText = dropzone.getAttribute('data-upload-text');
        const filelist = element.querySelector('.js-filelist');
        const selectFileText = element.querySelector('.js-full-text');

        const selectFileOriginalText = selectFileText.textContent;
        const selectFileNewText = selectFileText.getAttribute('data-full-text');


        let addedFiles = 0;


        dropzone.addEventListener('dragenter', () => {
            dropzone.classList.add('dragged-over');
        })
        dropzone.addEventListener('dragend', () => {
            dropzone.classList.remove('dragged-over');
        })
        dropzone.addEventListener('drop', () => {
            dropzone.classList.remove('dragged-over');
        })
        dropzone.addEventListener('dragexit', () => {
            dropzone.classList.remove('dragged-over');
        })

        const handleFilesCount = () => {
            if (addedFiles > 0) {
                dropzone.setAttribute('data-upload-text', `Выбрано файлов: ${addedFiles} из ${fileLabels.length}`);
                if (action) {
                    action.classList.add('hidden');
                }
              
                filesList.classList.add('shown');
            } else {
                dropzone.setAttribute('data-upload-text', dropzoneInitialText);
                if (action) {
                    action.classList.remove('hidden');
                }
              
                filesList.classList.remove('shown');
            }


            if (addedFiles >= fileLabels.length) {
                selectFileText.textContent = selectFileNewText;
                element.classList.add('fileupload-full');
            } else {
                selectFileText.textContent = selectFileOriginalText;
                element.classList.remove('fileupload-full');
            }
        };

        fileLabels.forEach((label, labelIndex) => {
            const input = label.querySelector('input[type="file"]');

            input.addEventListener('change', () => {
                const filename = input.files.length && input.files[0].name;
                const filesize = input.files.length && input.files[0].size;

                const fileIsImage = input.files[0]['type'].split('/')[0] === 'image';
                let imagePreviewSrc = null;

                if (fileIsImage) {
                    console.log(`File with filename ${filename} is an image`);
                    imagePreviewSrc = URL.createObjectURL(input.files[0]);
                }
                

                const fileElement = document.createElement('div');

                const imageTag = imagePreviewSrc ? `<img src="${imagePreviewSrc}" class="file-card__image"/>` : `<span class="file-card__extension">${filename.substring(filename.lastIndexOf('.') + 1)}</span>`
                fileElement.className = 'file-card';
                fileElement.innerHTML = fileCardTemplate(filename, returnFileSize(filesize), imageTag);

                const listItem = document.createElement('li');

                listItem.classList = 'application__form-file-upload-files-list-item';

                const removeHandler = () => {
                    label.classList.remove('hidden');
                    input.value = null;
                    listItem.removeEventListener('click', removeHandler);
                    listItem.remove();
                    addedFiles = addedFiles - 1;
                    handleFilesCount();
                };

                listItem.addEventListener('click', removeHandler);

               

                listItem.appendChild(fileElement)

                filelist.appendChild(listItem);

                label.classList.add('hidden');

                addedFiles = addedFiles + 1;

                handleFilesCount();


                console.log('Filesize', returnFileSize(filesize))
            });
        });
    });
}
