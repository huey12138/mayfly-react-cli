import { App, Configuration } from '@midwayjs/core';
import * as info from '@midwayjs/info';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import * as crossDomain from '@midwayjs/cross-domain';
import * as jwt from '@midwayjs/jwt';
import * as typegoose from '@midwayjs/typegoose';
import * as dotenv from 'dotenv';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ReportMiddleware } from './middleware/report.middleware';

dotenv.config();

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    crossDomain,
    typegoose,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
