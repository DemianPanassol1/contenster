import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HeaderProps {
  title?: string | null;
}

const Header: React.FC<HeaderProps> = ({ title = null }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Header;
