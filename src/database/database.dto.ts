export class ReturnServiceObject {
  constructor(readonly success: Boolean, readonly data: Array<any> | Object | String) {}
}