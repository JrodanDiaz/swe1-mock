import DefaultProfilePic from "./DefaultProfilePic";

export default function Navbar() {
  return (
    <div className="w-full h-40 bg-off-blue flex flex-col justify-center items-center">
      <div className="w-full h-4/6 bg-main-blue flex justify-end items-center gap-4">
        <DefaultProfilePic height={100} width={100} />
      </div>
    </div>
  );
}
