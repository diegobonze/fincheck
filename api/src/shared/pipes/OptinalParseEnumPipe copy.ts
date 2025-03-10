import { ArgumentMetadata, ParseEnumPipe } from "@nestjs/common";

export class OptinalParseEnumPipe extends ParseEnumPipe {
  override transform(value: string, metadata: ArgumentMetadata){
    if(typeof value == 'undefined') {
      return value
    }

    return super.transform(value, metadata);
  }
}