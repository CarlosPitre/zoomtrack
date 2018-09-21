import {User} from '../users/user';
import {Tag} from '../tags/tag';

export class New {
  public id: number;
  public title: string;
  public body: string;
  public user: string;
  public user_id: User;
  public tags: Tag[];
}
