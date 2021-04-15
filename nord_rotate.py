#!venv/bin/python3 
import os, sys, subprocess, time, requests, psutil, random
import json
from time import sleep
from threading import Timer

path = '/etc/openvpn/ovpn_udp/'

class colours:
    purple = '\033[95m'
    blue = '\033[94m'
    green = '\033[92m'
    yellow = '\033[93m'
    red = '\033[91m'
    cyan = '\u001b[36m'
    endc = '\033[0m'
    bold = '\033[1m'
    underline = '\033[4m'

try:
    open('/etc/openvpn/secret')
except:
    print(f'{colours.yellow}Secret file not installed!!!\nPlease create a file with "username\\npassword" in /etc/openvpn/secret{colours.endc}') 
    exit()

if os.getuid() != 0:
    print(f'{colours.red}You have to run this script with root privileges to deal with the vpn.{colours.endc}')
    exit()
    
def kill_vpn():
    try:
        while psutil.net_if_addrs()['tun0']:
            print(f'\n{colours.yellow}{colours.underline}VPN alive, killing it...{colours.endc}\n')
            for proc in psutil.process_iter():
                if 'openvpn' in proc.name(): 
                    # Terminate() instead of kill() so we exit gracefully 
                    proc.terminate()
                    sleep(2)
    except Exception as e:
        return None

def vpn_extract():
    def_servers = []
    servers = requests.get('https://www.nordvpn.com/api/server', timeout=10).json()
    for server in servers:
        try:
            if server['categories'][0]['name'] == 'Standard VPN servers':
                def_servers.append(server)
        except:
            pass
    return def_servers 

def get_vpn():
    connected = False
    while not connected:
        server = random.choice(servers)
        kill_vpn()
        cmd = f'openvpn --config config.ovpn --daemon --remote {server["ip_address"]} --auth-user-pass /etc/openvpn/secret'
        subprocess.run(cmd.split())
        timeout = 10 
        timeout_start = time.time()

        while time.time() < timeout_start+timeout:
            try:
                tun = psutil.net_if_addrs()['tun0']
                if tun:
                    try:
                        ip = requests.get('http://ipinfo.io', timeout=30).json()
                    except:
                        with open('petes', 'a+') as c:
                            c.write('un petao\n')
                        break
                    print(f'\n{colours.bold}{colours.cyan}Rolling in {server["country"]} with ip {ip["ip"]}...{colours.endc}\n')
                    connected = True
                    break
            except Exception as e: 
                    sleep(1)

kill_vpn()
servers = vpn_extract()
