import { PipeTransform, ArgumentMetadata } from "@nestjs/common";

export class DemoPipe implements PipeTransform {
  transform(value: Object, metadata: ArgumentMetadata): Array<any> {
    return Object.values(value);
  }
}