# SPI 🌈 Virtual Community

A global virtual community for LGBTQIA+ refugees and asylum seekers to safely connect

## Getting started 🚀

### Get permissions

Dev leads will need your github username to add you as a contributor.

### Development setup

To get the app running on your machine, follow the commands below:

1. Fork the repository

2. Clone the forked repository onto your local machine

```bash
git clone https://github.com/< your-github-username >/virtual-community
```

### Docker

Download `Docker Desktop` for [Mac](https://docs.docker.com/desktop/install/mac-install/) or [Windows](https://docs.docker.com/desktop/install/windows-install/). We will be using dev containers to work on this project, and this software will help facilitate the use of the container on your machine. This will ensure that the team is all working with the same development environment.

### Dev containers VSCode extensions

Open up VSCode and install the `Dev Containers` and `Remote Development` VSCode extensions

<img src="https://res.cloudinary.com/eleni/image/upload/v1680124298/dev-container-2_ctewiq.png">

#### Verify installation

Once the extensions are installed, you should see this light green icon in the bottom left corner of your code editor

<img src="https://res.cloudinary.com/eleni/image/upload/v1680124126/dev-container-1_cefm7p.png">

#### Opening into the container

Click the above light green icon to reveal the following options:

<img src="https://res.cloudinary.com/eleni/image/upload/v1680213092/Screenshot_2023-03-30_at_5.49.54_PM_ldtcux.png">

Choose `Reopen in Container` to initialize the repository in a dev container. The container will run all of the setup and installation commands, and then start up the development server.

Open an integrated terminal `Terminal -> New Terminal` and you can view the config as it runs the container setup. You will see something like this:

<img src="https://res.cloudinary.com/eleni/image/upload/v1680124651/dev-container-4_blhzgz.png">

### Why dev containers?

Using a dev container, we make sure that everyone on the team is using the same working environment, and reducing errors caused by different local environments and configurations.

The container includes some pre-installed VSCode extensions, check those out, and let us know if there are any that you think the team should be using!

## Contributions Process

1. Create your feature branch `git checkout -b feature/your-feature-name`
2. Commit your changes `git commit -m "commit message describing your changes"`
3. Push your changes to your feature branch `git push origin feature/your-feature-name`
4. Create a Pull Request in GitHub against the `staging` branch
6. Once all changes in `staging` are verified, merge `staging` to `main` (`main` should only ever be merged to from `staging`)

### Good commit messages

```
Capitalized, short (50 chars or less) summary

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Specify the type of commit!
```

See the [Apprentice Handbook](https://www.notion.so/Apprentice-Handbook-286800568746460885b9614b2ded5425) for more information on writing good commit messages.

## Links

1. [Dev container specs](https://containers.dev/)
2. [VSCode & Github info](https://code.visualstudio.com/docs/devcontainers/containers#_opening-a-terminal)
