#!/bin/bash 
# Connects to vpn while allowing SSH through the default tunnel.

# We get SSH port by checking ssh daemon config.
PORT=$(cat /etc/ssh/sshd_config | grep -i -m 1 port | awk '{print $NF}')

nordvpn connect && \
# Tell iptables to not drop the packets moving in this SSH port.
iptables -I INPUT -p tcp --dport $PORT -i enp0s31f6 -j ACCEPT && \
iptables -I OUTPUT -p tcp --sport $PORT -j ACCEPT && \
# Using mangle we mark these packets to later route them by port, not by ip.
iptables -t mangle -I INPUT -p tcp --dport $PORT -i enp0s31f6 -j MARK --set-mark 1 && \
iptables -t mangle -I OUTPUT -p tcp --sport $PORT -j MARK --set-mark 1 && \
# We add the ip rule and the route, everything marked with 0x1, will go through the default gateway.
if ! ip rule | grep 200 &>/dev/null; then
    ip rule add table 200 fwmark 1;
fi
if ! ip route show table 200 | grep via &>/dev/null; then
    ip route add table 200 default via 192.168.1.1 dev enp0s31f6
fi


