export type User = {
  firstName: string;
  LastName: string;
  email: string;
  phone: number;
  address: Address;
}

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: Address;
  country: string;
  postalCode: string;
}
