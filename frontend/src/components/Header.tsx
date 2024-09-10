const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="py-4 ">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
    </div>
  );
};

export default Header;
