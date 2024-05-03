import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Users } from '../models/users.model';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class UserIdentityService {
  userDescriptions: string[] = [];

  // private postCounter = new BehaviorSubject<number>(0);

  // currentPostCounter = this.postCounter.asObservable();

  

  constructor(private userDataService: UserDataService) {}

  getUsers(): Observable<Users[]> {
    return of(this.userDataService.users);
  }

  getUser(id: number | string) {
    return this.getUsers().pipe(
      map((users: Array<Users>) => users.find((user) => user.id === +id)!),
    );
  }

  getUserDescription() {
    this.userDescriptions = [
      "Let's make our city a hub for new ideas, commerce, culture, science, productivity, and social development.",
      'This app is free and allows us to share our ideas and suggestions to improve urban life.',
      'We can protect and preserve the cultural heritage of our city together.',
      "Let's safeguard the natural heritage of our city for future generations.",
      'Supporting positive social and environmental ties between urban areas is crucial for our community.',
      'Join us in making our city a better place to live, work, and play.',
      'Your ideas can help shape the future of our city. Share them with us!',
      'Together, we can make our city a beacon of culture, science, and social development.',
    ];

    return this.userDescriptions[
        Math.floor(Math.random() * this.userDescriptions.length)
      ];
  }

  // changePostedCounter(lenght:number){
  //   this.postCounter.next(lenght);
  // }
}
