export default function Container({ children, className }) {
  return (
    <div id={`main-container`} className={`bg-base-100 m-auto w-full xl:w-2/3 drop-shadow-md mb-4 rounded-b-2xl md:px-4 lg:px-6 xl:px-6 py-2 2xl:py-6 relative`}>
      {children}
    </div>
  );
}
