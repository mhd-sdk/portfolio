import { TechnoList } from './technos';
export interface Techno {
  list: TechnoList;
}
export const DevIcons = ({ list }: Techno) => {
  return (
    <>
      {list.map((icon, index) => (
        <div key={index} className="flex flex items-center p-2 gap-2 bg-[var(--bg2)] text-[var(--text)]! ">
          <img
            alt=""
            //   className={cx(
            //     'devicon',
            //     css`
            //       width: 50px;
            //       margin-right: 10px;
            //       margin-bottom: 10px;
            //     `
            //   )}
            className="w-12"
            src={icon.url}
          />
          {icon.name}
        </div>
      ))}
    </>
  );
};
