import { images } from '@/constants';

const SpcFooter = () => {
  return (
    <div className="bg-muted-foreground/15 p-3 px-4 mt-16">
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground text-xs font-medium tracking-wider">
          All rights reserved &copy; {new Date().getFullYear()}
        </div>
        <div className="text-muted-foreground text-xs font-medium tracking-wider flex items-center gap-4">
          Developed & maintained by{' '}
          <img src={images.nicLogo} alt="" className="w-auto h-4" />
        </div>
      </div>
    </div>
  );
};
export default SpcFooter;
