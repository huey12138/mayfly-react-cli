import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { Validate } from '@midwayjs/validate';
import { ReturnModelType } from '@typegoose/typegoose';
import { ModelUtil } from 'mongoose-model-util';
import { User } from '../entity/User.entity';
import { PageInfo } from '../inputs/base.inputs';
import { UserDTO } from '../inputs/user.inputs';
import { CredentialService } from '../service/credential.service';
import { JsonWebTokenService } from '../service/jsonwebtoken.service';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jsonWebTokenService: JsonWebTokenService;

  @Inject()
  credentialService: CredentialService;

  @InjectEntityModel(User)
  userModel: ReturnModelType<typeof User>;

  @Get('/user')
  async user(@Query('id') id) {
    return this.userModel.findById(id);
  }

  @Get('/users')
  async users(@Query('filter') filter, @Query('pageInfo') pageInfo: PageInfo) {
    return ModelUtil.page(
      this.userModel,
      filter,
      pageInfo?.pageIndex,
      pageInfo?.pageSize
    );
  }

  @Post('/createUser')
  @Validate()
  async createUser(@Body() input: UserDTO) {
    return this.userService.create(input);
  }

  @Get('/credential')
  async getCredential(@Query() input) {
    return this.credentialService.getCredential();
  }

  @Post('/login')
  async generateToken(@Body() input) {
    const token = await this.jsonWebTokenService.generateToken(input);

    return { token };
  }
}
