export class DatabaseQueryResult {
  constructor(readonly success: Boolean, readonly data: any[] | Object | String) {}
}