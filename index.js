const url = 'https://cafe-konh-cafe.netlify.app/web/menu.pdf'; // Cambia esto por tu archivo

// 1. Configurar el worker (usa el archivo de tu carpeta build)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'build/pdf.worker.js';

// 2. Cargar el documento
const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(pdf => {
    
    // 3. Obtener la primera página
    pdf.getPage(1).then(page => {
        const scale = 1.5; // Ajusta el zoom aquí
        const viewport = page.getViewport({ scale: scale });

        // 4. Preparar el canvas
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // 5. Renderizar
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}).catch(err => {
    console.error('Error al cargar el PDF: ', err);
});