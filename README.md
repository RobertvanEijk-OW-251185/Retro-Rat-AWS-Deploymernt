# DVAtors

# 💾 RetroRat: The Ultimate Vintage Tech Time Machine
## Old Tech, New Hands 

![BannerImage](Retro-Rat/src/assets/ReadMeImages/BannerImage.png)

> **"Welcome to the grid."** > 
> Did you spend your childhood blowing into cartridges? Do you miss the warm, analogue hiss of a cassette tape? **RetroRat Market** isn't just an e-commerce platform; it's a comeback. We are building the ultimate digital flea market for vintage tech, retro games, and analogue media, all wrapped up in a glorious, pixel-perfect 90s desktop aesthetic.

---

## 🕹️ The Vision: Dialling Up the Past

We aren't just selling nostalgia; we're wrapping you in it. RetroOS Market is a full-stack e-commerce web application designed for collectors, tinkerers, and retro-tech enthusiasts. 

![Image1](Retro-Rat/src/assets/ReadMeImages/HomePage.png)

---

## ✨ Radical Features

Users exploring RetroRat will have full access to:

* **💾 The Cyber-Marketplace (Buy & Sell):** A complete storefront flow. Cop that pristine Sony Walkman you’ve been hunting for, or list your own stash of 8-tracks and old-school hardware to make some digital coin.
* **👾 User Profiles (Log On):** Secure authentication so you can manage your active listings, track your sales, and build your retro empire.
* **⭐ Save to Floppy (Wishlist):** See a Sega Genesis you want but need to wait till payday? Save it directly to your personal wishlist.
* **🖨️ The Message Boards (Comments):** Jump into the comment section on any item. Ask the seller about the specs, negotiate, or just geek out over shared nostalgia with the community.
* **🗑️ Drag to Trash:** Changed your mind about selling that old Macintosh? Easily delete and manage your live postings.

![Image1](Retro-Rat/src/assets/ReadMeImages/Home2.png)
![Image1](Retro-Rat/src/assets/ReadMeImages/SignUp.png)
![Image1](Retro-Rat/src/assets/ReadMeImages/SignIn.png)
![Image1](Retro-Rat/src/assets/ReadMeImages/InvalidToast.png)
![Image1](Retro-Rat/src/assets/ReadMeImages/SuccessToast.png)

---

## 🛠️ Under the Hood (No Dial-Up Required)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)

[![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
* **Frontend Engine:** React.js / HTML5 / CSS
* **Backend Mainframe:** Node.js, Express.js
* **Data Storage:** MongoDB
* **Security Protocol:** JSON Web Tokens (JWT) / bcrypt
* **Graphics & Assets:** Custom pixel art, 8-bit icon packs, and retro UI component libraries

---

## 🚀 Boot Sequence (Getting Started)

Ready to run the os? Follow these steps to get a local copy running on your machine.

### System Requirements
* [Node.js](https://nodejs.org/) installed
* [Git](https://git-scm.com/) installed
* A running instance of MongoDB (Local or Atlas)

### Installation Manual

## 1. Clone the repository:
   
bash
```
git clone [https://github.com/remilkies/retro-rat.git](https://github.com/remilkies/retro-rat.git)
```
   
## 2. Access the directory:

Bash
```
cd retro-rat
```

## 3. Install Backend Dependencies:

Bash
```
npm install
```

## 4. Install Frontend Dependencies:

Bash
```
cd retro-rat
```

```
npm install
```

## 5. Configure Environment Variables:
Create a .env file in the root directory and add the necessary config variables.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
SITE_URL=https://your-deployed-domain
```

Set `SITE_URL` to the public origin where the production React site is served,
without a trailing slash. The Express server uses it to serve `/sitemap.xml`
with the homepage, shop, and approved product listings, and `/robots.txt` with
the sitemap URL. After deploying, open
`https://your-deployed-domain/sitemap.xml` and
`https://your-deployed-domain/robots.txt` to verify both responses, then submit
`sitemap.xml` in Google Search Console.

Execute Application:
Open your terminal in the root directory and run the start command:

Bash
# Boots up both the backend server and frontend client
```
npm run dev 
```

## Mockups

![Desktop1](Retro-Rat/src/assets/ReadMeImages/Mockups/Desktop1.png)
![Desktop2](Retro-Rat/src/assets/ReadMeImages/Mockups/Desktop2.png)
![Laptop1](Retro-Rat/src/assets/ReadMeImages/Mockups/Laptop1.png)

---

## 👾 The Developers (SysAdmins)

### Our Team:

[Troy and Robert] - UI/UX Designers

[Rem] - Frontend Developer A - UI/UX Developer & Core Pages

[Robert] - Frontend Developer B - User Interaction & State

[Troy] - Backend Developer A - API & Database Architect

[Tshedza] - Backend Developer B & Authorisation & Business Logic

### Where to Find Us:

[Rem] - GitHub Profile - remilkies  
[![Rem's Profile](https://github.com/remilkies.png?size=100)](https://github.com/remilkies)

[Robert] - GitHub Profile - RobertvanEijk-OW-251185  
[![Robert's Profile](https://github.com/RobertvanEijk-OW-251185.png?size=100)](https://github.com/RobertvanEijk-OW-251185)

[Troy] - GitHub Profile - Troy-jsx  
[![Troy's Profile](https://github.com/Troy-jsx.png?size=100)](https://github.com/Troy-jsx)

[Tshedza] - GitHub Profile - BVLTRA  
[![Frank's Profile](https://github.com/BVLTRA.png?size=100)](https://github.com/BVLTRA)

---

[ SYSTEM MESSAGE: It is now safe to turn off your computer. ]

---
