# SPI 🌈 Virtual Community

A global virtual community for LGBTQIA+ refugees and asylum seekers to safely
connect

## Getting started 🚀

### Get permissions

Dev leads will need your github username to add you as a contributor.

### Development setup 🧑‍💻

To get the app running on your machine, follow the commands below:

1. Fork the repository

2. Clone the forked repository onto your local machine

```bash
git clone https://github.com/< your-github-username >/virtual-community
```

### Docker

Download `Docker Desktop` for
[Mac](https://docs.docker.com/desktop/install/mac-install/) or
[Windows](https://docs.docker.com/desktop/install/windows-install/). We will be
using dev containers to work on this project, and this software will help
facilitate the use of the container on your machine. This will ensure that the
team is all working with the same development environment.

### Dev containers VSCode extensions

Open up VSCode and install the `Dev Containers` and `Remote Development` VSCode
extensions

<img src="https://res.cloudinary.com/eleni/image/upload/v1680124298/dev-container-2_ctewiq.png">

#### Verify installation

Once the extensions are installed, you should see this light green icon in the
bottom left corner of your code editor

<img src="https://res.cloudinary.com/eleni/image/upload/v1680124126/dev-container-1_cefm7p.png">

#### Opening into the container 📦

Click the above light green icon to reveal the following options:

<img src="https://res.cloudinary.com/eleni/image/upload/v1680213092/Screenshot_2023-03-30_at_5.49.54_PM_ldtcux.png">

Choose `Reopen in Container` to initialize the repository in a dev container.
The container will run all of the setup and installation commands, and then
start up the development server.

Open an integrated terminal `Terminal -> New Terminal` and you can view the
config as it runs the container setup. You will see something like this:

<img src="https://res.cloudinary.com/eleni/image/upload/v1680124651/dev-container-4_blhzgz.png">

In a separate integrated bash terminal, you should see
`root ➜ /workspaces/virtual-community` in the terminal. This means that you are
now in the container, and you can run the following command to run the database
migrations:

```bash
npm run migrate:prisma
```

This will run the database migrations which creates the database tables, and it
will seed the database using the `./src/prisma/seed.ts` file.

### Why dev containers?

Using a dev container, we make sure that everyone on the team is using the same
working environment, and reducing errors caused by different local environments
and configurations.

The container includes some pre-installed VSCode extensions, check those out,
and let us know if there are any that you think the team should be using!

## Contributions Process 🤸‍♀️

1. Create your feature branch `git checkout -b feature/your-feature-name dev`
1. Commit your changes `git commit -m "commit message describing your changes"`
1. Push your changes to your feature branch
   `git push origin feature/your-feature-name`
1. Before making a pull request, make sure your fork and branch are synced with
   upstream branch that you will be making a PR against
   - Make sure you `git pull upstream dev:dev` daily to make sure that your
     local branch has the latest changes
   - Merge your changes into the latest up-to-date dev branch
     - `git checkout dev`
     - `git merge feature/your-feature-name`
1. Create a Pull Request in GitHub against the `dev` branch **when your feature
   is done**
1. Once all changes in `dev` are verified, merge `dev` to `staging`
1. When a feature is complete, leads will merge `staging` into `main` (`main`
   should only ever be merged to from `staging`)

### Good commit messages

```
Capitalized, short (50 chars or less) summary

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Specify the type of commit!
```

See the
[github wiki](https://github.com/safeplace-intl/virtual-community/wiki/Writing-good-commit-messages)
for more information on writing good commit messages.

## Links

1. [Dev container specs](https://containers.dev/)
2. [VSCode & Github info](https://code.visualstudio.com/docs/devcontainers/containers#_opening-a-terminal)
