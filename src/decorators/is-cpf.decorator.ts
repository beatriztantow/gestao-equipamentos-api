import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCPF } from '../utils/validators';

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    return isValidCPF(cpf);
  }

  defaultMessage() {
    return 'CPF inválido';
  }
}

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
