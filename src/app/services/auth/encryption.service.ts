import { Injectable } from '@angular/core';

/**
 * Servicio de encriptación.
 *
 * La encriptación AES client-side con clave hardcodeada fue eliminada porque:
 * - La clave es visible en el bundle JS (no ofrece seguridad real).
 * - HTTPS protege la contraseña en tránsito de forma estándar y correcta.
 * - Es incompatible con backends que no compartan la misma clave (ej. Spring Security).
 *
 * Si en el futuro se necesita encriptación extra (ej. clave pública derivada del servidor),
 * implementarla aquí obteniendo la clave desde el backend, nunca hardcodeada.
 */
@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  /**
   * Devuelve el texto tal cual. La protección es responsabilidad de HTTPS.
   * Mantener la firma del método para no romper llamadas existentes durante la migración.
   */
  encrypt(text: string): string {
    return text;
  }
}
