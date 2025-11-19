# ☀️ Modern Weather App

A stunning, feature-rich weather application with a modern glassmorphism design, dynamic backgrounds, and comprehensive weather data. Built with vanilla JavaScript, HTML, and CSS.

![Weather App Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Modern Design
- **Dark Mode**: Sophisticated dark theme with vibrant gradients
- **Glassmorphism**: Frosted glass effects throughout the interface
- **Dynamic Backgrounds**: Background changes based on weather conditions
  - ☀️ Sunny: Orange to pink gradient
  - ☁️ Cloudy: Purple to blue gradient
  - 🌧️ Rainy: Dark blue gradient
  - ❄️ Snowy: Light blue to white gradient
  - 🌫️ Foggy: Gray gradient
- **Smooth Animations**: Entrance animations, hover effects, and micro-interactions
- **Modern Typography**: Poppins font family from Google Fonts

### 🌍 Weather Features
- **Automatic Geolocation**: Displays weather for your current location on load
- **City Search**: Search for weather in any city worldwide
- **5-Day Forecast**: Daily weather predictions with min/max temperatures
- **Comprehensive Metrics**:
  - Current temperature
  - Feels like temperature
  - Humidity percentage
  - Wind speed
  - Atmospheric pressure
  - Visibility
  - Sunrise and sunset times
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Weather Icons**: Visual weather condition indicators

### 💡 User Experience
- **Keyboard Support**: Press Enter to search
- **Loading States**: Professional loading spinner during API calls
- **Error Handling**: User-friendly error messages for all scenarios
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **LocalStorage**: Remembers your temperature unit preference

## 🚀 Demo

Visit the live demo: [Weather App](https://sumo-king.github.io/Weather-App/) *(Update with your GitHub Pages URL)*

## 📸 Screenshots

### Desktop View
*Glassmorphism design with dynamic gradients*

### Mobile View
*Fully responsive interface*

### Weather Conditions
*Different backgrounds for different weather*

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with custom properties
  - Glassmorphism effects
  - CSS Grid & Flexbox
  - Keyframe animations
  - Media queries for responsiveness
- **JavaScript (ES6+)**: 
  - Async/await for API calls
  - Geolocation API
  - LocalStorage API
  - DOM manipulation
- **jQuery**: DOM traversal and manipulation
- **OpenWeatherMap API**: Weather data provider
- **Google Fonts**: Poppins typeface

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- OpenWeatherMap API key (free tier available)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sumo-king/Weather-App.git
cd Weather-App
```

### 2. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Copy your API key

### 3. Configure API Key

Open `Weather App/main.js` and replace the API key on line 3:

```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

> ⚠️ **Security Note**: For production use, consider using environment variables or a backend proxy to protect your API key.

### 4. Run the Application

#### Option 1: Using Python (Recommended)

```bash
cd "Weather App"
python3 -m http.server 8000
```

Then open `http://localhost:8000/main.html` in your browser.

#### Option 2: Using Node.js

```bash
npx http-server "Weather App" -p 8000
```

#### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension
2. Right-click on `main.html`
3. Select "Open with Live Server"

#### Option 4: Direct File Access

Simply open `Weather App/main.html` in your browser (some features may be limited).

## 📖 Usage

### Search for a City

1. Type a city name in the search box
2. Click "Search" or press Enter
3. View the weather data and 5-day forecast

### Toggle Temperature Units

- Click the °C/°F button to switch between Celsius and Fahrenheit
- Your preference is saved automatically

### View Additional Metrics

Scroll down to see:
- Wind speed
- Atmospheric pressure
- Visibility
- Sunrise and sunset times
- 5-day forecast with daily highs and lows

## 🏗️ Project Structure

```
Weather-App/
├── Weather App/
│   ├── main.html          # Main HTML file
│   ├── main.css           # Styles (glassmorphism, animations)
│   ├── main.js            # JavaScript logic
│   └── JQuery/
│       └── jquery-3.7.1.js
└── README.md              # This file
```

## 🎨 Design System

### Color Palette

```css
--primary: #667eea;        /* Vibrant purple-blue */
--secondary: #764ba2;      /* Rich purple */
--accent: #f093fb;         /* Soft pink */
--success: #4facfe;        /* Bright blue */
--text-primary: #ffffff;   /* White */
--text-secondary: rgba(255, 255, 255, 0.7);
```

### Spacing System

```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
```

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 600, 700
- **Sizes**: 0.85rem - 3rem

## 🔑 Key Features Explained

### Glassmorphism Effect

The app uses CSS `backdrop-filter` to create a frosted glass effect:

```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Dynamic Backgrounds

JavaScript updates the body class based on weather conditions:

```javascript
function updateWeatherBackground(condition) {
    document.body.className = `weather-${condition.toLowerCase()}`;
}
```

CSS then applies the appropriate gradient:

```css
body.weather-clear {
    background: linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%);
}
```

### Smooth Animations

Entrance animations using CSS keyframes:

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px
- **Small Mobile**: Below 500px

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |

> **Note**: Glassmorphism (`backdrop-filter`) is supported in all modern browsers.

## 🐛 Known Issues

- API key is exposed in client-side code (acceptable for personal projects)
- Daily forecast endpoint requires paid API subscription (using 3-hourly data instead)

## 🔮 Future Enhancements

- [ ] Add weather alerts and warnings
- [ ] Implement search history
- [ ] Add favorite cities feature
- [ ] Hourly forecast view
- [ ] Weather maps integration
- [ ] Remove jQuery dependency
- [ ] Add unit tests
- [ ] Implement service worker for offline support
- [ ] Add weather-based animations (rain, snow effects)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Shelton** - [GitHub Profile](https://github.com/sumo-king)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from OpenWeatherMap
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) by Google Fonts
- Inspired by modern glassmorphism design trends

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/sumo-king/Weather-App/issues) page
2. Create a new issue with detailed information
3. Contact via GitHub

---

**Made with ❤️ and ☕ by Shelton**

*Last Updated: November 2025*
