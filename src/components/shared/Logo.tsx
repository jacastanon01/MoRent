import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('text-blue-500 font-bold text-[32px]', className)}>
      MORENT
    </div>
  );
};

export default Logo;
