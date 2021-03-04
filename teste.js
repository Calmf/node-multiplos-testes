const express = require('express');
const app = express();
const port = 80;
const Jimp = require('jimp');

function getImage(imageFile, qualityPercent) {
    return Jimp.read(imageFile)
    .then(image => {
        // Convert to new quality level %
        return image.quality(qualityPercent).getBufferAsync(Jimp.MIME_JPEG);
    });
}

app.get('/images/:imageFileName', async (req, res) => {
    let imageFileName = req.params.imageFileName;

    // Get the quality requested in percent, e.g. /images/original_image.jpeg?quality=15
    let qualityPercent = Number(req.query.quality) || 100;
    let imageBuffer = await getImage(imageFileName, qualityPercent);
    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': imageBuffer.length
    });

    console.log(`Serving ${imageFileName} at ${qualityPercent}% quality...`);
    res.end(imageBuffer);
});

app.listen(port);