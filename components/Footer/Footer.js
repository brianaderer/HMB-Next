import { Container, NavigationMenu } from '../../components';


export default function Footer({ title, menuItems }) {
  const year = new Date().getFullYear();

  return (
      <div className={`h-48 w-full bg-base-300 z-10 border-t-4 border-t-accent/15`}></div>
  );
}
