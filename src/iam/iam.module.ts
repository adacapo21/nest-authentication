import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { HashingService } from './hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [jwtConfig] }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: HashingService, // abstract class
      useClass: BcryptService, // service uses abstract class
    },
    AuthenticationService,
  ],
})
export class IamModule {}
