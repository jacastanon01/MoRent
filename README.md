
![project](https://github.com/jacastanon01/MoRent/assets/24418510/b5d5123d-cff7-4868-bc2f-f523dceb1381)

# Overview
This project is part of the JSM Masterclass experience, where my partner and I built and presented an MVP for a car-renting application. We were tasked with creating a web application for a hypothetical client and given a figma design for the UI as well as functional requirements. 

With MoRent, you can search for cars in your area to rent for a weekend or even list your own car and make some extra income! Payments are handled using the Stripe api to make renting out a car a seamless experience. 

# Technologies
## Client-side
- Next.js
- NextAuth
- TailwindCSS
- ShadCn
- Zod for client and server side validation
- Framer motion

## Server-side
- Utilizes Nextjs server actions
- Prisma to interact with database
- PostgreSQL database is hosted with [neon](https://neon.tech)
- AWS S3 Bucket to store images

# Functionalities
- **Homepage** - Consisting of a banner of highlighted cars to rent, pickup and dropoff pickers, and a list of vehicles available for rent.
- **Signin/Signup Page** - Fully integrated with NextAuth to create a new user with an email/password combination or google account
- **All Cars Page** - List of vehicles, search, a sidebar with filtering functionality
- **Car Details Popup** - Consisting of additional car details, such as images, title, brand, price, and a list of other recommended cars available for rent.
- **Add a Car Page** -  Add car details (images, title, brand, price) through a form. After submission, the car should appear on the home page and user profile
- **Car Rent Page** - After selecting dates to rent car, user redirects to a Stripe-powered checkout page which utilizes Stripe’s payment functionalities.
- **User Profile page** - Displays a list of cars rented by the user and cars put for rent by the user as well as the ability to customize avatar and cover photo

### Challenges/Process:
My role was planning out the database hosting and design the schema to dictate the data-flow of the application. We opted to use NextJS for the frontend and utilized vercel to host our deployed site. A consistent UI was maintained using our custom re-usable components and shadcn. Zod was used for client and server-side validation and we were able to to ensure type-safety with our prisma schema when interacting with our PostgreSQL database. 

One of the features was to allow users the option to sign up using google or create a fresh account with us. Since we used Next-Auth, this required some configuration on my end to allow us to store a user in the DB and link their google account to an Account model. I wanted to utilize Json Web Tokens to authorize a user's session in the browser instead of having to store and refresh tokens periodically and opted to still use the JWT strategy when it came to our auth process. 

I also learned a lot about image optimization and blob storage. You can upload any image for your profile picture, cover photo and add up to ten cars for the car you want to list. Images are stored in an AWS S3 bucket to handle the storage so the retrieval from the client is fast and reliable. To make our repository as DRY as possible, one of the challenges was communicating with my partner to make sure we were not stepping on each other's toes or building out new components if we didn't need to. This led to a total refactor for the forms, inputs and modals early on to ensure an organized file structure. 

### What I learned:
After a month of diving into using these new technologies, my partner and I were able to deploy a web application that can be used world-wide. My hope is to use my learning from this comprehensive project to contribute to more web applications in the future. 
