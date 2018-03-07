# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Sample app 
* 1.0
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* isntall virtualbox
* install vagrant
* run vagrant up
* vagrant ssh
* cd src
* 'yarn install' installs the depdendencies
* 'yarn run' dev to start the app in develop mode
* you may see docker related commands by using make

### Services

* Shared drive can be accessed on \\10.0.0.75 (username: vagrant, password: vagrant)

### Contribution guidelines ###

* Development

First of all a windows shared drive needs to be mapped and an IDE needs to point to this location to edit the files. Please note you are editing the files INSIDE the virtual machine. A process is running to sync these edits back to the host. if you would like
to force the sync you need to run 'make sync VAGRANT=vagrant.exe'

* Writing tests
* Code review
* Other guidelines
