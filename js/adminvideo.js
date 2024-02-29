const insertYouTubeVideo = (embedCode, elementId) => {
    let targetElement = document.getElementById(elementId);
    targetElement.innerHTML = embedCode;
}

const agregarVideo = (numeroVideo) => {
    let videoUrl;
    let videoId;

    switch(numeroVideo) {
        case 1:
            videoUrl = document.getElementById("videoUrl1").value;
            videoId = "video1";
            break;
        case 2:
            videoUrl = document.getElementById("videoUrl2").value;
            videoId = "video2";
            break;
        case 3:
            videoUrl = document.getElementById("videoUrl3").value;
            videoId = "video3";
            break;
        default:
            return;
    }

    let embedCode = videoUrl.replace(/width="\d+"/, 'width="350"').replace(/height="\d+"/, 'height="190"');

    localStorage.setItem(videoId, embedCode);

    insertYouTubeVideo(embedCode, videoId);
}