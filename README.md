# FED Storefront - Frontend

## 🚀 Project Overview
FED Storefront is an e-commerce web application that provides users with a seamless shopping experience. The frontend is built with modern web technologies to ensure performance, scalability, and user-friendliness.

🔗 **Live Website:** [FED Storefront](https://fed-storefront-backend-sachitha.netlify.app)   
🔗 **Backend:** [FED Storebackend](https://github.com/SachithaEshan/fed-Back-End)

## 📂 Project Structure
```
├── src
│   ├── components    # Reusable UI components
│   ├── pages         # Application pages
│   ├── api          # API service interactions
│   ├── hooks        # Custom hooks
│   ├── store        # Redux store
│   ├── styles       # Global styles
│   ├── utils        # Helper functions
│   ├── assets       # Static assets
│   ├── App.js       # Root component
│   ├── main.js      # Application entry point
│
├── public           # Static files
├── package.json     # Dependencies & scripts
├── README.md        # Project documentation
```

## 🛠 Technologies Used
- **React** - Frontend UI library
- **Redux Toolkit** - State management
- **RTK Query** - API handling
- **Tailwind CSS** - Styling framework
- **React Router** - Navigation
- **Clerk Authentication** - User authentication & authorization
- **Axios** - API requests handling

## 🔧 Setup & Installation
### Prerequisites
- Node.js (>= 16.x)
- npm or yarn

### Installation Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/SachithaEshan/fed-frontend.git
   cd fed-frontend
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```sh
   REACT_APP_API_URL=<YOUR_BACKEND_API>
   REACT_APP_CLERK_FRONTEND_API=<YOUR_CLERK_API>
   ```

4. **Run the development server**
   ```sh
   npm start  # or yarn start
   ```
   The app will be available at `http://localhost:3000`

## 🚀 Features
- User authentication (Login, Sign-up, Logout) via Clerk
- Product browsing & detailed view
- Add to cart & checkout
- Order history & user profile management
- Responsive UI with Tailwind CSS
- Secure API interactions with JWT authentication

## 🛠 API Endpoints
This frontend interacts with the **FED Storefront Backend** to manage data.
Refer to the backend repository for API details.

## 📌 Contributing
1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push the branch and open a Pull Request

## 📄 License
This project is licensed under the **MIT License**.

---
Made with ❤️ by [Sachitha Eshan](https://github.com/SachithaEshan)

