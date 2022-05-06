import { ProfileType } from '@app/profile/types/profile.types';

export interface ProfileResponseInterface {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}
