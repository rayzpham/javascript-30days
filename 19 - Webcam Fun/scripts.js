const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true,audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            //video.src = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error(`NOOOOO!!!`,err);
        });
}

function paintToCanavas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video,0,0, width,height);
        let pixels = ctx.getImageData(0,0,width,height);
        // console.log(pixels);
        pixels = redEffect(pixels);
        
        ctx.putImageData(pixels,0,0);
    }, 16);
}

function takePhoto(){
    //Play sound
    snap.currentTime = 0;
    snap.play();

    //take photo
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','handsome');
    //link.textContent = 'Download image';
    link.innertHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firsChild);
}

function redEffect(pixels){
    for(let i=0;i<pixels.data.length;i+=4){
        pixels[i+0] = pixels.data[i+0] + 100; //red 
        pixels[i+1] = pixels.data[i+1] - 50; //green
        pixels[i+2] = pixels.data[i+2] * 0.5; //blue
    }
}
getVideo();

video.addEventListener('canplay', paintToCanavas);