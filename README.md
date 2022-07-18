This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Development environment

First, run the development server in another terminal:

```bash
npm run dev
# or
yarn dev
```

### Dealing with Dates

[Documentation](https://moment.github.io/luxon/#/math?id=comparing-datetimes) to Luxon

### Storybook

To run your Storybook, type:

npm run storybook

## Authentication

Firebase authentication

## Database

### Collections

#### Users

Collects information about the users that are not part of the Firebase auth information

#### Weddings

Collect information about weddings:

- groom and bride
- story
- events
- dresscode
- etc.

#### RSVP

RSVP are the relation between a wedding and a users, it also contains information such as role, and food preferences.
