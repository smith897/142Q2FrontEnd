# 142 Q2 Front End

## Overview
Front end of the queue, with a simple back end using Node, and a mongoose db. I'm only using mongoose because I need to for a CS260 project, when I'm done I'll replace the back end with a simpler one that just returns dummy data.

## Starting the Website
You'll need to run the front end and the back end. Go into the front end directory in a terminal and run "npm run serve". It will print on the screen where you can view the website. To run the back end, go into the back end directory and run "node server.js". You'll probably need to do some setup first to get it to work, google how to install the vue cli and node.js to get it to work.

The output from the back end will appear in the terminal. Open developer tools and the console in your browser to see output from the front end (ctrl + shift + c in chrome).

Each time you change the front end, you'll possibly need to run "npm run build". I think.

## Understanding the code
You'll need a background in Vue in order to understand everything going on. After taking CS260 you should know everything you need.

The 3 main pages are in the front end under src/views. Those define each page and its behavior. Pieces of those pages that are defined elsewhere are in the components: {} braces, and can be found in src/components.

You'll see that the HTML at the top of the Vue files defines the layout of the page, and the javascript in the middle of the files defines the behavior of the page, and the CSS at the bottom of the files define the style of the page. The HTML also indicates what javascript code should be run when you interact with certain elements of the page.

## Progress on the code
Currently, the front end supports the 4 api endpoints found in the dummy server. From here my guess of the best plan of attack is to pick a piece of the functionality that isn't yet supported, put it into the page using the HTML and CSS, and then define behavior for it (including API calls) in the javascript, and then repeat that process until it has complete functionality.

I would also keep the dummy server updated and working. Maintaining the front end will be a disaster if you aren't able to test it independently from the back end.

One problem with the code currently is every time you want to update the page, it must refresh. The page currently refreshes itself when you interact with certain elements, but this is clunky, and won't show updates to the page until you interact with it. I know there are ways to fix this, but I don't know what they are.

## Link to an older version currently being hosted
http://creative4.skylerjsmith.com/#/
