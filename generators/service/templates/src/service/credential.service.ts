// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Credential from '@alicloud/credentials';
import { App, Provide } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import { OSSCredential } from '../inputs/oss.inputs';

@Provide()
export class CredentialService {
  @App()
  app: koa.Application;

  async getCredential() {
    const oss: OSSCredential = this.app.getConfig('oss');
    try {
      const config: any = {
        type: 'ram_role_arn',
        accessKeyId: oss.accessKeyId,
        accessKeySecret: oss.accessKeySecret,
        roleArn: oss.roleArn,
        roleSessionName: oss.roleSessionName,
        // policy: 'policy', // 可选, 限制 STS Token 的权限
        roleSessionExpiration: 3600,
      };
      const cred = new Credential(config);
      const accessKeyId: string = await cred.getAccessKeyId();
      const accessKeySecret: string = await cred.getAccessKeySecret();
      const securityToken: string = await cred.getSecurityToken();

      return {
        accessKeyId,
        accessKeySecret,
        securityToken,
        endpoint: oss.endpoint,
        bucket: oss.bucket,
        filePathPre: 'ui',
        region: oss.region,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
