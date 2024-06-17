import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCPF, isValidCNPJ } from '../utils/validators';

@ValidatorConstraint({ async: false })
export class IsDocumentConstraint implements ValidatorConstraintInterface {
  validate(document: string) {
    return isValidCPF(document) || isValidCNPJ(document);
  }

  defaultMessage() {
    return 'Documento inválido';
  }
}

export function IsDocument(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDocumentConstraint,
    });
  };
}
