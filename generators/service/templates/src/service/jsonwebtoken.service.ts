import { App, Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import { JwtProps } from '../inputs/base.inputs';

@Provide()
export class JsonWebTokenService {
  @App()
  app: koa.Application;

  @Inject()
  jwtService: JwtService;

  async generateToken(payload: object): Promise<string> {
    const jwt: JwtProps = this.app.getConfig('jwt');

    const token = await this.jwtService.sign(payload, jwt.privateSecret, {
      algorithm: 'RS256',
      expiresIn: jwt.expiresIn,
    });

    return token;
  }
}
