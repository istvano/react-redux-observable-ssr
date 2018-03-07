REGISTRY_HOST=docker.io
USERNAME=$(USER)
VERSION=$(shell bash ./version.sh)
IMAGE_ID=$(shell bash ./image.sh)
#NAME=$(shell basename $(PWD))
VAGRANT=vagrant

.PHONY: help up down ssh login status sync-stop sync-start sync deploy

default: help

help:
		echo "Use the following commands to manage your VMs"
	    @$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs

up:
	$(VAGRANT) up

down:
	$(VAGRANT) halt

ssh:
	$(VAGRANT) ssh
	
login:
	$(VAGRANT) putty
	
status:
	$(VAGRANT) status

sync-stop:
	$(VAGRANT) ssh -c 'sudo service osync-srv stop'

sync-start:	
	$(VAGRANT) ssh -c 'sudo service osync-srv start'

sync:	
	$(VAGRANT) ssh -c 'sudo osync.sh /etc/osync/sync.conf --verbose'

tag:
	@echo "Tagging $(IMAGE_ID) with $(VERSION)"
	docker tag $(IMAGE_ID):latest $(IMAGE_ID):$(VERSION)	