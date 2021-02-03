import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { map } from 'rxjs/operators';
import { SEND_EMAIL_ACTION, SEND_EMAIL_CONTACT } from '../@graphql/operations/mutation/mail';
import { IMail } from '../@public/core/Interfaces/IMail';

@Injectable({
  providedIn: 'root'
})
export class MailService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
}

sendEmail(mail: IMail) {
    return this.set(
        SEND_EMAIL_ACTION,
      { mail}
    ).pipe(map( (result:any) => {
      return result.sendEmail;
    }))
}

contactEmail(name: string, email: string, title: string, text: string) {
  
  return this.set( SEND_EMAIL_CONTACT,{name, email, title, text}).pipe(map( (result:any) => {
  return result.contactEmail;
}))
}





}
