export class DatabaseQueryResult {
  constructor(readonly success: Boolean, readonly data: Array<any> | Object | String) {}
}