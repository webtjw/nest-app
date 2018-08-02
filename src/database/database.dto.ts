export class DatabaseQueryResult {
  constructor(readonly success: Boolean, readonly data: any[] | object | string | number) {}
}