# Prerequisites

You need to have the following software installed:

* git
* make
* docker
* docker-compose
* nodejs + npm
* text editor with color highlighting
> VSCode editor with `zen-lsp` plugin is recommended
* any modern web-browser

# Dev setup

* Create `.env` file (by copying from `.env.tpl`) with your `AIDBOX_LICENSE`
* Prepare project and install FHIR packages by running `make init` in the terminal
* Start system by running `make up`
* Open Aidbox console in browser http://localhost:8080/ and login with `admin:password`
* Go to zen resources by pressing the button `Profiles` (or by visiting http://localhost:8080/ui/zen-ui )
* You can edit zen files in `zrc` directory and they will be automatically reloaded.

> Caveats - models for persistence can't be live-reloaded. You need to restart the app

* To finish development you can run `make down` to shutdown all services.
