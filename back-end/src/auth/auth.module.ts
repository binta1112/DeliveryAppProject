import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { Livreur } from 'src/livreur/entity/livreur';
import { LivreurModule } from 'src/livreur/livreur.module';
import { CommerceantsModule } from 'src/commerceants/commerceants.module';
import { LivreurVehiculeModule } from 'src/livreur-vehicule/livreur-vehicule.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    UsersModule,
    LivreurModule,
    CommerceantsModule,
    LivreurVehiculeModule,
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,  
    {
      provide: 'JWT_ACCESS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get('JWT_ACCESS_SECRET') || 'mySecretKey',
          signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN') || '1h' },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'JWT_REFRESH_SERVICE',
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get('JWT_REFRESH_SECRET') || 'mySecretKey',
          signOptions: { expiresIn: configService.get('JWT_REFRESH_EXPIRES_IN') || '7d' },
        });
      },
      inject: [ConfigService],
    },
  ],

})
export class AuthModule {}
