import { modelOptions, pre, prop, Severity } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { User } from './User.entity';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    _id: true,
    versionKey: false,
    timestamps: {
      createdAt: 'createDateTime',
      updatedAt: 'lastModifiedDateTime',
    },
    toJSON: {
      virtuals: true,
      transform: (doc: any, ret: any) => {
        delete ret.id;
      },
    },
    toObject: { virtuals: true },
    collation: {
      locale: 'en',
      strength: 2,
      alternate: 'shifted',
    },
  },
})
@pre<Base>(
  [
    'countDocuments',
    'estimatedDocumentCount',
    'find',
    'findOne',
    'findOneAndUpdate',
    'updateOne',
    'updateMany',
    'findOneAndDelete',
    'deleteOne',
    'deleteMany',
  ],
  function () {
    const query = this.get('query');
    const { ignoreDeleted, ...rest } = query;
    if (ignoreDeleted) {
      this.set({ query: rest });
    } else {
      this.set({ query: { ...query, isDeleted: false } });
    }
  }
)
export class Base {
  @prop({
    ref: 'User',
    localField: 'createdBy',
    foreignField: '_id',
    justOne: true,
  })
  public createUser?: User;

  @prop()
  public createdBy?: ObjectId;

  /**
   * For updating, use `lastModifiedBy` over this field as this is a populated field, not a base field.
   */
  @prop({
    ref: 'User',
    localField: 'lastModifiedBy',
    foreignField: '_id',
    justOne: true,
  })
  public lastModifiedUser?: User;

  @prop()
  public lastModifiedBy?: ObjectId;

  /**
   * The date and the time record was created.
   */
  @prop()
  public createDateTime: Date;

  /**
   * The date and time the record was last modified.
   */
  @prop()
  public lastModifiedDateTime?: Date;

  /**
   * Indicates that the record is soft-deleted.
   */
  @prop({
    default: false,
  })
  public isDeleted: boolean;

  /**
   * Indicates when the record was soft-deleted.
   */
  @prop({
    default: null,
  })
  public deletedAt?: Date;
}
