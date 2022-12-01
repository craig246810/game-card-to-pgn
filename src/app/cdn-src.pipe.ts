import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cdn'
})
export class CdnSrcPipe implements PipeTransform {
  private readonly cdn = 'https://cdn.jsdelivr.net/gh/craig246810/game-card-to-pgn@main/src/assets/';

  transform(assetUrl: string): string {
    if (assetUrl) {
      return `${this.cdn}${assetUrl}`;
    }

    return '';
  }

}