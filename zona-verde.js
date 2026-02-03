import * as pdfjsLib from './build/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './build/pdf.worker.mjs';

const url = './web/zona-verde.pdf'; 
const container_pdf = document.getElementsByClassName("container_pdf")[0]; // El PDF se insertará aquí


pdfjsLib.getDocument(url).promise.then(pdf => {
    // Recorremos todas las páginas del documento
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        
        // 1. Crear un canvas por cada página
        const canvas = document.createElement('canvas');
        const li = document.createElement('li');
        canvas.className = 'page_pdf'
        // canvas.style.margin = '20px auto';
        li.appendChild(canvas);
        container_pdf.appendChild(li);

        // 2. Renderizar la página actual
        pdf.getPage(pageNum).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });
            const context = canvas.getContext('2d');

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }
}).catch(err => {
    console.error('Error:', err);
});