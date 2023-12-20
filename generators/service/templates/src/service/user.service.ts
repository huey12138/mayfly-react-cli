import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/User.entity';
import { IUserOptions } from '../interface';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
  async create(input: any) {
    return await this.userModel.create(input);
  }
}
