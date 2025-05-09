import ReactLogo from '@assets/icons/react.svg';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full ${className}`}
    >
      <img
        src={ReactLogo}
        className="h-[40vmin] mb-12 animate-[spin_4s_linear_infinite] "
        alt="logo"
      />
    </div>
  );
};

export default Loader;
