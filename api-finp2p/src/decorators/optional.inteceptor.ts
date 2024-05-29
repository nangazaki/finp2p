// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Injectable()
// export class OptionalFileInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const fileInterceptor = FileInterceptor('avatar');
//     const request = context.switchToHttp().getRequest();

//     if (!request.files || !request.files.avatar) {
//       return next.handle();
//     }

//     return fileInterceptor.intercept(context, next);
//     // Estou a ter um erro nessa linha (src/decorators/optional.inteceptor.ts:20:28 - error TS2339: Property 'intercept' does not exist on type 'Type<NestInterceptor<any, any>>'. return fileInterceptor.intercept(context, next); )
//   }
// }
