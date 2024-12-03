interface Props {
  height: number;
  width: number;
}
export default function DefaultProfilePic({ height, width }: Props) {
  return <img src="/default-pfp.png" alt="Profile Picture" height={height} width={width} />;
}
