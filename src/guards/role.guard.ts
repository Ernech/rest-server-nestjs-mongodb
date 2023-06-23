import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { RoleType } from '../enums/role-type.enum';
import { TokenService } from '../services/token/token.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly _reflector: Reflector, private tokenService: TokenService) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.getAllAndOverride<RoleType>('roles', [context.getHandler(), context.getClass()])

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException("You don't have permission to access to this resource")
    }

    const role = this.tokenService.getRoles(token)
    const hasRole = () => roles.includes(role)
    
    return hasRole()
  }
}
