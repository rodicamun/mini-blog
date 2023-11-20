# Mini Blog App

This mini blog app is a single-page application developed using React with TypeScript. It was bootstrapped with [Create React App](https://create-react-app.dev/), and it utilizes https://ant.design/ for design system. The app features a user profile sidebar and allows users to view, edit, and delete blog posts using a RESTful API.

## Features

- View a list of blog posts in the Blogs content area.
- User profile information is fetched from an API and displayed in a fixed sidebar.
- Navigate to detailed views of each post.
- Edit and delete functionality for blog posts.
- Responsive sidebar with fixed user details and navigation links, implemented with https://ant.design/.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project uses Yarn as a package manager. To install Yarn, follow the instructions on the [Yarn Documentation](https://yarnpkg.com/getting-started/install).

### Installation

1. Clone the repository:
   sh
   git clone https://github.com/rodicamun/task-application.git
   
2. Navigate to the project directory:
   sh
   cd task-application
   
3. Install the dependencies using Yarn:
   sh
   yarn install
   
### Environment Setup

Before running the application, you'll need to set up environment variables:

1. Create a `.env` file in the project root.
2. Add the following line to the `.env` file, replacing the URL with the base URL of the API:
   
   REACT_APP_API_URL=https://jsonplaceholder.typicode.com
   
3. Save the file. The application will now use this base URL for API requests.

### Running the App

To start the application, run the following command:

sh
yarn start


The app will be served at `http://localhost:3000` and should open automatically in your web browser.

### Testing

To run the unit tests configured for the app, execute:

sh
yarn test


## Usage

After starting the app, you will see the user profile on the sidebar and a list of blog posts.

- Use the **Dashboard** link to view the homepage (does not contain specific content).
- The **Blogs** link displays the list of posts.
- Click on any post to view its details, where you can edit or delete the post.
- Use the **Edit** button to change a post's title or content.
- The **Delete** button removes the post from the list.
- A **Back** button is provided to navigate back to the blogs list from post details.

## API Reference

This application utilizes JSONPlaceholder, a fake online REST API for testing and prototyping:

- User profile: `https://jsonplaceholder.typicode.com/users/{id}`
- User's posts: `https://jsonplaceholder.typicode.com/users/{id}/posts`
- Specific post: `https://jsonplaceholder.typicode.com/posts/{id}`

## Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See the `LICENSE` file for more information.

## Contact

Rodica Muntean - rodica.muntean@cognizant.com

Project Link: [https://github.com/rodicamun/task-application](https://github.com/rodicamun/task-application)
