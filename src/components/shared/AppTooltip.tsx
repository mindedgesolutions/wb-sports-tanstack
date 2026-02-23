import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { showLess } from '@/utils/functions';

const AppTooltip = ({ text, cropped }: { text: string; cropped?: string }) => {
  const defaultCropped = cropped ? cropped : showLess(text, 20);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{defaultCropped}</span>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default AppTooltip;
