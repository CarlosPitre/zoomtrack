import {New} from '../news/new';
import {User} from '../users/user';
import {Tag} from "../tags/tag";
export class Answers {
  public status: boolean;
  public message: string;
  public token: string;
  public profile_id: string;
  public id: number;
  public pages: [{
    page: number,
    init: number,
  }];
  public user: User;
  public news: New[];
  public users: User[];
  public tags: Tag[];
}
