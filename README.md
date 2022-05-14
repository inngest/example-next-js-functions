# Running Next.js functions on Inngest (⚠️ Alpha)

> 🚧 _NOTE_ - This is a proof of concept implementation. We're working on improvements including simplifying the event payload, improving monorepo support (i.e. 1 repo, n functions), and a new `inngest dev` server mode. This repo will be updated when those changes are shipped.

This repo demonstrates how to run any Next.js API functions as a serverless function on [Inngest](https://www.inngest.com). The benefits to running your Next.js functions on Inngest are:

- You can run your functions in the background
- You can trigger/invoke your functions from anywhere via the Inngest API
- You can run your functions on a schedule w/ a cron expression
- You get full history and logs of the events and the function's response right out of the box w/ Inngest

## How it works

Inngest can run any code that you can run in a Docker container, so you can run a Next.js app.

- We run a `next build` command to package up our functions with Next's webpack build
- The wrapper script (`inngest-run.js`) loads a given function passed as command line argument and passes the event payload to the function in the form of JSON to a POST request body.
- The response is handled by the the wrapper script and printed to stdout.
- The `Dockerfile` is a basic image that handles all of the above steps
- You can invoke the node script directly, or run `inngest run` which will read the function spec in the `inngest.json` file

## Running it

With the `inngest` cli ([how to install](https://github.com/inngest/inngest-cli#installation)) you can run your function with:

```
$ inngest run
```

Alternatively if you want to experiment with the code directly, you can run the wrapper script directly with:

```
$ yarn build
$ node ./inngest-run.js pages/api/hello.js '{ "baggage": { "WorkspaceEvent": { "Event": { "name": "myapp/user.signup" } } } }'
```

Swap out `pages/api/hello.js` in the command above or in the Dockerfile's build command to

Try out the different functions like `500-response.js` to see different outputs.

## Deploying

After [logging in](https://www.inngest.com/docs/cli/login), you can run this command to package up your function and deploy it to the Inngest platform:

```
$ inngest deploy
```

## Feedback, ideas, need help?

[Join our Discord](https://www.inngest.com/discord) and we'd be very happy to help or receive ideas that you have!
