import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-2 sm:mb-0">
          &copy; {currentYear} ShopSmart. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {/* Using placeholder links as these routes are not defined */}
          <Link to="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;