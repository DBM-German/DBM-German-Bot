@ECHO OFF
:start
echo Starting Bot...
node bot.js
echo Restarting Bot in 5 Seconds...
timeout 5
goto start
