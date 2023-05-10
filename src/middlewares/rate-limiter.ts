import { Request, Response } from 'express'
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

export const RateLimiterMiddleware = (
  windowMs: number,
  max: number,
): RateLimitRequestHandler => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: async (_req: Request, _res: Response) => {
      _res.status(429).json({ message: 'TOO_MANY_REQUESTS' })
    },
  })
}
