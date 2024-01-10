import MakeLogo from './MakeLogo';

const LogoSection = () => {
  const makes = [
    {
      brandName: 'Mazda',
      logo: '/assets/make-brands/mazda-logo.png',
    },

    {
      brandName: 'Jaguar',
      logo: '/assets/make-brands/jaguar-logo.png',
    },
    {
      brandName: 'Ford',
      logo: '/assets/make-brands/ford-logo.png',
    },

    {
      brandName: 'Hyundai',
      logo: '/assets/make-brands/hyundai-logo.png',
    },
    {
      brandName: 'Mercedes',
      logo: '/assets/make-brands/mercedes-logo.png',
    },
    {
      brandName: 'Audi',
      logo: '/assets/make-brands/audi-logo.png',
    },
    {
      brandName: 'Honda',
      logo: '/assets/make-brands/honda-logo.png',
    },
  ];

  // Duplicate the array
  const makesDouble = [...makes, ...makes];

  return (
    <section className='overflow-hidden bg-white dark:bg-gray-850'>
      <div className='container flex animate-scroll justify-between py-6 lg:animate-none'>
        {makes.map((make, index) => (
          <MakeLogo
            src={make.logo}
            brand={make.brandName}
            key={make.brandName + index}
            className='hidden lg:block'
          />
        ))}
        {makesDouble.map((make, index) => (
          <MakeLogo
            src={make.logo}
            brand={make.brandName}
            key={make.brandName + index + makes.length} // add makes.length to avoid duplicate keys
            className='lg:hidden'
          />
        ))}
      </div>
    </section>
  );
};

export default LogoSection;
