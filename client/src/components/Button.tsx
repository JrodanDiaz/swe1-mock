interface Props {
  submit?: boolean;
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({ submit = false, text, className = "", onClick }: Props) {
  return (
    <button
      className={`px-8 py-3 text-center bg-main-lblue rounded-full font-semibold text-xl ${className}`}
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
