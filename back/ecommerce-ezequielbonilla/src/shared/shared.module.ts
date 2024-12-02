import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configeService: ConfigService) => {
        const secret = configeService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('Failed to configure jwt service');
        }
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],

  exports: [JwtModule],
})
export class SharedModule {}
