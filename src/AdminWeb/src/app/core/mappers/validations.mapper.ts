import { HttpErrorResponse } from "@angular/common/http";
import { ValidationProblemDetails } from "../models/common";

const mapValidationProblemDetails = (details: ValidationProblemDetails): string[] => {
  const result: string[] = [];

  for (const errorKey of Object.keys(details.errors)) {
    result.push(...details.errors[errorKey].map(o => `ValidationError: ${errorKey} => ${o}`));
  }

  return result;
};

const mapGenericErrors = (error: any): string[] => {
  if (Array.isArray(error)) {
    return error.map(o => typeof o === 'object' ? JSON.stringify(o) : String(o));
  } else {
    return [JSON.stringify(error)];
  }
}

export const mapHttpErrors = (error: HttpErrorResponse): string[] => {
  switch (error.status) {
    case 400:
      return mapValidationProblemDetails(error.error);
    default:
      return mapGenericErrors(error.error);
  }
}
