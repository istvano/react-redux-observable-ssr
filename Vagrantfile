# -*- mode: ruby -*-
# # vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

# Require YAML module
require 'yaml'
require 'vagrant/ui'
require 'time'

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

UI = Vagrant::UI::Colored.new

dir = File.dirname(File.expand_path(__FILE__))
UI.info "Executing in #{dir}", bold:true

if !File.exist?("#{dir}/config.yaml")
  UI.error 'Configuration file not found! Please check if you have a config.yaml and try again.'
  raise 'Configuration file not found! Please check if you have a config.yaml and try again.'
end

UI.info "Loading configuration #{dir}/config.yaml"
# Load up our config files
CONFIG = YAML.load(File.open("#{dir}/config.yaml", File::RDONLY).read)

# define which local override to load
environment = ENV['ENV'] || 'development'

#handle local overrides
override_config = [environment, 'config.yaml'].join('-');

if !File.exist?("#{dir}/#{override_config}")
  UI.warn "Configuration file #{override_config} missing! skipping local overrides"
else
  UI.info "Loading local configuration override from #{override_config} ..."
  CONFIG.merge!(YAML.load(File.open("#{dir}/#{override_config}", File::RDONLY).read))
end

project_name = CONFIG['PROJECT']['name']
UI.info "Project #{project_name} is loading..."

# Specify minimum Vagrant version and Vagrant API version
Vagrant.require_version CONFIG['VAGRANT']['version']

UI.info "Loading hosts info #{dir}/hosts.yaml"
# loading hosts config for multi-host config
if !File.exist?("#{dir}/hosts.yaml")
  UI.error 'Configuration file not found! Please check if you have a hosts.yaml and try again.'
  raise 'Configuration file not found! Please check if you have a hosts.yaml and try again.'
end

override_hosts = [environment, 'hosts.yaml'].join('-');

if !File.exist?("#{dir}/#{override_hosts}")
  UI.info "Using default host configuration file. You could override hosts using #{override_hosts}"
  HOSTS = YAML.load(File.open("#{dir}/hosts.yaml", File::RDONLY).read)
else
  UI.info "Loading alternative local host configuration #{override_hosts} ..."
  HOSTS = YAML.load(File.open("#{dir}/#{override_hosts}", File::RDONLY).read)
end

# ============== Plugins  ===================

UI.info "Checking required plugins..."
CONFIG['VAGRANT']['plugins'].each do |plugin|
  need_restart = false
  unless Vagrant.has_plugin? plugin
    system "vagrant plugin install #{plugin}"
	UI.success "Plugin #{plugin} has been installed", bold:true
    need_restart = true
  end
  exec "vagrant #{ARGV.join(' ')}" if need_restart
end

