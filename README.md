# Salama Malek - Personal Portfolio

A modern, responsive personal portfolio website built with React.js, showcasing Salama Malek's skills as a Full Stack Developer.

## ?? Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Internationalization**: Support for 5 languages (EN, AR, RU, DE, FR)
- **Modern UI/UX**: Smooth animations with AOS (Animate On Scroll)
- **Interactive Components**: Project showcases, testimonials, and contact forms
- **Performance Optimized**: Lazy loading and optimized assets
- **SEO Friendly**: Meta tags, Open Graph, and Twitter Cards

## ??? Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: SCSS, Bootstrap 5
- **Animations**: AOS (Animate On Scroll)
- **Internationalization**: i18next, react-i18next
- **Carousels**: React Slick
- **Forms**: Web3Forms API
- **Icons**: Iconify React

## ?? Sections

- **Hero**: Introduction and call-to-action
- **About**: Personal information and skills
- **Projects**: Portfolio showcase with detailed modals
- **Services**: Development services offered
- **Experience**: Work history and achievements
- **Testimonials**: Client feedback and reviews
- **Contact**: Contact form and information

## ?? Languages Supported

- English (EN) - Default
- Arabic (AR) - RTL support
- Russian (RU)
- German (DE)
- French (FR)

## ?? Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Salama-Malek/salama-malek-portfolio.git
cd salama-malek-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

## ?? Project Structure

```
src/
+-- components/          # Reusable UI components
+-- pages/              # Page components
+-- scss/               # Styles and variables
+-- i18n.js            # Internationalization config
+-- App.js             # Main app component
```

## ?? Customization

### Adding New Languages

1. Create translation files in `public/locales/{lang}/translation.json`
2. Add the language code to `src/i18n.js`
3. Update the `LanguageSwitcher` component

### Modifying Content

Update the translation files in `public/locales/en/translation.json` and other language files to modify content.

### Styling

Modify SCSS files in `src/scss/` to customize the appearance.


## Image Format Policy

- Use **WebP** for new raster images in `public/` by default.
- Keep SVG for vector assets/logos/illustrations where appropriate.
- Only keep PNG/JPEG when required for compatibility or lossless quality constraints.
- Add explicit dimensions or aspect-ratio placeholders for key images to avoid layout shift.

## ?? Contact

- **Email**: salamahassanein@gmail.com
- **Phone**: +7 993 287 3992
- **LinkedIn**: [Salama Malek](https://www.linkedin.com/in/salama-malek)
- **GitHub**: [Salama-Malek](https://github.com/Salama-Malek)

## ?? License

This project is open source and available under the [MIT License](LICENSE).

## ?? Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ?? by Salama Malek
