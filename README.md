## Link Saver Chrome Extension

### Building

1. Clone this repo
1. `yarn install && yarn build`
1. You should have a `/build` folder now with all the necessary assets

### Installing

1. Go to `chrome://extensions`
1. Enable `Developer mode` in the top right corner
1. Click `Load unpacked` from the top left corner
1. Find and select the entire `/build` folder that was output during the build step
1. The extension should appear in your toolbar now. Click it to make sure it opens correctly
  1. If you get an error saying something about the `Content Security Policy directive`, you'll need to update the `/public/manifest.json` file. Honestly I'm not sure what this error means.
  1. The error should say something like `Either the..., a hash ('sha256-HASH'), or a nonce....`. Copy the `sha256-HASH` and replace the current value in `content_security_policy` of the `/public/manifest.json`
  1. Re-build and re-upload
