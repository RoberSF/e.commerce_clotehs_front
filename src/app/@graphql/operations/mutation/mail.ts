import gql from 'graphql-tag';


//**************************************************************************************************
//                    Método para enviar email                                                         
//**************************************************************************************************

export const SEND_EMAIL_ACTION = gql`
    
    mutation sendEmail($mail: MailInput!) {
        sendEmail(mail: $mail) {
            status
        }
    }
  `;

export const SEND_EMAIL_CONTACT = gql`
    
    mutation contactEmail($name: String!, $email: String!, $title: String!, $text: String!) {
        contactEmail(name: $name, email: $email, title: $title, text: $text) {
            status
        }
    }
  `;



  


