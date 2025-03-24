import { Link } from '../Link/Link';

const PreLaunch = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <div className="prelaunch-container h-screen w-full flex flex-col items-center justify-center bg-[var(--bg)]">
      <h1 className="text-4xl mb-4 ">Website under construction</h1>
      <p className="text-lg mb-8 px-100">
        This website is under active development. I deployed it early because I started applying for jobs and wanted to include my website URL in my
        resume.
      </p>
      <Link variant="secondary" text={'Enter'} onClick={onConfirm} />
    </div>
  );
};

export default PreLaunch;
