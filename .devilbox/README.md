## How to configure Devilbox to work with this project

[Devibox](http://devilbox.org/) is a development [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) & [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) stack built on [Docker](https://www.docker.com/) components.

To set-up the development services for CheckList with DevilBox:

- [Install Devilbox](https://devilbox.readthedocs.io/en/latest/) on your computer and take the time to familiarize yourself with it. Sure it will be a good investment of time!

- Configure your `.env` file. We use Apache 2.4, PHP 7.1 (with NodeJS 8.x included in the PHP container) and MySQL 8.0, but you can try with other versions as well.

- Define a variable named `HOST_PATH_RELATIVE_DATADIR` in your `.env` file, pointing to the relative path (from `$HOME`) to your development folder. Both Devilbox and CheckList should be located in this folder. For example, set this if you have Devilbox and your developmet projects placed in `~/dev`:

```yaml
### Local filesystem path to projects relative to $HOME/, to be used for symbolic links
HOST_PATH_RELATIVE_DATADIR=dev
```

- Copy the provided file `/.devilbox/docker-compose.override.yml` to the root of your Devilbox folder, or include its contents if you are already using other overrides.

- Copy the provided file `/.devilbox/autostart/run-node-js-projects.sh` to `/autostart` in your Devilbox folder, or add the project specification found in `NODE_PROJECTS` if you are already using this autostart file.

- Inside your Devilbox `cfg/apache-2.4` folder, create the following symlink (replacing `/path/to/your/checklist/folder/` with the absolute path in your system):

```bash
# Go to your Devilbox folder:
$ cd path/to/devilbox

# Go to the Apache 2.4 configuration folder:
$ cd cfg/apache-2.4

# Create a symlink to this absolute path:
$ ln -s /path/to/your/checklist/folder/.devilbox/cfg/apache-2.4/proxy-wstunnel.conf .
```

- Create a directory for checklist into your Devilbox `data/www` folder and define the following softlinks, replacing `/path/to/your/checklist/folder/` with the absolute path to this folder in your system:

```bash
# Go to your Devilbox folder:
$ cd path/to/devilbox

# Create a directory for a new vhost named 'chklist'
$ mkdir ./data/www/chklist

# Enter into the newly created folder and create three more symlinks: 
$ cd ./data/www/chklist
$ ln -s /path/to/your/checklist/folder/.devilbox/data/www/chklist/htdocs .
$ ln -s /path/to/your/checklist/folder/socketsrv .
$ ln -s /path/to/your/checklist/folder/.devilbox/data/www/chklist/.devilbox
```

- You can then launch your Devilbox. For the needs of this project, we will just need three services:

```bash
# Go to your Devilbox folder:
$ cd path/to/devilbox

# Launch docker-compose with the required services:
$ docker-compose up httpd php mysql
```

- You will also need to define `chklist.loc` into `/etc/hosts`, unless yoy have enabled the Devilbox's [auto DNS](https://devilbox.readthedocs.io/en/latest/intermediate/setup-auto-dns.html) feature.

- Use PHPMyAdmin (provided by Devilbox) to create the 'checklist' database and load `/data/checklist-demo.sql` to fill it with test data. Remember to create also a MySQL user with full privileges on this database, and adjust `/api/config.php` with the appropiate settings.


From here, and after building the CheckList App, your development server will be ready on:
https://chklist.loc/checklist
