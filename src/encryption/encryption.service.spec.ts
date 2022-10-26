import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

describe('EncryptionService', () => {
  let service: EncryptionService;

  const mockConfigService: { key: string; get: jest.Mock<string, []> } = {
    key: crypto
      .createHash('sha256')
      .update('sdfdfds')
      .digest('base64')
      .substr(0, 32),
    get: jest.fn(() => mockConfigService.key),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should encrypt and decrypt', () => {
    const encrypted = service.encrypt('final');
    expect(service.decrypt(encrypted)).toEqual('final');
  });
});
