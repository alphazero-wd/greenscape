import { json } from 'body-parser';
import { ReqWithRawBody } from '../interfaces';
import { Response } from 'express';

export function rawBodyMiddleware() {
  return json({
    verify: (req: ReqWithRawBody, res: Response, buffer: Buffer) => {
      if (req.url === '/webhook' && Buffer.isBuffer(buffer))
        req.rawBody = Buffer.from(buffer);
      return true;
    },
  });
}
