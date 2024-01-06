export default function ContentWrapper({ content, children, className }) {
  return (
    <article className={``}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