# OS detection
module OS
	def OS.windows?
		(/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
	end

	def OS.mac?
		(/darwin/ =~ RUBY_PLATFORM) != nil
	end

	def OS.unix?
		!OS.windows?
	end

	def OS.linux?
		OS.unix? and not OS.mac?
	end
end

# Hardware detection
  if OS.mac?
	DEFAULT_CPU = `sysctl -n hw.ncpu`.to_i
  elsif OS.linux?
	DEFAULT_CPU = `nproc`.to_i
  else
	DEFAULT_CPU =  CONFIG['VAGRANT']['default_cpu']
  end

  if OS.mac?
	DEFAULT_MEM = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4
  elsif OS.linux?
	DEFAULT_MEM = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4
  else
	DEFAULT_MEM =  CONFIG['VAGRANT']['default_mem']
  end

  # at least 1 GB
  if DEFAULT_MEM.to_i < 1024
	DEFAULT_MEM = 1024
  end

# ============== Machine config ==============

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  if ( CONFIG['VAGRANT'].has_key?('winrm'))
	config.winrm.retry_limit = CONFIG['VAGRANT']['winrm']['retry_limit']
	config.winrm.retry_delay = CONFIG['VAGRANT']['winrm']['retry_delay']
	config.winrm.max_tries = CONFIG['VAGRANT']['winrm']['max_tries']
  end

  config.nfs.map_uid = Process.uid
  config.nfs.map_gid = Process.gid

  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.manage_guest = true
  
  
	HOSTS.each do |servers|

		  UI.info "Configuring #{servers['name']}", bold:true

	      ## dependencies
		  if (servers.has_key?('dependencies'))
			  servers['dependencies'].each do |dp|
				if !File.exists?(['./external', dp['local']].join('/'))
				  UI.error "#{dp['name']} installer could not be found! at "+ ['./external', dp['local']].join('/')
				  UI.warn "Downloading #{dp['name']}, please execute vagrant command once the file is downloaded"
				  exec "wget -O external/#{dp['local']} '#{dp['remote']}'"
				end
			  end
		  end

		config.vm.define [project_name, servers['name']].join("-"), autostart: servers['autostart'] do |node|

		  node.vm.box = servers['box']

		  if (servers.has_key?('guest'))
			node.vm.guest = servers['guest']
		  end

		  node.vm.communicator = servers['communicator']
		  node.vm.network 'private_network', ip: servers['ip']

		  node.vm.hostname = servers['host']

		  if (servers.has_key?('aliases'))
			node.hostmanager.aliases = servers['aliases']
		  end

		  if (servers.has_key?('message'))
			node.vm.post_up_message = servers['message']
		  end

	      ## ports
		  if (servers.has_key?('ports'))
			  servers['ports'].each do |port|
				if !port.has_key?('protocol')
					port['protocol'] = 'tcp'
				end
				if !port.has_key?('guestIP')
					port['guestIp'] = ''
				end

				if !port.has_key?('hostIp')
					port['guestIp'] = ''
				end
				node.vm.network :forwarded_port, guest: port['guest'], host: port['host'], host_ip: port['host_ip'], protocol: port['protocol'], auto_correct: true
			  end
		  end

		  node.vm.provider :virtualbox do |vb|
			vb.name = [project_name, servers['name']].join("-")
			vb.memory = servers['memory']

			vb.customize ['guestproperty', 'set', :id, '/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold', 10000 ]
			vb.customize ['modifyvm', :id, '--memory', servers['memory']]
			vb.customize ['modifyvm', :id, '--cpus', servers['cpu']]
			vb.customize ['modifyvm', :id, '--cpuexecutioncap', '90']

			#vb.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
			#vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
			#vb.customize ["modifyvm", :id, "--ioapic",              "on"]
			#vb.customize ["modifyvm", :id, "--rtcuseutc",           "on"]
			#vb.customize ["modifyvm", :id, "--pae",                 "on"]
			#vb.customize ["modifyvm", :id, "--hwvirtex",            "on"]
			#vb.gui

		  end

		if (servers.has_key?('folders'))
			servers['folders'].each_with_index  do |mount, i|
			share_disabled = !mount['disabled'].nil? ? mount['disabled'] : false
			share_type = !mount['type'].nil? ? mount['type'] : 'vm'
			UI.info "Setting up #{i} shared folder #{mount['target']} type: #{share_type} disabled: #{share_disabled}"
			if mount['src'] != '' && mount['target'] != ''
				if share_type =~ /vm/
						node.vm.synced_folder "#{mount['src']}","#{mount['target']}", disabled: share_disabled
					elsif share_type =~ /nfs/
						node.vm.synced_folder "#{mount['src']}","#{mount['target']}", id: "#{i}", disabled: share_disabled,
							:nfs => { :mount_options => [ "dmode=775", "fmode=774" ] }
					elsif share_type =~ /smb/
						node.vm.synced_folder "#{mount['src']}","#{mount['target']}", id: "#{i}", disabled: share_disabled,
							type: "smb"
					elsif share_type =~ /rsync/
            rsync = !mount['rsync'].nil? ? mount['rsync'] : Hash.new
						rsync_args = !rsync['args'].nil? ? rsync['args'] : ["--verbose", "--archive", "--delete", "-z", "--copy-links", "--omit-dir-times"]
						rsync_auto = !rsync['auto'].nil? ? rsync['auto'] : true
						rsync_exclude = !rsync['exclude'].nil? ? rsync['exclude'] : [".vagrant/"]
						node.vm.synced_folder "#{mount['src']}", "#{mount['target']}", id: "#{i}", type: "rsync", disabled: share_disabled,
											             rsync__args: rsync_args, rsync__exclude: rsync_exclude, rsync__auto: rsync_auto
					end
				end
			end
		end

		offset = ((Time.zone_offset(Time.now.zone) / 60) / 60)
		timezone_suffix = offset >= 0 ? "+#{offset.to_s}" : "#{offset.to_s}"
		timezone = 'Etc/GMT' + timezone_suffix		
		node.vm.provision :shell, :inline => "sudo rm /etc/localtime && sudo ln -s /usr/share/zoneinfo/" + timezone + " /etc/localtime", run: "always"
		UI.info "Timezone has been set to  #{timezone}", bold:true
		
		UI.info "Running provision scripts"
		if (servers.has_key?('provision-scripts'))
			servers['provision-scripts'].each do |script|
				privileged = !script['privileged'].nil? ? script['privileged'] : true
				run = !script['run'].nil? ? script['run'] : 'once'
				if (script.has_key?('upload_path'))
					node.vm.provision :shell, path: script['path'], upload_path: script['upload_path'], privileged: privileged, run: run
				else
					node.vm.provision :shell, path: script['path'], privileged: privileged, run: run
				end
			end
		end

		UI.info "Running provision commands"
		if (servers.has_key?('provision-commands'))
			servers['provision-commands'].each do |cmd|
			privileged = !cmd['privileged'].nil? ? cmd['privileged'] : true
			run = !cmd['run'].nil? ? cmd['run'] : 'once'
				node.vm.provision :shell, inline: cmd['command'], privileged: privileged, run: run
			end
		end

		if (servers.has_key?('provision-docker') && servers['provision-docker'])
			config.vm.provision :docker
		end

		if (servers.has_key?('provision-docker-compose') && !servers['provision-docker-compose'].nil?)
			servers['provision-docker-compose'].each do |comp|
				config.vm.provision :docker_compose, project_name: project_name, env: comp['env'], yml: comp['yml'], rebuild: comp['rebuild'], run: comp['run']
			end
		end

		end
	  end

end
