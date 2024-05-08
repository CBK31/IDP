export interface userObject extends signup {
  _id: string;
}

export interface tokenUserInfo {
  _id: string;
  dob: Date;
}

export interface userInfoToSign extends tokenUserInfo {
  exp: Number;
}

export class editProfile {
  firstName!: string;
  lastName!: string;
  email!: string;
  dob!: Date;
}
export class signin {
  email!: string;
  password!: string;
}
export class signup {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  dob!: Date;
}
