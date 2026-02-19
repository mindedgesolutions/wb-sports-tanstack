import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AppTooltip = ({ text, cropped }: { text: string; cropped: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{cropped}</span>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default AppTooltip;
