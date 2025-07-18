import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="max-w-[700px] row-start-2 flex flex-col items-center gap-[32px] text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to the Unseen App
        </h1>
        <p className="text-lg text-muted-foreground">
          Connecting those who need legal support with qualified professionals. Simples, secure, and swift access to justice.
        </p>
        <Link href={`/`} className="w-full">
          <Button className='w-full max-w-48' size="lg">
            Get Started
          </Button>
        </Link>
      </main>
    </div>
  );
}
