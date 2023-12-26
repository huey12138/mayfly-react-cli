import { MidwayConfig } from '@midwayjs/core';
import fs from 'fs';
import path from 'path';
import { JwtProps } from '../inputs/base.inputs';
import { OSSCredential } from '../inputs/oss.inputs';

const jwt: JwtProps = {
  privateSecret: fs.readFileSync(
    path.resolve(__dirname, '../keys/RS256/rsa_private.pem')
  ),
  publicSecret: fs.readFileSync(
    path.resolve(__dirname, '../keys/RS256/rsa_public.pem')
  ),
  expiresIn: 60 * 60,
};

const koa = {
  port: 7009,
  // http2: true,
  // key: fs.readFileSync(
  //   path.resolve(__dirname, '../http2/localhost-privkey.pem')
  // ),
  // cert: fs.readFileSync(path.resolve(__dirname, '../http2/localhost-cert.pem')),
};

const oss: OSSCredential = {
  accessKeyId: process.env.OSS_ACCESSKEYID,
  accessKeySecret: process.env.OSS_ACCESSKEYSECRET,
  roleArn: process.env.OSS_ROLEARN,
  roleSessionName: process.env.OSS_ROLESESSIONNAME,
  endpoint: process.env.OSS_ENDPOINT,
  bucket: process.env.OSS_BUCKET,
  region: process.env.OSS_REGION,
};

const DB_CONFIG = {
  getUrl(): string {
    const password = process.env.MONGODB_ROOT_PASSWORD;
    const auth = `root:${process.env.MONGODB_ROOT_PASSWORD}@`;
    const host = process.env.MONGO_MONGODB_SERVICE_HOST || 'localhost';
    const port = process.env.MONGO_MONGODB_SERVICE_PORT_MONGODB || '27017';
    return (
      process.env.MONGO_MONGODB_URL ||
      `mongodb://${password ? auth : ''}${host}:${port}`
    );
  },
  getDbName(): string {
    return process.env.MONGO_DATABASE_NAME || 'mayfly-develop';
  },
};

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1702892689488_2499',
  koa,
  validate: {
    locale: 'en_US',
  },
  cors: {
    credentials: false,
    enable: true,
    origin: '*',
  },
  oss,
  jwt,
  mongoose: {
    dataSource: {
      default: {
        uri: `${DB_CONFIG.getUrl()}/${DB_CONFIG.getDbName()}`,
        options: {
          ignoreUndefined: true,
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          directConnection: true,
          ssl: false,
        },
        // 关联实体
        entities: ['entity'],
      },
    },
  },
} as MidwayConfig;
