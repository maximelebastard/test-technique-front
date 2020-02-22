# MovieStar

MovieStar is a simple app to get an overview of the movies world.

It has been done as a React test for [CookAngels](https://github.com/cookangels).

![MovieStar](/readme-assets/welcome.png)

It uses [TheMovieDb API](developers.themoviedb.org) for his data.

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using [cra-template-typekit](https://github.com/rrebase/cra-template-typekit)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `test:coverage`

Run all tests with `--coverage`. Html output will be in `coverage/`.

### `yarn lint`

Lints the code for eslint errors and compiles TypeScript for typing errors.
Update `rules` in `.eslintrc` if you are not satisifed with some of the default errors/warnings.

### `yarn lint:fix`

Same as `yarn lint`, but also automatically fixes problems.

### `yarn storybook`

Generates and opens a [StoryBook](https://storybook.js.org/) with the components.

## Tech choices

### About the Components style

I choosed in this project to focus on the most modern React coding style using FC and hooks. However, I know about Class Based components.

Same for react-redux, I'm used to the HOC connect(mapStateToProps, mapDispatchToProps), but I have to admit the react-redux hooks (useDispatch and useSelector)are easier and quicker.

Despite of this last point, I choosed to split the Components and the Containers (\*.connected.tsx) - especially for tests purposes.

### About the API typing

In the `src/api/theMovieDb.ts` file, I deliberatly choosed to not type the API returns. My point of view is that we don't control that source of data, so make it typed or not - it will crash anyway a needed field changes.

My point of view about it is to convert the external data as quickely as I can to one of our own types that we control. That's what I've done in the Sagas.

### About the cache management

I chosed to cache some API results in Local Storage for 1 hour.

I can see a few bugs coming on edge cases, if for example the page 1 cache has expired but not the page 2. If the api result has changed a lot, that can cause movies to be in both pages. However those are edge cases, but it may be safer to cache all the movies pages with the same expiration timestamp.

### About the session ID

The Movie DB gives a session ID after the user has logged in, but no information is given about the validity time of that session ID.

I've never experienced it, but that may lead to a situation where we have a session ID stored in local storage - but it's not valid anymore and all the authenticated API calls fail.

We may need to check if the session ID is valid when the page loads, and have a transparent renewal system - like in OAuth 2. The API V4 seems to be way more explicit about that than the V3 we use.

### About the tests

As this is an exercise, I did not focus a lot on the coverage. However, you'll find a few `*.test.tsx` files. They all do simple tests using (Enzyme)[] and Jest Snapshots. The purpose is to make sure they render properly and track unintended side effects.

If we wanted to go further on them, we could use:

- Increase the cases with the snapshots by varying the inputed attributes
- Use Selenium with a Chrome Headless to do some basic Functional scenarios. Useful to test the routes for example.
- Increase the amount of browser tested using a tool like Browserstack

As a Mac User, I only tested it on Chrome, Safari and Firefox.

Using Grids and Flex displays, I know a few old browsers would probably not behave appropriately (IE 11, Edge 15)

### Safari animation random bug

I have an issue on the grid shift when a Details view expands on Safari. The grid sometimes doesn't let all the space needed to show the Details view. It is ugly, but still usable.

The issue is probably due to the way it computes the outer height of the details view. It seems to take it during the animation sometimes.

I would fix that by redesigning the CSS slide down animation of the Details view (avoiding to change the height, but use opacity, transform and other properties to do the animation).

### About the performance

By reproducing the Netflix/iTunes grid interface, I knew I would have to deal with a lot of items, and that variable height would cause performance issues.

I choosed the simple solution of extending the height of the selected element to make space in the grid. Because it was quicker, easier to achieve and responsive by design.

That causes performance issues because animating the height makes the browser draw a lot of elements again - which consumes a lot.

To optimize it, I would:

- Detect the height of the Details div
- Detect all the items to move down, using Javascript
- Move those items using the `transform: translateY` CSS property
- Move them down by applying a style

This would be way more performant as it uses a composite which limits drastically the new renderings needed.

> In summary: if I had time to detect in Javascript the grid items to move down, I would have done it which would have been less consuming in paintings.

### About publishing the API Key

From the words of Travis Bell, main maintainer of the Movie DB, [publishing the API Key is not an issue](https://www.themoviedb.org/talk/52c61af419c2952ac805bc31).

## Design

Before starting the project, I did a few mockups and renderings using a Sketchnote and Figma.

### Figma mockups

![Figma 1](/readme-assets/figma1.jpg)
![Figma 2](/readme-assets/figma2.jpg)
![Figma 3](/readme-assets/figma3.jpg)
