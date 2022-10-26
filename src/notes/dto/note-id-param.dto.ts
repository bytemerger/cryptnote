import { ObjectId } from 'mongoose';
import { isMongoID } from 'src/helpers/is-mongo-id.validation';

export class NoteIdParam {
  @isMongoID({
    message: 'The id param is not valid',
  })
  id: ObjectId;
}
