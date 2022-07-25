import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { UserClaim } from './user-claim';

export class FirebaseConnection {
  static async getUser(accessToken: string): Promise<any> {
    const firebaseUser: any = await firebase
      .auth()
      .verifyIdToken(accessToken, true)
      .catch((err) => {
        throw new ForbiddenException('Por favor, registre-se ou faça login.');
      });

    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    return firebaseUser;
  }

  static async getUserClaims(accessToken: string): Promise<UserClaim> {
    const firebaseUser = await this.getUser(accessToken);
    const userRecord = await firebase.auth().getUser(firebaseUser.uid);

    return userRecord.customClaims as UserClaim;
  }
}
