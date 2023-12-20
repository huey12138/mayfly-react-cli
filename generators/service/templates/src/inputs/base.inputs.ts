export class PageInfo {
  pageSize: number;
  pageIndex: number;
}

export class SortInfo {
  field: string;
  direction: SortDirection;
}

export type JwtProps = {
  privateSecret: Buffer | string;
  publicSecret: Buffer | string;
  expiresIn: number | string;
};

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum SortDirection {
  Desc = -1,
  Asc = 1,
}
