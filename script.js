console.log("Script loaded");

if (typeof faceapi === 'undefined') {
    console.error("face-api.js is not loaded. Please check the script loading order or path.");
} else {
    const video = document.getElementById('video');
    const canvas = document.getElementById('overlay');
    const emotionDisplay = document.getElementById('emotionDisplay');
    const confidenceSlider = document.getElementById('confidenceSlider');
    const sliderValue = document.getElementById('sliderValue');

    // Update the displayed slider value
    confidenceSlider.addEventListener('input', () => {
        sliderValue.textContent = confidenceSlider.value;
    });

    // Load the necessary face-api.js models from the local directory
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models')
    ]).then(startVideo);

    function startVideo() {
        navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
            .then(stream => {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    processFrame(); // Start processing frames
                };
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
                emotionDisplay.textContent = "Error accessing webcam.";
            });
    }

    async function processFrame() {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, detections);
        faceapi.draw.drawFaceLandmarks(canvas, detections);
        faceapi.draw.drawFaceExpressions(canvas, detections);

        const minConfidence = confidenceSlider.value / 100; // Convert slider value to a decimal

        if (detections.length > 0) {
            const emotions = detections[0].expressions;
            const filteredEmotions = Object.entries(emotions).filter(([emotion, confidence]) => confidence >= minConfidence);
            
            if (filteredEmotions.length > 0) {
                const [maxEmotion, maxConfidence] = filteredEmotions.reduce((a, b) => b[1] > a[1] ? b : a);
                emotionDisplay.textContent = `Detected Emotion: ${maxEmotion} (${(maxConfidence * 100).toFixed(0)}%)`;
            } else {
                emotionDisplay.textContent = "No emotions detected above the threshold.";
            }
        } else {
            emotionDisplay.textContent = "No face detected.";
        }

        setTimeout(processFrame, 90); // Run the next detection after 500ms (0.5 seconds)
    }
}
