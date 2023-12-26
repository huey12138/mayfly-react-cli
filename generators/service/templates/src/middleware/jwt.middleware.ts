import { App, httpError, IMiddleware } from '@midwayjs/core';
import { Inject, Middleware } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtProps } from '../inputs/base.inputs';
import { JsonWebTokenService } from '../service/jsonwebtoken.service';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @App()
  app: koa.Application;

  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // test
      if (process.env.NO_AUTHORISATION_MODE === 'true') {
        return next();
      }

      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx
        .get('authorization')
        .trim()
        .split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;
      const jwt: JwtProps = this.app.getConfig('jwt');

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, jwt.publicSecret, {
            algorithms: ['RS256'],
            complete: true,
          });
          return next();
        } catch (error) {
          const jsonWebTokenService = await ctx.requestContext.getAsync(
            JsonWebTokenService
          );
          //token过期 生成新的token
          const newToken = await jsonWebTokenService.generateToken({});
          // //将新token放入Authorization中返回给前端
          ctx.set('Authorization', newToken);
        }
        return next();
      }
    };
  }

  static getName(): string {
    return 'jsonwebtoken';
  }

  // 配置忽略鉴权的路由地址
  match(ctx: Context): boolean {
    const ignore = ctx.path.indexOf('/api/login') !== -1;
    return !ignore;
  }
}
