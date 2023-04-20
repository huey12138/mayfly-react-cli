import OSS, { Checkpoint } from "ali-oss";
import axios, { AxiosRequestConfig } from "axios";
import Axios from "./axios";
import { pathJoin } from "./pure";
import { UploadFile } from "antd/lib/upload";

export enum UploadFileType {
  APK = "APK", // apk安装包
  ARTICLE = "ARTICLE", // 文章
  AUTHENTICATION = "AUTHENTICATION", // 认证文件
  IMCHAT = "IMCHAT", // 聊天文件
}

export const getBlobFromUrl = async (url: string): Promise<Blob> => {
  const blob = await axios.get(url, { responseType: "blob" }).then(
    (resp) => resp.data as Blob,
    (err) => {
      // eslint-disable-next-line no-console
      console.info("getBlobFromUrl:", err);
      throw new Error(`获取数据失败:${url}`);
    }
  );

  return blob;
};

export interface IOssToken {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  endpoint: string;
  filePathPre: string;
  securityToken: string;
}

type OssTokenGenFn = (
  fileType: UploadFileType,
  param?: string
) => AxiosRequestConfig;

class AliOSS {
  constructor(tokenApiUrl: string) {
    this.tokenApi = tokenApiUrl;
  }

  private tokenApi: string;

  private tokenParamFn: OssTokenGenFn = (
    fileType,
    param
  ): AxiosRequestConfig => ({
    url: this.tokenApi,
    method: "POST",
    data: {
      ossFilePathEnum: fileType,
      otherParameter: param,
    },
  });

  private async getToken(
    fileType: UploadFileType,
    param?: string
  ): Promise<IOssToken> {
    this.tokenParamFn(fileType, param);

    return Axios.get("/credential", {});
  }

  async putFile(config: {
    name: string;
    file: UploadFile;
    type: UploadFileType;
    pre?: string;
  }): Promise<string> {
    const token = await this.getToken(config.type, config.pre);

    if (!token) return "";
    const { securityToken, filePathPre, ...res } = token;
    const client = new OSS({
      ...res,
      stsToken: securityToken,
    });

    const fileName = pathJoin(token.filePathPre, config.name);
    const result = await client.put(fileName, config.file);

    return result.url;
  }

  async multiPut(config: {
    name: string;
    file: Blob;
    type: UploadFileType;
    pre?: string;
    process?: (percent: number, abort: () => void) => void;
  }): Promise<string> {
    const { name, file, type, pre, process } = config;
    const token = await this.getToken(type, pre);

    const client = new OSS({
      region: token.region,
      accessKeyId: token.accessKeyId,
      accessKeySecret: token.accessKeySecret,
      bucket: token.bucket,
      stsToken: token.securityToken,
      endpoint: token.endpoint,
    });

    const fileName = pathJoin(token.filePathPre, name);

    let checkpoint: Checkpoint | undefined;

    const abort = (): void => {
      if (!checkpoint) {
        return;
      }

      const { name: n, uploadId } = checkpoint;

      client.abortMultipartUpload(n, uploadId);
    };

    const result = await client.multipartUpload(fileName, file, {
      progress(p: number, chp: Checkpoint) {
        process?.(p, abort);
        checkpoint = chp;
      },
    });

    const domain = `http://${token.bucket}.${token.endpoint}`;

    const fileUrl = encodeURIComponent(result.name);

    const url = `${domain}/${fileUrl}`;

    return url;
  }
}

export { AliOSS };
