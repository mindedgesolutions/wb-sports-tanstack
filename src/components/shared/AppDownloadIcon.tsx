import { titles } from '@/constants';
import { isPreviewable } from '@/utils/functions';
import { GrDocumentDownload } from 'react-icons/gr';

type IconProps = {
  api: string;
  fileName: string;
};

const AppDownloadIcon = ({ api, fileName }: IconProps) => {
  const url = `${titles.BASE_URL}${api}`;
  const preview = isPreviewable(fileName);
  const icon = (
    <GrDocumentDownload className="w-5 h-5 text-muted-foreground/60 group-hover:text-chart-2 group-hover:cursor-pointer font-extralight" />
  );

  return (
    <>
      {preview ? (
        <a href={url} target="_blank">
          {icon}
        </a>
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {icon}
        </a>
      )}
    </>
  );
};
export default AppDownloadIcon;
