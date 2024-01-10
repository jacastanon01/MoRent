import Link from 'next/link';
import Logo from '../shared/Logo';

const AboutLinks = [
  {
    title: 'How it works',
    href: '/how-it-works',
  },
  {
    title: 'Featured',
    href: '/',
  },
  {
    title: 'Partnership',
    href: '/',
  },
  {
    title: 'Business Relations',
    href: '/',
  },
];

const CommunityLinks = [
  {
    title: 'Events',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/',
  },
  {
    title: 'Podcast',
    href: '/',
  },
  {
    title: 'Invite a friend',
    href: '/',
  },
];

const SocialsLinks = [
  {
    title: 'Discord',
    href: '/',
  },
  {
    title: 'Instagram',
    href: '/',
  },
  {
    title: 'Twitter',
    href: '/',
  },
  {
    title: 'Facebook',
    href: '/',
  },
];

const FooterLinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='mb-4 text-xl font-semibold leading-6 text-gray-800 dark:text-white-100 md:mb-6'>
        {title}
      </h3>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.title}
          className='text-base font-medium leading-5 text-gray-400 dark:text-white-200'
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className='relative z-10 bg-white p-6 dark:bg-gray-900 md:pt-16 lg:pt-20'>
      <div className='container'>
        <div className='flex flex-col gap-12 md:flex-row md:justify-between'>
          {/* Logo */}
          <section>
            <Logo className='mb-4 text-[24px]' />
            <p className='max-w-[216px] text-xs font-medium leading-[200%] tracking-[-0.12px] text-gray-400 dark:text-white-200 md:max-w-[292px] md:text-base'>
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </section>

          {/* Links */}

          <section className='grid grid-cols-2 gap-12 md:grid-cols-3'>
            {/* About */}
            <FooterLinkColumn title='About' links={AboutLinks} />

            {/* Community */}
            <FooterLinkColumn title='Community' links={CommunityLinks} />

            {/* Socials */}
            <FooterLinkColumn title='Socials' links={SocialsLinks} />
          </section>
        </div>
        {/* Legal infos */}
        <section className='mt-12 border-t border-blue-50 pt-12 dark:border-gray-850 md:mt-16 md:pb-6'>
          <div className='flex w-full flex-col items-start justify-between gap-4 text-base font-semibold leading-6 text-gray-800 dark:text-white-100 md:flex-row'>
            <p className='shrink-0'>
              © {new Date().getFullYear()} MORENT. All rights reserved.
            </p>
            <div className='-order-1 flex w-full justify-between gap-4 md:order-1 md:justify-end lg:gap-[60px]'>
              <Link href='/'>Privacy Policy</Link>
              <Link href='/'>Terms & Conditions</Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};
