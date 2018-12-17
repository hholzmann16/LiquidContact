/**
 * Interface created to make sure any argument passed into API postContact function is of this type
 */

export interface ContactForm {
  email: string;
  subject: string;
  message: string;
}
