# Cocktailio Smartphone App

Built using [Expo](https://expo.dev/).

## Get started

Requires: [Node](https://nodejs.org/en/) and [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall)

1. Clone/Download this repo
2. Run `npm install` to install dependencies
3. Add an `.env` file with your Supabase url and anon key. See the `.env.example` for the variable names.
4. run `npx expo start` to start the dev server
5. Open the app on your device using the [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) app

- Scan the QR code you see in the terminal

## Commands

### `npm run start`

Start the development server.

- Press `i` to run the iOS simulator
  - Alternatively press `shift i` to select which iOS simulator to open.
- Press `a` to run android emulator.

Run `npm run start -c` to clear the cache

### `npm run ios`

Start the dev server and open the iOS emulator.

Requires a Mac with Xcode, and Xcode command line tools installed. See [Expo docs](https://docs.expo.dev/workflow/ios-simulator/) for more info.

#### `npm run android`

Start the dev server and open the Android emulator.

Requires JDK and Android Studio be installed. See [Expo docs](https://docs.expo.dev/workflow/android-studio-emulator/) for more info.

## Debugging

After running `npm run start` press `j` to open the Chrome console.

## Installing third party libraries

Use the [Expo CLI](https://docs.expo.dev/more/expo-cli/#install) to install a library by running `npx expo install <library-name>` or `npx expo install <library-name> -- --save-dev`

## Generate Supabase types

```
npx supabase login
```

```
npx supabase gen types typescript --project-id "oysrqfsfxvjeyvtjohix" --schema public > lib/types/supabaseGenerated.ts
```
