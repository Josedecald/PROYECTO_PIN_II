// Función para insertar un video de YouTube
const insertYouTubeVideo = (embedCode, elementId) => {
    document.getElementById(elementId).innerHTML = embedCode;
}

// Función para agregar un video
const agregarVideo = (numeroVideo) => {
    const videoUrl = document.getElementById(`videoUrl${numeroVideo}`).value;
    const videoId = `video${numeroVideo}`;

    const embedCode = videoUrl.replace(/width="\d+"/, 'width="350"').replace(/height="\d+"/, 'height="190"');

    localStorage.setItem(videoId, embedCode);

    insertYouTubeVideo(embedCode, videoId);
}

// Función para cargar los videos guardados en el localStorage al cargar la página
window.onload = () => {
    for (let i = 1; i <= 3; i++) {
        const embedCode = localStorage.getItem(`video${i}`);
        if (embedCode) {
            document.getElementById(`v${i}`).innerHTML = embedCode;
        }
    }
};
