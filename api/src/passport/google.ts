import GoogleTokenStrategy from 'passport-google-id-token'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

import User from '../models/user'
import { ParsedToken, VerifiedCallback } from '../types'

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (parsedToken: ParsedToken, googleId: string, done: VerifiedCallback) => {
      try {
        const email = parsedToken.payload.email
        let user: any = await User.findOne({ email })

        if (!user) {
          user = new User({
            email: parsedToken.payload.email,
            firstname: parsedToken.payload.given_name,
            lastname: parsedToken.payload.family_name,
          })
          user.save()
        }

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}
