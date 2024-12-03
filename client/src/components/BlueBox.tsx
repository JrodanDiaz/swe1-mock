interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function BlueBox({ children, className = "" }: Props) {
  return (
    <div className={`border-4 border-main-blue  rounded-2xl p-4 ${className}`}>{children}</div>
  );
}
