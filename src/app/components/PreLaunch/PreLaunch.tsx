const PreLaunch = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <div className="prelaunch-container h-screen w-full flex flex-col items-center justify-center text-white bg-[var(--bg2)]">
      <h1 className="text-4xl mb-4 text-[var(--fg)]">Website under construction</h1>
      <p className="text-lg text-[var(--fg)] mb-8">
        This website is under active development. I deployed it early because I started applying for jobs and wanted to include my website URL in my
        resume.
      </p>
      <button className="px-4 py-2  text-[var(--fg)] font-bold rounded" onClick={onConfirm}>
        Enter site
      </button>
    </div>
  );
};

export default PreLaunch;
