@echo off
netsh interface isatap set state default
netsh interface teredo set state default
netsh interface teredo set state server=teredo.remlab.net
netsh interface ipv6 set teredo enterpriseclient
cmd