import { Component, VERSION } from '@angular/core';
import { OpticalCharacterRecognitionService } from './optical-character-recognition.service';

type SelectedImage = {
  title: string;
  src: string;
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  version = VERSION.major;

  public now = new Date();

  public images: SelectedImage[] = [
    {
      title: 'Individual Move',
      src: 'one_move.jpg',
    },
    {
      title: 'Score Card',
      src: 'chess_score_page.jpg',
    },
  ];

  public selectedImage: SelectedImage | undefined;

  constructor(private readonly ocr: OpticalCharacterRecognitionService) {}

  public async recogniseImage() {
    const original: any = document.getElementById('original');

    const img = new Image();
    img.height = original.naturalHeight;
    img.width = original.naturalWidth;
    img.src = original.src;

    const canvas: any = document.getElementById('canvas');
    canvas.height = original.naturalHeight;
    canvas.width = original.naturalWidth;
    const ctx: any = canvas.getContext('2d');

    img.onload = function () {
      img.crossOrigin = 'anonymous';
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < imgData.data.length; i += 4) {
        // https://www.w3schools.com/css/css_colors_rgb.asp
        const red = imgData.data[i];
        const green = imgData.data[i + 1];
        const blue = imgData.data[i + 2];
        const alpha = 255; // opacity

        let count = red + green + blue;
        let colour = 765;

        // 0-255 = black
        // 256-510 = gray
        // 511-765 = white

        // if (count > 510) colour = 255;
        // else if (count > 255) colour = 127.5;

        // console.log('count', count);

        // flipped to make grey black
        if (count <= 350) colour = 0;

        // to be grey it must be 50% of red blue and green
        // because to make grey = black + white

        // set a threashold of say 5% eitherway

        imgData.data[i] = colour;
        imgData.data[i + 1] = colour;
        imgData.data[i + 2] = colour;
        imgData.data[i + 3] = 255; // opacity for rgba
      }
      ctx.putImageData(imgData, 0, 0);
    };
  }
}
