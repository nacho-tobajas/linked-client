import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private key = CryptoJS.enc.Hex.parse(
    '91e87395dcdc7494f82d3a67b5fa118d264d92fe75f4a7c3d4f4d5e12348ab93'
  ); // Tu clave de 32 bytes en Hex
  private iv = CryptoJS.enc.Hex.parse('dcf2a4bf8b9876e5df8c2ba0a77d234b'); // Tu IV de 16 bytes en Hex

  encrypt(text: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC, //Cifrado de Blockchain
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

}
