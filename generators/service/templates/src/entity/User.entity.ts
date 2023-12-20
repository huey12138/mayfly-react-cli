import { prop } from '@typegoose/typegoose';
import { Base } from './Base.entity';

export class User extends Base {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}
