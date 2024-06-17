import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCNPJ } from '../utils/validators';

@ValidatorConstraint({ async: false })
export class IsCNPJConstraint implements ValidatorConstraintInterface {
  validate(cnpj: string) {
    return isValidCNPJ(cnpj);
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCNPJConstraint,
    });
  };
}
