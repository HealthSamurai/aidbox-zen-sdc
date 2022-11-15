# Prerequisites

You need to have the following software installed:

* git
* make
* docker
* docker-compose
* nodejs + npm
* text editor with color highlighting
> Recommended VSCode editor with `zen-lsp` plugin
* any modern web-browser

# Dev setup

* Install FHIR packages by running `npm install` from `zrc` directory
* Create `.env` file (by copying from `.env.tpl`) with your `AIDBOX_LICENSE`
* Run in the terminal `make up`
* You can edit zen files in `zrc` directory and they will be automatically reloaded.
* Open Aidbox console in browser http://localhost:8080/
* Go to zen resources by pressing the button `Profiles` (or by visiting http://localhost:8080/ui/zen-ui )

> Caveats - models for persistence can't be live-reloaded. You need to restart the app


To finish development you can run `make down` to shutdown all services.
