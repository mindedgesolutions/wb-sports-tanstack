import { AppBodyWrapper, AppTitleWrapper } from '@/components';
import { titles } from '@/constants';

const SpaSportsInBengal = () => {
  document.title = `Sports in Bengal | ${titles.APP_TITLE_SPORTS}`;

  return (
    <>
      <AppTitleWrapper title="Sports in Bengal" />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 px-1">
            <span className="text-xs tracking-wider">
              This is a static page
            </span>
          </div>
          <div className=""></div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaSportsInBengal;
