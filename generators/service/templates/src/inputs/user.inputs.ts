import { Rule, RuleType } from '@midwayjs/validate';
import { Gender } from './base.inputs';

export class UserDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  gender: Gender;
}
