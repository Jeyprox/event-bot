import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  iconName: string;
};

const PageTitle = ({ title, subtitle, iconName }: Props) => {
  return (
    <div className="grid gap-y-2">
      <div className="flex item-center gap-x-4">
        <Image
          src={`/img/icons/${iconName}.svg`}
          alt="event-icon"
          width={32}
          height={32}
          layout="fixed"
        ></Image>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <p className="text-gray-300">{subtitle}</p>
    </div>
  );
};

export default PageTitle;
