import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../../../services/mail.service';
import { basicAlert } from '../../../@shared/alerts/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alerts/values.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  
  constructor(public mailService: MailService) { }

  ngOnInit(): void {
    this.form = new FormGroup({ // son todos los campos que quiero controlar por el HTML
      name: new FormControl(null, Validators.required), // el primero es el valor por defecto, lo otro son validator que si quiero mas puedo mandar un array 
      email: new FormControl(null, [Validators.required, Validators.email]),
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  postFormContact() {
    this.mailService.contactEmail(this.form.value.name, this.form.value.email, this.form.value.title, this.form.value.text)
    .subscribe( (result:any) =>{ 
      if (result.status ) {

        basicAlert(TYPE_ALERT.SUCCESS, 'Email enviado correctamente');
        this.form.reset()

      } else {
        basicAlert(TYPE_ALERT.ERROR, 'Ha habido un error, inténtelo de nuevo por favor')
      }

    })
  }

}
