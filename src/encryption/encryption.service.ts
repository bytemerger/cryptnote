import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
  private algorithm = 'aes-256-ctr';

  constructor(private readonly configService: ConfigService) {}

  encrypt(text: string) {
    const encryption_key = this.configService.get<String>('ENCRYPTION_KEY', {
      infer: true,
    })!;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(encryption_key),
      iv,
    );
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(text: string) {
    const encryption_key = this.configService.get<String>('ENCRYPTION_KEY', {
      infer: true,
    })!;

    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(encryption_key),
      iv,
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
