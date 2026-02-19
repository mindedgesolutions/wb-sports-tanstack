import { Phone } from 'lucide-react';
import { MdEmail } from 'react-icons/md';

type AppContactInfoProps = {
  contact1: string;
  contact2?: string | null;
  email?: string | null;
};

const AppContactInfo = ({ contact1, contact2, email }: AppContactInfoProps) => {
  return (
    <section className="flex flex-col gap-2">
      <span className="flex justify-start items-center gap-1.5">
        <Phone className="size-3" />
        <span className="tracking-wide">{contact1}</span>
      </span>
      {contact2 && (
        <span className="flex justify-start items-center gap-1.5">
          <Phone className="size-3" />
          <span className="tracking-wide">{contact2}</span>
        </span>
      )}
      {email && (
        <span className="flex justify-start items-center gap-1.5">
          <MdEmail className="size-3" />
          <span className="tracking-wide">{email}</span>
        </span>
      )}
    </section>
  );
};
export default AppContactInfo;
