import { Component, VERSION } from '@angular/core';
import { OpticalCharacterRecognitionService } from './optical-character-recognition.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  now = new Date();

  constructor(private readonly ocr: OpticalCharacterRecognitionService) {}

  public async recogniseImage() {
    const original: any = document.getElementById('original');

    const img = new Image();
    img.height = original.naturalHeight;
    img.width = original.naturalWidth;
    img.src =
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg';

    const canvas: any = document.getElementById('canvas');
    canvas.height = original.naturalHeight;
    canvas.width = original.naturalWidth;
    const ctx: any = canvas.getContext('2d');

    img.onload = function () {
      img.crossOrigin = 'anonymous';
      ctx.drawImage(img, 0, 0);

      console.log('canvas.width, canvas.height', canvas.width, canvas.height);

      console.table({
        width: canvas.width,
        heigth: canvas.height,
      });

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      console.log('imgData.data.length', imgData.data.length);

      for (let i = 0; i < imgData.data.length; i += 4) {
        let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
        let colour = 0;
        if (count > 510) colour = 255;
        else if (count > 255) colour = 127.5;

        imgData.data[i] = colour;
        imgData.data[i + 1] = colour;
        imgData.data[i + 2] = colour;
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    };
  }
}
