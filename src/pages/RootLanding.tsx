import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RootLanding = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-4">
        <Link to={`/wbsports/app/signin`}>
          <Button>Sports App</Button>
        </Link>
        <Button>Sports Website</Button>
        <Button>Services App</Button>
        <Button>Services Website</Button>
      </div>
    </div>
  );
};
export default RootLanding;
