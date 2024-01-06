export default function Container({ children, className }) {
  return (
    <div className={`bg-base-100 m-auto w-2/3 drop-shadow-lg mb-4 rounded-b-2xl px-6 py-10 relative`}>
      {children}
    </div>
  );
}
