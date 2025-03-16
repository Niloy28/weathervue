# WeatherVue (ウェザービュー) ☀️

This is a Vue.js based weather application styled with TailwindCSS. The app allows users to search for weather information by location on its home page.

## Features 🎉

- Location searching feature on the home page (with pre-emptive suggestions!)
- Pin locations of interest to the homepage for quick access
- Current weather display
- Weather forecast for the next few days
- Responsive design using TailwindCSS

The weather data is fetched from [OpenWeatherMap's](https://openweathermap.org/) [OneAPI](https://openweathermap.org/api/one-call-3), and the location data is fetched from OpenWeatherMap's [GeocodingAPI](https://openweathermap.org/api/geocoding-api).

## Technologies ⚙️
- [Vue](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Dayjs](https://day.js.org/)

## Screenshots 📷
### Home Page
![Screenshot 2025-03-16 at 17-14-50 Home Weather Vue](https://github.com/user-attachments/assets/b02cfd31-c7b8-43f5-b8aa-ded7f7dba476)

### Location Search
![Screenshot 2025-03-16 at 17-26-35 Home Weather Vue](https://github.com/user-attachments/assets/013fddac-00b7-4c2e-a9c1-d0d9c6aa7810)


### Weather Details
![Screenshot 2025-03-16 at 16-30-40 Osaka JP Weather Vue](https://github.com/user-attachments/assets/eaaa2a9f-06da-4048-bf97-ccd7aaf958fb)

## Installation 📥

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Niloy28/weathervue.git

   ```

2. **Install the dependencies**:

   ```bash
   pnpm install

   ```

3. **Run the development server**:

   ```bash
   pnpm run dev
   ```

4. **Compile and minify for production**
   ```bash
   pnpm build
   ```

## Recommended IDE Setup 📝

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration 🔧

See [Vite Configuration Reference](https://vitejs.dev/config/).
