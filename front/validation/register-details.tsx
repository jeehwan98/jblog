interface RegisterDetailsProps {
  userId: string;
  password: string;
  imageUrl: string;
  gender: string;
  username: string;
}

export function validateRegisterDetails(registerDetails: RegisterDetailsProps) {
  console.log('registerDetails? in register details:', registerDetails);
}