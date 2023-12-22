import { Rule, RuleType } from '@midwayjs/validate';
import { getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { IsExists } from 'node-input-validator-util';
import { User } from '../entity/User.entity';
import { Gender } from './base.inputs';

export class UserDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  gender: Gender;
}

export class CreateUserInput {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  gender: Gender;

  @IsExists(getModelForClass(User), { isArchived: false }, 'key', 'Gender')
  parentId: ObjectId;
}
