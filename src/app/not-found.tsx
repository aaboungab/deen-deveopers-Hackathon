import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 px-4 py-8 md:px-8">
      <div className="flex items-center space-x-4">
        <h5 className="font-semibold">404 - Page Not Found</h5>
        <div className="h-10 border border-secondary-dark"></div>
        <Link href="/">
          <Button className="" variant="outline">
            <ChevronLeft />
            <span>Go back home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
