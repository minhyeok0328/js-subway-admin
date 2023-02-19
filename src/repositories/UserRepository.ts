import { Repository } from '../core/Repository';

export class UserRepository extends Repository {
  constructor() {
    super('user');
  }
}

export const userRepository = new UserRepository();
