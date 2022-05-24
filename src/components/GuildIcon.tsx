import Image from "next/image";

type IconProps = {
  guildId: string;
  guildName: string;
  guildIcon: string;
  size: number;
};

export const GuildIcon = ({
  guildId,
  guildName,
  guildIcon,
  size,
}: IconProps) => {
  return (
    <>
      {guildIcon ? (
        <Image
          className="rounded-full"
          src={`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`}
          alt="guild icon"
          width={size}
          height={size}
        />
      ) : (
        <span
          style={{
            width: size,
            height: size,
            fontSize: size > 32 ? "1.125rem" : "0.875rem",
          }}
          className="select-none flex items-center justify-center rounded-full border-2 border-gray-300 font-semibold"
        >
          {guildName.match(/\b(\w)/g)}
        </span>
      )}
    </>
  );
};
