import { IsMongoId, IsNotEmpty } from 'class-validator'

export class Delete {
  @IsNotEmpty()
  @IsMongoId()
  _id: string
}
