import { IsMongoId, IsNotEmpty } from 'class-validator'

export class DeleteGeneral {
  @IsNotEmpty()
  @IsMongoId()
  _id: string
}
