GNU nano 6.2                                                                                 routes/redirect.ts                                                                                           
/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import * as challengeUtils from '../lib/challengeUtils'
import { challenges } from '../data/datacache'
import * as security from '../lib/insecurity'

export function performRedirect () {
  return ({ query }: Request, res: Response, next: NextFunction) => {
    //Виправлено
    const toUrl: string = query.to as string
    if (security.isRedirectAllowed(toUrl)) {
      challengeUtils.solveIf(challenges.redirectCryptoCurrencyChallenge, () => { return toUrl === 'https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW'  toUrl === 'https://blockchain.i>
      challengeUtils.solveIf(challenges.redirectChallenge, () => { return isUnintendedRedirect(toUrl) })
      if (toUrl.startsWith('/')) {
        const safeUrl = String(toUrl);
      if (safeUrl.startsWith('https://github.com/')  safeUrl.startsWith('/')) {
        res.redirect(safeUrl);
      } else {
        res.redirect('/');
      }
      } else {
        res.redirect('/')
      }
    } else {
      res.status(406)
      next(new Error('Unrecognized target URL for redirect: ' + toUrl))
    }
  }
}

function isUnintendedRedirect (toUrl: string) {
  let unintended = true
  for (const allowedUrl of security.redirectAllowlist) {
    unintended = unintended && !toUrl.startsWith(allowedUrl)
  }
  return unintended
}
