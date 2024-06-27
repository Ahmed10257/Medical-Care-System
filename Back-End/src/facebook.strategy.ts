import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: "http://localhost:3000/facebook/redirect",
      scope: ['email'],
      profileFields: ["id", "emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails ? emails[0].value : null,
      firstName: name ? name.givenName : null,
      lastName: name ? name.familyName : null,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
