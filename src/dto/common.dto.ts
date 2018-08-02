export class WebApiResponse {
  constructor(
    readonly success: Boolean,
    readonly message: any,
    readonly data: object | any[] | string,
  ) {}
}