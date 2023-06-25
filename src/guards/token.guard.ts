import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';
@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private reflector:Reflector, private tokenService: TokenService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const authRequired = this.reflector.get<string[]>(
      'authorizationRequired',
      context.getHandler(),
    );

   const request = context.switchToHttp().getRequest()
   const authorizationHeader = request.headers.authorization;

   if(!authorizationHeader){
      if(!authRequired){
        return true;
      }
      throw new UnauthorizedException("You don't have permission to access to this resource")
   }
   const auth = authorizationHeader ? authorizationHeader.split(' ') : null;
   if(auth && auth.length===2 && auth[0] === 'bearer'){
      try {
        const validateToken = this.tokenService.validateToken(auth[1])
        if(validateToken){
          return true
        }
      } catch (error) {
        throw new UnauthorizedException('Token invalid or expired.')
      }
   }
  }
}
