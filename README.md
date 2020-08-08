# HEB ATM

### Time Taken: ~4 hours

## Writeup - William Chen

After seeing how relatively free the requirements were for this challenge, I was pretty excited to attempt my implementation; I had all sorts of cool styling and ideas. However, as soon as I started implementing some stuff, I realized that the component was far more complex than I had originally thought.

## Sandbox
https://codesandbox.io/s/dazzling-hermann-1qs91

## Quick Note About Pin Codes
The default pin codes that have users attached (basically, the fixtures for the application store), at located in App.tsx. 
The codes that exist:
<ul>
  <li>1234</li>
  <li>3333</li>
  <li>12345678</li>
</ul>

## Mistakes

### State Management
I read https://tsh.io/state-of-frontend/ and was pretty interested in trying out React Context due to it's popularity (I have used Redux the majority of my React development). However, after an hour of using it for storage, I realized I had no idea how to update the Context. After reading through the documentation for a little bit (Context.Consumer), I decided to wipe it and just go with a static store that is passed down from the App.tsx parent. 

If I had time to redo it, I would simply import Redux with a base state that holds user information. Then, the complexity could be abstracted to actions (type: 'SET_USER', etc).

### Component Composition
It was difficult to wrap my head around how to implement the screen as a React component. I didn't want it to be a simple single input; I wanted it to look like a real ATM. If I had thought it through a little more, I could have componentized the screen in a better capacity; as it is right now, I do not think that the AuthenticatedScreen component is useful at all. The only benefit is that it reduces the number of lines in AutomatedTeller.tsx.

If I had time to redo it, I would abstract the screen itself into a "presentational" component that displays content passed in from the parent as children:

\<TellerScreen\>{children}\</TellerScreen\>

The screen could deal with the styling and the children would determine the content.

### Component State
Oof, I don't think multiple useStates were the way to go here. I still think storing the screen mode is a good way to manage that state, but the state management should probably use useReducer instead of useState; the multiple linked useState setters looks terrible and I should have thought of a better way to manage it with a single object variable as opposed to multiple useStates. The switch statements are too big.

### Tests
Didn't have the time to really think and write tests; I would first write unit tests for the utility that I wrote and use react-testing-library for the rendered components.

## What I thought I did well
<ul>
<li>The styling looks pretty good</li>
<li>The typing feels pretty natural and useful (ScreenMode, UserType)</li>
<li>The result works well</li>
</ul>

## Lessons Learned
<ul>
<li>Don't try a new paradigm on a timed challenge</li>
<li>Just implement Redux for state storage on a timed challenge</li>
</ul>

## Extra libraries added 
<ul>
<li>node-sass</li>
<li>react-icons</li>
</ul>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
