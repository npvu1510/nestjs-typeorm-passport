import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// export class LocalGuard extends AuthGuard('local') {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {

//   }
//   // handleRequest<TUser = any>(
//   //   err: any,
//   //   user: any,
//   //   info: any,
//   //   context: ExecutionContext,
//   //   status?: any,
//   // ): any {}
// }
