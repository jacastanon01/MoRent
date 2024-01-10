import CalendarIcon from './CalendarIcon';
import CheckIcon from './CheckIcon';
import MapPinSvg from './MapPinSvg';

const ThreeStepsSection = () => {
  return (
    <section className='flex bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-[923px] py-[100px] text-center'>
        <div className='mb-[72px] flex flex-col items-center gap-[10px]'>
          <h2 className='text-lg font-normal uppercase leading-[200%] tracking-widest text-gray-700 dark:text-gray-400 '>
            How it works
          </h2>
          <h3 className='text-4xl font-bold leading-[120%] text-gray-900 dark:text-white'>
            Rent with following 3 working steps
          </h3>
        </div>

        <div className='relative flex grid-cols-3 flex-col items-center justify-center gap-8 md:grid md:gap-32'>
          {/* Dashed lines */}
          <div className='absolute left-[185px] top-[75px] z-0 hidden h-[0px] w-[180px] border border-dashed border-gray-300  md:block'></div>
          <div className='absolute right-[185px] top-[75px] z-0 hidden h-[0px] w-[180px] border border-dashed border-gray-300  md:block'></div>

          <div className='relative z-10 flex max-w-[212px] flex-col items-center gap-7 text-center'>
            <div className='flex h-[136px] w-[136px] items-center justify-center rounded-[10px] bg-white shadow-[9px_26px_100px_0px_rgba(217,236,255,0.80)] dark:bg-gray-850 dark:shadow-gray-850'>
              <MapPinSvg />
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='font-bold leading-[130%] text-gray-850 dark:text-white'>
                Choose location
              </h4>
              <p className='text-base font-medium leading-[160%] text-gray-700 dark:text-gray-400'>
                Choose your location and find your best car
              </p>
            </div>
          </div>

          <div className='relative z-10 flex  max-w-[212px] flex-col items-center gap-7 text-center'>
            <div className='flex h-[136px] w-[136px] items-center justify-center rounded-[10px] bg-white shadow-[9px_26px_100px_0px_rgba(217,236,255,0.80)] dark:bg-gray-850 dark:shadow-gray-850'>
              <CalendarIcon />
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='font-bold leading-[130%] text-gray-850 dark:text-white'>
                Pick-up date
              </h4>
              <p className='text-base font-medium leading-[160%] text-gray-700 dark:text-gray-400'>
                Select your pick-up date and time to book your car
              </p>
            </div>
          </div>

          <div className='relative  z-10 flex max-w-[212px] flex-col items-center gap-7 text-center'>
            <div className='flex h-[136px] w-[136px] items-center justify-center rounded-[10px] bg-white shadow-[9px_26px_100px_0px_rgba(217,236,255,0.80)] dark:bg-gray-850 dark:shadow-gray-850'>
              <CheckIcon />
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='font-bold leading-[130%] text-gray-850 dark:text-white'>
                Book your car
              </h4>
              <p className='text-base font-medium leading-[160%] text-gray-700 dark:text-gray-400'>
                Book your car and we will deliver it directly to you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeStepsSection;
