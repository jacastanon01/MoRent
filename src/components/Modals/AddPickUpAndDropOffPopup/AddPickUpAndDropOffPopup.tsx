import Modal from '../Modal';
import PickUpDropOffForm from './PickUpDropOffForm';

export default function AddPickUpAndDropOffPopup() {
  return (
    <Modal className='!max-w-[500px]'>
      <section className='flex flex-col gap-[10px]'>
        <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
          Add Pickup & Drop-Off Info
        </h2>
        <p className='text-sm text-gray-400'>Please enter your info</p>
        <PickUpDropOffForm />
      </section>
    </Modal>
  );
}
