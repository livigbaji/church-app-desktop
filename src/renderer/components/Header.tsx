interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <div>
      <h1 className="header">Technical Unit Admin</h1>
      <h5>{pageTitle}</h5>
      <br />
      <br />
    </div>
  );
};

export default Header;