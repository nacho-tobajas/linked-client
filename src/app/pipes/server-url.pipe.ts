import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'serverUrl',
  standalone: false
})
export class ServerUrlPipe implements PipeTransform {

  transform(path: string | null | undefined): string {
if (!path) {
      return 'assets/images/default-profile.jpg';
    }

    if (path.startsWith('http')) {
      return path;
    }

    return environment.urlImg + path;
  }

}
