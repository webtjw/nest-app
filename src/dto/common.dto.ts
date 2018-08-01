export class WebApiResponse {
  constructor(
    readonly success: Boolean,
    readonly message: String,
    readonly data: Object | any[] | String,
  ) {}
}