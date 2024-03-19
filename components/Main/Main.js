import * as SELECTORS from '../../constants/selectors';


export default function Main({ children, className, ...props }) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={`bg-none pr-10 ml-4 lg:mx-8 lg:pr-0`}
      {...props}
    >
      {children}
    </main>
  );
}
