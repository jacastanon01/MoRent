import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { usePopupContext } from '@/context/PopupProvider';
import { v4 as uuidv4 } from 'uuid';
import { addOrReplaceSearchParams, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const Modal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const { setPopup } = usePopupContext();

  const [modalShow, setModalShow] = React.useState(true);

  const handleModalClose = () => {
    setModalShow(false);
    addOrReplaceSearchParams([{ carId: '' }], router);
  };
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const modalVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence onExitComplete={() => setPopup(null)}>
      {modalShow && (
        <motion.div
          key={uuidv4()}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ ease: 'easeInOut', duration: 0.5 }}
          className='fixed inset-0 z-50 flex h-screen w-screen items-center justify-center'
        >
          <motion.div
            variants={backdropVariants}
            className='absolute left-0 top-0 h-full w-full bg-white/50 backdrop-blur-lg'
          />
          <motion.div
            variants={modalVariants}
            className={cn(
              `relative max-h-[95vh] w-full overflow-auto rounded-lg bg-white p-6 dark:bg-gray-850 sm:max-w-[540px] md:max-w-[990px] xl:max-w-[1440px] shadow-lg`,
              className,
            )}
          >
            {children}
            <Button
              variant='outline'
              onClick={handleModalClose}
              className='absolute right-1.5 top-1.5 border-0 bg-transparent p-2'
            >
              <X />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
