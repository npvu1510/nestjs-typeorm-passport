import { Response } from 'express';
import { ConfigEnvironmentBaseService } from 'src/base/config/config-environent.base.service';
import { ITokens } from 'src/common/interface/tokens.interface';

export function setCookies(res: Response, tokens: ITokens) {
  res.cookie('access_token', tokens.accessToken, {
    httpOnly: true,
    secure:
      ConfigEnvironmentBaseService.getIns().get('NODE_ENV') === 'production'
        ? true
        : false,
    sameSite: 'lax',
  });
  res.cookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure:
      ConfigEnvironmentBaseService.getIns().get('NODE_ENV') === 'production'
        ? true
        : false,
    sameSite: 'lax',
  });
}
